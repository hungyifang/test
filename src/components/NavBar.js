import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

function NavBar() {
  // componentDidMount
  useEffect(() => {
    // jquery程式碼寫在這裡
    // 日夜開關
    $('#day-night-switch').on('click', () => {
      $('.switch-ball').toggleClass('switch');
      $('#switch-text').toggleClass('switch');
      if ($('#switch-text').text() === 'day') {
        $('#switch-text').text('night');
      } else {
        $('#switch-text').text('day');
      }
    });
    //手機版 導覽列 fix-bottom and top
    $(window).on('load resize', function () {
      if ($('body').width() <= 1043) {
        $('nav').addClass('fixed-top custom-bg-light');
      } else {
        $('nav').removeClass('fixed-top custom-bg-light');
      }
    });
  }, []);

  return (
    <>
      {/* <!--! 導覽列 --> */}
      <nav>
        <div className="container-fluid ">
          <div className="col nav d-flex align-items-center justify-content-between">
            <div className="logo">
              {/* <!--! 網址 --> */}
              <NavLink exact to="/">
                <img
                  className="img-fluid"
                  src="http://localhost:8080/images/logo-日.svg"
                  alt=""
                />
              </NavLink>
            </div>
            <div className="main-menu">
              <ul className="d-flex align-items-center m-0 p-0">
                {/* <!--! 網址 --> */}
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/customized"
                    activeClassName="active"
                  >
                    客製行程
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/set"
                    activeClassName="active"
                  >
                    套裝行程
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/event"
                    activeClassName="active"
                  >
                    當地活動
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="fw-bold main-menu-a mx-4"
                    to="/intro"
                    activeClassName="active"
                  >
                    營區介紹
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="day-night-switch bg-pri d-flex align-items-center justify-content-between position-relative mx-2"
                id="day-night-switch"
              >
                <div
                  className="position-absolute mx-auto text-white"
                  id="switch-text"
                >
                  day
                </div>
                <div className="switch-ball bg-white"></div>
              </div>
              <span className="material-icons cart mx-2"> local_mall </span>
              <div className="avatar mx-2">
                <img src="" alt="" />
              </div>
              <div
                className="
                d-flex
                justify-content-center
                align-items-center
                btn-outline
                mx-2
              "
              >
                <NavLink to="/login">登入</NavLink>
              </div>
              <div className="berger-list">
                <span className="material-icons"> reorder </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
