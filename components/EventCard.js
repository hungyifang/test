import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdStar, MdLocationOn } from 'react-icons/md';
import EventCardReview from './EventCardReview';
import moment from 'moment';
const axios = require('axios').default;

function EventCard(props) {
  const [events, setEvents] = useState([]);
  const [hotTags, setHotTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  //從API SERVER抓資料
  async function loadEventCard() {
    const s_id = props.s_id;
    let result = await axios.get('http://localhost:8080/api/event/card', {
      params: {
        s_id: s_id,
      },
    });
    result = result.data[0];
    setEvents(result);
  }
  async function loadHotTag() {
    const s_id = props.s_id;
    let hotRank = await axios.get(
      'http://localhost:8080/api/event/card/rank/hot',
      {
        params: {
          s_id: s_id,
          orderBy: 'sales',
        },
      }
    );
    hotRank = hotRank.data[0];
    setHotTags(hotRank);
  }
  async function loadNewTag() {
    const s_id = props.s_id;
    let newRank = await axios.get(
      'http://localhost:8080/api/event/card/rank/new',
      {
        params: {
          s_id: s_id,
          orderBy: 'created',
        },
      }
    );
    newRank = newRank.data[0];
    setNewTags(newRank);
  }
  /*eslint-disable */
  useEffect(() => {
    loadEventCard();
    loadNewTag();
    loadHotTag();
  }, []);
  /*eslint-enable */

  // useEffect(() => {
  //   console.log(newTags);
  // }, [newTags]);

  //找 7日內 created 排名前三 i_id
  function dateDiff(date1, date2) {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    return (date1utc - date2utc) / (1000 * 60 * 60 * 24);
  }
  const new3 = newTags.map((created, index) => {
    let today = new Date(moment().format('YYYY-MM-DD'));
    let createDate = new Date(created.created);
    return created.i_id + ',' + dateDiff(today, createDate);
  });
  const new3in7 = new3
    .filter((date) => {
      return date.split(',')[1] <= 7;
    })
    .map((idAndDay) => {
      return parseInt(idAndDay.split(',')[0]);
    });
  //找sales排名前三i_id
  const top3 = hotTags.map((sales, index) => {
    return sales.i_id;
  });
  // console.log(new3in7);
  // console.log(top3);
  //轉換資料庫數據 level 數字 to 區域
  const display = events.map((card, index) => {
    function switchLevel(value) {
      switch (value) {
        case 1:
          return '海邊區';
        case 2:
          return '草原區';
        case 3:
          return '深山區';
        default:
          return '不分區';
      }
    }
    function switchTag(i_id, newRank, hotRank) {
      if (newRank.includes(i_id) === true && hotRank.includes(i_id) === true) {
        return 'position-relative card-tag-hot card-tag-new';
      } else if (newRank.includes(i_id) === true) {
        return 'position-relative card-tag-new';
      } else if (hotRank.includes(i_id) === true) {
        return 'position-relative card-tag-hot';
      } else {
        return 'position-relative';
      }
    }
    const linkTo = '/event/' + card.i_id + '#';
    return (
      <Link
        to={{
          pathname: linkTo,
          state: {
            data: card,
          },
        }}
        alt=""
        className="event-card"
        key={index}
      >
        <div className="card-img">
          <img
            className="img-fluid h-100"
            src=".//images/event/samuel-bryngelsson-dWHtwGV9EUU-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="container mt-2">
          <div className="row ">
            <div className="col-auto mx-auto">
              <div className="h2 card-title d-flex flex-column">
                {/* 符合前三字串的就 + card tag */}
                <div className={switchTag(card.i_id, new3in7, top3)}>
                  {card.title}
                </div>
                <div className="card-content d-flex align-items-center">
                  {/* <i className="ic-star d-flex align-items-end"></i> */}
                  <MdStar />
                  <EventCardReview i_id={card.i_id} sales={card.sales} />
                </div>
                <div className="card-content d-flex align-items-center">
                  <MdLocationOn />
                  {/* <i className="ic-place d-flex "></i> */}
                  <span className="event-place">{switchLevel(card.level)}</span>
                </div>
              </div>
            </div>
            <div className="h4 event-price text-end">NT ${card.price}</div>
          </div>
        </div>
      </Link>
    );
  });

  return <>{display}</>;
}

export default EventCard;
