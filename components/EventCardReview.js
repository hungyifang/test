import React, { useState, useEffect } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

const axios = require('axios').default;

function EventCardReview(props) {
  const [reviews, setReviews] = useState([]);
  //從API SERVER抓資料
  async function loadEventCardReview() {
    const i_id = props.i_id;
    let result = await axios.get(
      'http://localhost:8080/api/event/card/review',
      {
        params: {
          i_id: i_id,
        },
      }
    );

    result = result.data[0];
    setReviews(result);
  }

  /*eslint-disable */
  useEffect(() => {
    loadEventCardReview();
  }, []);
  /*eslint-enable */

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);
  //星星總和
  const starSum = reviews
    .map((value, index) => {
      let starCount = 0;
      for (let key in value) {
        starCount += value[key];
      }
      return starCount;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0);
  //算平均星星 and 整數+.0
  let starAvg = starSum / reviews.length || 0;
  starAvg = starAvg.toFixed(1);
  if (Number.isInteger(starAvg) && starAvg !== 0) {
    starAvg = starAvg + '.0';
  }
  return (
    <>
      <span className="event-star-avg">
        {starAvg === '0.0' ? <FaRegQuestionCircle /> : starAvg}
      </span>
      <span className="review-times">{reviews.length}&nbsp;則評論</span>
      <span className="attend-times">{props.sales}&nbsp;人參加過</span>
    </>
  );
}

export default EventCardReview;
