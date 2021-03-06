import React, { Component } from './node_modules/react';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome';
import { Link } from './node_modules/react-router-dom';
import PropTypes from './node_modules/prop-types';
import All from '../../All/All.js';

export default class Category extends Component {
  static propTypes = {
    reversed: PropTypes.bool,
    shortDesc: PropTypes.string,
    icon: PropTypes.object
  }

  render() {
    const { reversed, shortDesc, icon } = this.props;

    return (
      <div className="container my-4 bg-white h-100">
        <div className={`row bg-warning ${reversed ? 'flex-row-reverse' : ''}  h-100 align-items-center`}>
          <div className="col-12 col-md-3 p-4">
            <h5 className="text-capitalize">{shortDesc}</h5>
            <p>
              Make your selection from our latest arrivals and top deals in this category to add to your cart. <br />{' '}
              Some of these products are discounted also.
            </p>

            <Link to={`/products/?category=${shortDesc}`}>
              <button className="btn btn-outline-danger rounded-pill mt-3">Shop Now</button>
            </Link>
            <div className="text-right">
              <FontAwesomeIcon icon={icon} className="fa-3x" />
            </div>
          </div>
          <div className="col flex-grow-1 bg-white py-4">
            <All type="product" className="category d-inline-block" productCategory={shortDesc} title="" limit={12} />
          </div>
        </div>
      </div>
    );
  }
}
