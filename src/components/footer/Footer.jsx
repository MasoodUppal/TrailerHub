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
              <Link to='/'>Terms of services</Link>
              <Link to='/'>Contact us</Link>
              <Link to='/'>About us</Link>
          </div>
          <div className="footer__content__menu">
              <Link to='/'>Live</Link>
              <Link to='/'>FAQ</Link>
              <Link to='/'>Premium</Link>
              <Link to='/'>Privacy Policy</Link>
          </div>
          <div className="footer__content__menu">
              <Link to='/'>Youe must watch</Link>
              <Link to='/'>Recent Releases</Link>
              <Link to='/'>Top IMDB</Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
