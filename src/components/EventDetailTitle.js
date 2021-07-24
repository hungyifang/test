import React, { useState } from 'react';
import { MdLocationOn, MdRestore } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
const axios = require('axios').default;

function EventDetailTitle(props) {
  const [fav, setFav] = useState(props.fav);

  async function clickFav() {
    if (!props.auth) {
      return alert('請先登入');
    }
    let switchFav = !fav;
    let u_id = props.u_id;
    let i_id = props.i_id;
    setFav(switchFav);
    let result = await axios.get('http://localhost:8080/api/event/fav', {
      params: {
        u_id: u_id,
        i_id: i_id,
        fav: fav,
      },
    });
    console.log(result);
  }

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

  return (
    <div className="container">
      <section className="event-title">
        <div className="col d-flex align-items-center">
          <div
            className={
              fav === true
                ? 'd-flex align-items-end h1 event-name favorite'
                : 'd-flex align-items-end h1 event-name'
            }
          >
            {props.title}
            {fav === true ? (
              <FaHeart title="取消我的最愛" onClick={() => clickFav()} />
            ) : (
              <FaRegHeart title="加入我的最愛" onClick={() => clickFav()} />
            )}
          </div>
        </div>
        <div className="col d-flex event-subtitle align-items-center h4">
          <MdLocationOn />
          <span>{switchLevel(props.level)}</span>
          <AiOutlineClockCircle />
          <span>行程時間&nbsp;3&nbsp;小時</span>
          <MdRestore />
          <span>7&nbsp;天前免費取消</span>
        </div>
        <div className="col d-flex event-title-text h4">
          <span>{props.subtitle}</span>
        </div>
      </section>
    </div>
  );
}
export default EventDetailTitle;
