import React, { useState, useEffect } from 'react';
import '../styles/event-detail.css';
import $ from 'jquery';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { withRouter } from 'react-router-dom';

function EventCarousel(props) {
  const i_id = props.i_id;
  // console.log(i_id);

  // const [slide, setSlide] = useState([]);

  const carouselImages = [
    'http://localhost:8080/images/pexels-laura-stanley-1751550.jpg',
    'http://localhost:8080/images/jules-a-lmydvgKiorI-unsplash.jpg',
    'http://localhost:8080/images/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg',
    'http://localhost:8080/images/pexels-laura-stanley-1751550.jpg',
    'http://localhost:8080/images/jules-a-lmydvgKiorI-unsplash.jpg',
  ];

  useEffect(() => {
    // jquery程式碼寫在這裡
    // setSlide(carouselImages);
    //輪播內容 carousel
    //頭尾重複一次才會看到兩側圖
    let carouselContent = carouselImages.map((img, index) => {
      return `<li class="carousel-parts" key="${index}">
          <img class="h-100 w-100 cover-fit" src="${img}" alt="" />
        </li>`;
    });
    //扣掉頭尾重複兩個的圓點再 append
    let carouselPages = `<li></li>`.repeat(carouselImages.length - 2);
    $('.event-carousel').append(carouselContent);
    $('#carousel-dot-pages').append(carouselPages);
    //預設白點
    $('#carousel-dot-pages li').first().addClass('active');
    //兩側圖片模糊+變暗
    $('.carousel-parts')
      .eq(1)
      .css({ filter: 'brightness(1) blur(0px)' })
      .siblings()
      .css({ filter: 'brightness(0.7) blur(2px)' });

    //輪播動畫
    //圓點換頁
    let carouselIndex = 0;
    //最初一頁的 left
    let firstCarouselWidth =
      $('.carousel-parts').width() -
      ($('.carousel-wrapper').width() - $('.carousel-parts').width()) / 2 +
      20;
    //輪播單位寬 + 20 margin
    let carouselWidth = $('.carousel-parts').width() + 20;

    $('#carousel-dot-pages li').on('click mouseenter', function () {
      carouselIndex = $(this).index() + 1;
      carouselRun();
    });
    //縮放大小
    $(window).on('load resize', function () {
      //輪播與視窗比例為 1350 / 1900
      carouselWidth = ($('.carousel-wrapper').width() * 1350) / 1900 + 20;
      $('.carousel-parts').css('width', carouselWidth);
      firstCarouselWidth =
        $('.carousel-parts').width() -
        ($('.carousel-wrapper').width() - $('.carousel-parts').width()) / 2 +
        30;
      //前後按鈕感應區域
      $('.carousel-btn').css(
        'width',
        ($('.carousel-wrapper').width() - $('.carousel-parts').width()) / 2
      );
      carouselIndex = $('#carousel-dot-pages li.active').index() + 1;
      carouselRun();
    });
    //前後按鈕換頁
    $('#btnNext').on('click', function () {
      carouselIndex = $('#carousel-dot-pages li.active').index() + 1;
      carouselIndex++;
      if (carouselIndex >= carouselImages.length - 1) {
        carouselIndex = 1;
      }
      carouselRun();
    });
    $('#btnPrev').on('click', function () {
      carouselIndex = $('#carousel-dot-pages li.active').index() + 1;
      carouselIndex--;
      if (carouselIndex < 1) {
        carouselIndex = carouselImages.length - 2;
      }
      carouselRun();
    });
    //驅動程式
    function carouselRun() {
      //index 因扣掉頭要減 1
      let move =
        -firstCarouselWidth - (carouselIndex - 1) * (carouselWidth + 20);
      $('#carousel-dot-pages li')
        .eq(carouselIndex - 1)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $('.carousel-parts')
        .eq(carouselIndex)
        .css({ filter: 'brightness(1) blur(0px)' })
        .siblings()
        .css({ filter: 'brightness(0.7) blur(2px)' });
      $('.event-carousel').css('left', move);
    }
  }, []);

  return (
    <>
      {/* <!-- !輪播 --> */}
      <div className="carousel-wrapper position-relative">
        <ul className="event-carousel list-unstyled position-absolute">
          {/* <!--* 動態新增 --> */}
          {/* <li className="carousel-parts">
                <img
                  className="h-100 w-100 cover-fit d-block"
                  src="images/event/jules-a-lmydvgKiorI-unsplash.jpg"
                  alt=""
                />
              </li> */}
        </ul>
        {/* <!--! 小白點頁碼 --> */}
        <ul
          className="
              list-unstyled
              position-absolute
              d-flex
              justify-content-center
              carousel-pages
            "
          id="carousel-dot-pages"
        >
          {/* <!--* 動態新增 --> */}
          {/* <li></li> */}
        </ul>
        <div
          className="position-absolute carousel-btn"
          id="btnPrev"
          role="button"
        >
          <IoIosArrowDropleft />
        </div>
        <div
          className="position-absolute carousel-btn"
          id="btnNext"
          role="button"
        >
          <IoIosArrowDropright />
        </div>
      </div>
    </>
  );
}

export default withRouter(EventCarousel);
