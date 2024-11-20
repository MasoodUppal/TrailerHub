import React from "react";
import './footer.scss';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content container">
        <div className="footer__content__logo">
          <Link to='/'>Trailer hub</Link>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
              <Link to='/'>Home</Link>
              <Link to='/about'>About us</Link>
              <Link to='/contact'>Contact us</Link>
              <Link to='/terms'>Terms of services</Link>
          </div>
          <div className="footer__content__menu">
              <Link to='/live'>Live</Link>
              <Link to='/faq'>FAQ</Link>
              <Link to='/premium'>Premium</Link>
              <Link to='/privacy'>Privacy Policy</Link>
          </div>
          {/* <div className="footer__content__menu">
              <Link to='/'>Youe must watch</Link>
              <Link to='/'>Recent Releases</Link>
              <Link to='/'>Top IMDB</Link>

          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Footer;
