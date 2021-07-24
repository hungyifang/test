import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* <!--! footer --> */}
      <footer className="footer">
        <div className="d-flex flex-column align-items-center">
          {/* <!-- TODO 連結 --> */}
          <ul className="d-flex footer-link menu">
            <li>
              <Link className="footer-link-margin" to="/customized">
                <span>客製行程</span>
              </Link>
              |
            </li>
            <li>
              <Link className="footer-link-margin" to="/set">
                <span>套裝行程</span>
              </Link>
              |
            </li>
            <li>
              <Link className="footer-link-margin" to="/event">
                <span>當地活動</span>
              </Link>
              |
            </li>
            <li>
              <Link className="footer-link-margin" to="/intro">
                <span>營區介紹</span>
              </Link>
            </li>
          </ul>
          <ul className="d-flex footer-link">
            <li>
              <a href="#/">
                <i className="ic-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="ic-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="ic-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
