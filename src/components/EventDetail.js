import React, { useState, useEffect } from 'react';
import '../styles/event-detail.css';
import { ReactComponent as HollowStar } from '../star_border.svg';
import { HashLink } from 'react-router-hash-link';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import $ from 'jquery';
import parse from 'html-react-parser';
import { withRouter } from 'react-router-dom';
import EventCarousel from './EventCarousel';
import EventDetailTitle from './EventDetailTitle';
import BnBDateRangePicker from './BnBDateRangePicker';
const axios = require('axios').default;

function EventDetail(props) {
  const login = props.auth || false;
  const [auth, setAuth] = useState(login);
  const [events, setEvents] = useState([]);
  const [star, setStar] = useState(0);
  const [fav, setFav] = useState(false);
  const [population, setPopulation] = useState(1);
  const i_id = +props.match.params.i_id;
  const u_id = props.u_id;

  async function checkFav() {
    //有登入的話確認狀態
    if (!auth) return setFav(false);

    let result = await axios.get('http://localhost:8080/api/event/checkFav', {
      params: {
        i_id: i_id,
        u_id: u_id,
      },
    });
    parseInt(result) === 1 ? setFav(true) : setFav(false);
  }

  async function loadEvent() {
    let result = await axios.get('http://localhost:8080/api/event/detail', {
      params: {
        i_id: i_id,
      },
    });
    result = result.data[0];
    setEvents(result);
  }

  async function loadReview() {
    let result = await axios.get('http://localhost:8080/api/event/review', {
      params: {
        i_id: i_id,
      },
    });

    result = result.data[0];
    //算星星
    const stars = result
      .map((review, index) => {
        return review.score;
      })
      .reduce((accu, cur) => {
        return accu + cur;
      }, 0);
    let starAVG = stars / result.length || 0;
    if (Number.isInteger(starAVG) && starAVG !== 0) {
      starAVG = starAVG + '.0';
    }
    console.log(starAVG);
    setStar(starAVG);
  }
  //需要會員ID
  // async function clickFav() {
  //   if (!auth) {
  //     return alert('請先登入');
  //   }
  //   let switchFav = !fav;
  //   let u_id = props.u_id;
  //   setFav(switchFav);
  //   let result = await axios.get('http://localhost:8080/api/event/fav', {
  //     params: {
  //       u_id: u_id,
  //       i_id: i_id,
  //       fav: fav,
  //     },
  //   });
  // }
  // function hashChange() {
  //   let location = window.location.hash;
  //   setHash(location);
  //   console.log(location);
  //   window.scrollTo(location);
  //   window.scrollBy(0, -500);
  // }
  useEffect(() => {
    loadEvent();
    loadReview();
    checkFav();
    // jquery程式碼寫在這裡
    //RWD選單
    $(window).on('load resize', function () {
      if ($('body').width() <= 1043) {
        // 快速選單
        $('.rwd-menu').addClass('fixed-bottom');
      } else {
        $('.rwd-menu').removeClass('fixed-bottom');
      }
    });
    // RWD旅客評論
    $(window).on('load resize', function () {
      // $('.more-review').remove();
      // $('hr').remove();
      // let moreReview = `<hr />
      //               <div class="col d-flex align-items-center justify-content-center more-review" id="more-review">
      //                   <span class="material-icons-outlined">
      //                       arrow_drop_down
      //                   </span>
      //                   更多評論
      //               </div>`;
      if ($('body').width() <= 748) {
        $('.rwd-review').addClass('container-fluid').removeClass('container');
        // $('.consumer-review').append(moreReview);
      } else {
        $('.rwd-review').removeClass('container-fluid').addClass('container');
      }
    });

    // $('#more-review').on('click', function () {
    //   $('#review-card-wrapper').removeClass('rwd-height');
    // });
  }, []);

  useEffect(() => {
    console.log(star);
  }, [star]);

  const display = events.map((result, index) => {
    //轉換字串成HTML
    const itemInfo = parse(result.article);
    return (
      <>
        <header key={index}>
          <div className="banner-carousel">
            <div className="h3 banner-title col-auto">{result.title}</div>
            <EventCarousel i_id={i_id} />
          </div>
        </header>

        <main>
          <EventDetailTitle
            auth={auth}
            i_id={i_id}
            u_id={u_id}
            fav={fav}
            level={result.level}
            title={result.title}
            subtitle={result.subtitle}
          />
          {/* //RWD */}
          <div className="container-fluid p-0">
            <div className="rwd-menu col">
              <ul className="d-flex m-0 p-0">
                <li className="">
                  <HashLink to="#checkDate">查詢日期</HashLink>
                </li>
                <li>
                  <HashLink to="#itemInfo">商品資訊</HashLink>
                </li>
                <li>
                  <HashLink to="#canclePolicy">取消政策</HashLink>
                </li>
                <li>
                  <HashLink to="#warning">注意事項</HashLink>
                </li>
                <li>
                  <HashLink to="#review">旅客評價</HashLink>
                </li>
              </ul>
            </div>
            {/* //RWD手機板日期 */}
            <div className="rwd-calendar">
              <div className="col text-center" id="checkDate">
                查詢日期
              </div>
              <div className="col d-flex justify-content-center align-items-center position-relative">
                {/* <span className="material-icons position-absolute">
                  date_range
                </span>
                <input type="date" /> */}
                <BnBDateRangePicker RWD={true} />
              </div>
              <div className="col d-flex justify-content-center align-items-center position-relative">
                <span className="material-icons position-absolute">person</span>
                <input type="number" min="1" />
              </div>
              <div className="col text-end px-5">TWD {result.price}</div>
            </div>
          </div>
          {/* //RWD手機板日期 END*/}
          <div className="container-fluid event-description">
            <section className="container">
              <div className="row justify-content-between" id="itemInfo">
                <div className="col-md-6 col-12">
                  <div className="h1 description-title">商品資訊</div>
                  {/* 從資料庫拿HTML文章 */}
                  {itemInfo}
                  {/* 從資料庫拿HTML文章*/}
                </div>
                {/* //RWD電腦板日期 END*/}
                <div className="col-5 ms-auto calendar-wrapper">
                  <div className="calendar w-100 mx-auto py-1">
                    <div className="datePicker">
                      <BnBDateRangePicker RWD={false} />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center my-3 text-pri position-relative">
                      <span className="h3 position-absolute d-flex align-items-center population">
                        人數
                      </span>
                      <span className="h1 position-absolute population-counter d-flex align-items-center">
                        <HiOutlinePlus
                          onClick={() => {
                            let newPopulation = parseInt(population + 1);
                            setPopulation(newPopulation);
                          }}
                        />
                        <HiOutlineMinus
                          onClick={() => {
                            let newPopulation = parseInt(population - 1);
                            if (newPopulation < 1) newPopulation = 1;
                            setPopulation(newPopulation);
                          }}
                        />
                      </span>
                      <input
                        type="number"
                        name="population"
                        className="input-population text-pri h3"
                        value={population}
                      ></input>
                    </div>
                    <div className="h1 col text-pri price m-0 my-3">
                      TWD $ {result.price * population}
                    </div>
                    <div className="col review d-flex align-items-center">
                      <span className="h2 m-0 text-pri me-2">
                        {star === 0 ? <FaRegQuestionCircle /> : star}
                      </span>
                      <div
                        className="star-rate-bg h5 text-pri d-block m-0"
                        style={{
                          background: `linear-gradient(to right, var(--c-pri) ${
                            star * 20
                          }%, transparent ${star * 20}%)`,
                        }}
                      >
                        <HollowStar />
                        <HollowStar />
                        <HollowStar />
                        <HollowStar />
                        <HollowStar />
                      </div>
                    </div>
                  </div>
                </div>
                {/* //RWD電腦板日期 END*/}
              </div>
              {/* 存資料庫2 */}
              <div className="row" id="warning">
                <div className="col description-warning">
                  <ul className="event-description-content p-0 warning">
                    <li className="h3 description-subtitle">－ 注意事項 －</li>
                    <li>滿 4 人才出團</li>
                    <li>遇豪大雨或打雷取消</li>
                    <li>前一日天氣不佳可能取消</li>
                    <li>請聽從領隊及教練指揮</li>
                    <li>活動中因個人因素無法參與整個行程將不令予退費</li>
                  </ul>
                </div>
              </div>
              {/* 存資料庫 END2*/}
            </section>
          </div>
          <div className="container rwd-review" id="review">
            <section className="row consumer-review">
              <div className="col d-flex align-items-center review-title-wrapper">
                <div className="h1 description-title">旅客評價</div>
                <div className="h1 description-title  review-grade">4.6</div>
                <div className="h4 review-quantity">37 則旅客評價</div>
              </div>
              <div
                className="row m-0 review-card-wrapper rwd-height"
                id="review-card-wrapper"
              >
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src=".//images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 my-2 review-card">
                  <div className="d-flex align-items-center">
                    <div className="review-avatar ">
                      <img
                        src="./images/event/jared-rice-NTyBbu66_SI-unsplash.jpg"
                        alt=""
                        className="w-100 cover-fit"
                      />
                    </div>
                    <div className="m-2 d-flex">
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                      <i className="ic-star text-pri"></i>
                    </div>
                  </div>
                  <div className="bg-mid row review-content">
                    <div className="col-12 review-title text-pri h2">
                      行程充實有趣
                    </div>
                    <div className="col-12 review-innertext text-bg-deep h4">
                      教練專業, 照片精美
                    </div>
                    <div className="col-12 review-timestamp text-sec-deep text-end h5">
                      2021-6-30 由 XXX 評價
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 review-page-wrapper justify-content-center d-flex">
                <div className="col-3 pri-light review-page">page</div>
              </div>
            </section>
          </div>

          <div className="container-fluid suggestion pri-light">
            <div className="row m-0">
              <div className="col-12 suggestion-title text-pri d-flex justify-content-center h1">
                更多推薦活動
              </div>
              <div className="d-flex justify-content-center suggest-card-wrapper">
                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="card-img">
                    <img
                      className="img-fluid h-100"
                      src="images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-auto mx-auto">
                        <div className="h2 card-title d-flex flex-column">
                          <div className="card-tag position-relative">
                            浪漫日落SUP立槳
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-star d-flex align-items-end"></i>
                            <span className="event-star-avg">4.6</span>
                            <span className="review-times">
                              &nbsp;&nbsp;37則評論
                            </span>
                            <span className="attend-times">
                              &nbsp;&nbsp;1K參加過
                            </span>
                          </div>
                          <div className="card-content d-flex align-items-end">
                            <i className="ic-place d-flex "></i>
                            <span className="event-place">海邊區</span>
                          </div>
                        </div>
                      </div>
                      <div className="h4 event-price text-end">NT $900</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  });
  return <>{display}</>;
}

export default withRouter(EventDetail);
