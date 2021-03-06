import React, { Component } from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

import PropTypes from './node_modules/prop-types';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome';
import banner1 from './img/benshadawebbanners01.jpg';
import banner2 from './img/benshadawebbanners02.jpg';
import banner3 from './img/benshadawebbanners03.jpg';
import banner4 from './img/benshadawebbanners04.jpg';

export default class Jumbo extends Component {
  static propTypes = {
    cats: PropTypes.array
  }

  renderCats = () => this.props.cats.map(({ name, icon }, i) => (
      <div className="row text-center align-items-center flex-fill py-2" key={i}>
        <div className="col">
          <Link to={`/products/?category=${name}`}>
            <FontAwesomeIcon className="fa-3x text-primary" icon={icon} />
            <p className="font-weight-bold text-uppercase text-secondary">{name}</p>
          </Link>
        </div>
      </div>
  ));

  renderBanners = () => [
    { src: banner1, to: 'bags' },
    { src: banner2, to: 'shoes' },
    { src: banner3, to: 'clothes' },
    { src: banner4, to: 'accessories' }
  ].map(({ src, to }, i) => (
      <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
        <Link to={`/products/?category=${to}`}>
          <img alt="" src={src} className="img-fluid w-100" />
        </Link>
      </div>
  ));

  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-light pt-5 pb-0 mb-3">
        <div className="container bg-white shadow-sm">
          <div className="row">
            <div className="d-none col-lg-2 d-lg-flex flex-column">{this.renderCats()}</div>

            <div className="col-12 col-lg mb-0">
              <div className="row">
                <div id="carouselExampleIndicators" className="carousel slide w-100" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                  </ol>
                  <div className="carousel-inner">{this.renderBanners()}</div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
