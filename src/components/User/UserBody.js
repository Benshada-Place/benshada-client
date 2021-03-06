/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { faPlus, faStream, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import $ from 'jquery';

// Component imports
import Analytics from './Analytics.js';
import Bank from './Bank/Bank.js';
import Cart from './Cart.js';
import Notifications from './Notifications.js';
import Orders from './Orders/Orders.js';
import Products from './Products/Products.js';
import Profile from './Profile/Profile.js';
import Saved from './Saved.js';
import Store from './Store/Store.js';
import Tickets from './Tickets.js';
import Image from '../Image/Image.js';
import ProductForm from '../ProductList/ProductDisplay/ProductForm.js';
import Deliveries from './Deliveries.js';
import Packages from './Packages/Packages.js';
import Company from './Company.js';
import PackageForm from './Packages/PackageForm.js';

// Action imports
import { productAdd, productsOneSelected } from '../../redux/actions/products.js';
import { deliveryPackagesAdd } from '../../redux/actions/deliveryPackages.js';

// Asset imports
import ifSeller from '../../assets/js/ifSeller.js';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';
import newItems from '../../assets/js/newItems.js';
import CardForm from './Bank/CardList/CardForm.js';
import { userUpdate } from '../../redux/actions/users.js';

const Components = {
  Analytics,
  Bank,
  Cart,
  Company,
  Deliveries,
  Notifications,
  Orders,
  Packages,
  Products,
  Profile,
  Saved,
  Store,
  Tickets
};
class UserBody extends Component {
  INIT = {
    buttonProduct: 'Upload',
    buttonPackage: 'Add',
    buttonCard: 'Add',
    newItemsClass: 'hidden',
    plusButtonIcon: 'plus'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    deliveryCompany: PropTypes.object,
    deliveryPackagesAdd: PropTypes.func,
    list: PropTypes.array,
    productAdd: PropTypes.func,
    productsOneSelected: PropTypes.func,
    store: PropTypes.object,
    user: PropTypes.object,
    userUpdate: PropTypes.func,
    pathname: PropTypes.string
  };

  productSubmit = (productData) => {
    this.setState({
      buttonProduct: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    productData.append('shop', this.props.store && this.props.store._id);
    productData.append('isBatch', this.props.user && this.props.user.type === 'UA');
    productData.delete('_id');

    this.props
      .productAdd(productData)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  packageSubmit = (packageData) => {
    this.setState({
      buttonPackage: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const {
      method,
      from,
      to,
      duration,
      maxDeliverySize,
      cost,
      pickupStationName,
      pickupStationAddress,
      pickupStationState
    } = packageData;

    const deliveryPackage = {
      method,
      from,
      to,
      duration,
      maxDeliverySize,
      cost,
      pickupStationName,
      pickupStationAddress,
      pickupStationState,
      pickupStation: {
        name: packageData.pickupStationName,
        address: packageData.pickupStationAddress,
        state: packageData.pickupStationState
      },
      deliveryCompany: this.props.deliveryCompany && this.props.deliveryCompany._id
    };

    if (!pickupStationName) delete deliveryPackage.pickupStation;
    delete deliveryPackage.pickupStationName;
    delete deliveryPackage.pickupStationAddress;
    delete deliveryPackage.pickupStationState;

    this.props
      .deliveryPackagesAdd(deliveryPackage)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  cardSubmit = (cardData, user) => {
    this.setState({
      buttonCard: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const email = user && user.email;
    const cards = (user && user.cards) || [];

    return cards.filter(({ number }) => number === cardData.number).length > 0
      ? (toast.warn('You have already added this card'), this.setState(this.INIT))
      : this.props
        .userUpdate(email, { cards: [...cards, cardData] })
        .then((response) => toast.success(
          (response && response.value && response.value.data && response.value.data.message)
                || (response && response.statusText)
                || 'Success'
        ))
        .catch((err) => toast.error(
          (err && err.response && err.response.data && err.response.data.message)
                || (err
                  && err.response
                  && err.response.data
                  && err.response.data.message
                  && err.response.data.message.name)
                || (err && err.response && err.response.statusText)
                || 'Network error'
        ))
        .finally(() => {
          this.setState(this.INIT);
          $('.modal-backdrop').remove();
        });
  };

  handleNewItems = (name) => {
    this.setState({
      newItemsClass: this.state.newItemsClass === 'hidden' ? '' : 'hidden',
      plusButtonIcon: this.state.plusButtonIcon === 'plus' ? 'times' : 'plus'
    });

    return { product: this.props.productsOneSelected({}) }[name];
  };

  productUploadRenderer = (user) => {
    const type = user && user.type;
    let all = '';

    if (ifSeller(type)) {
      all = (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <ProductForm
                  action="create"
                  buttonValue={this.state.buttonProduct}
                  onSubmit={this.productSubmit}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'UDC') {
      all = (
        <div
          className="modal fade"
          id="packageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="packageModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <PackageForm
                  action="create"
                  buttonValue={this.state.buttonPackage}
                  onSubmit={this.packageSubmit}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {all}
        <div
          className="modal fade"
          id="cardModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="cardModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <CardForm
                  action="create"
                  buttonValue={this.state.buttonCard}
                  onSubmit={(cardData) => this.cardSubmit(cardData, user)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`shadow ${this.state.newItemsClass}`} id="newItems">
          {newItems
            .filter(({ users }) => users.includes(this.props.user && this.props.user.type))
            .map(({ icon, name }, i) => (
              <div
                key={`newItem-${i}`}
                data-toggle="modal"
                data-target={`#${name}Modal`}
                className={`pointer ${i === 0 ? '' : 'border border-top-secondary'}`}
                onClick={() => this.handleNewItems(name)}
              >
                <div data-toggle="tooltip" title={name}>
                  <FontAwesomeIcon icon={icon} />
                </div>
              </div>
            ))}
        </div>
        <div
          className="btn btn-primary rounded-circle shadow-sm"
          id="addProductButton"
          onClick={this.handleNewItems}
        >
          <FontAwesomeIcon icon={this.state.plusButtonIcon === 'plus' ? faPlus : faTimes} />
        </div>
      </>
    );
  };

  renderBodyComponents = (list) => list.map((listItem) => {
    const { Title } = listItem;
    const TagName = Components[Title];

    return (
        <div
          className={`h-100 tab-pane fade user-section mt-5 ${
            this.props.pathname.includes(Title.toLowerCase()) ? 'show active' : ''
          }`}
          id={`pills-${Title}`}
          role="tabpanel"
          aria-labelledby={`pills-${Title}-tab`}
          key={`user-section-${Title}`}
        >
          <TagName user={this.props.user} store={this.props.store} />
        </div>
    );
  });

  renderHeader = ({ image }, firstName) => (
    <div className="p-3 position-fixed bg-white shadow-sm d-flex d-md-block" id="dashboardHeader">
      <button className="btn btn-white float-left border-0 d-md-none" id="dashboardMenuToggle">
        <span>
          <FontAwesomeIcon icon={faStream} />
        </span>
      </button>
      <div className="flex-grow-1 d-md-none pt-2 text-center">
        <Link className="no-link lead font-weight-bolder" to="/">
          benshada
        </Link>
      </div>
      <div className="user float-right">
        <div className="img-holder img-holder-user float-left">
          <Image type="user" image={image} size={3} />
        </div>
        <p className="pt-5 ml-2 d-none d-md-inline position-relative" style={{ top: '10px' }}>
          Hello, {firstName}
        </p>
      </div>
      <div className="clear"></div>
    </div>
  );

  render() {
    const { user, list } = this.props;
    const name = (user && user.name) || '';
    const firstName = name.includes(' ') ? name.split(' ')[0] : name;

    return (
      <>
        <div
          className="col-12 p-0 col-md-9 offset-md-3 col-lg-10 offset-lg-2 bg-light-benshada position-relative tab-content"
          id="pills-tabContent"
        >
          {this.renderHeader(user, firstName)}
          {this.renderBodyComponents(list)}
        </div>
        {this.productUploadRenderer(user)}
      </>
    );
  }
}

const mapStateToProps = ({ user, deliveryCompany }) => ({
  deliveryCompany: getDeliveryCompany(user, deliveryCompany)
});

export default connect(mapStateToProps, {
  userUpdate,
  productAdd,
  deliveryPackagesAdd,
  productsOneSelected
})(UserBody);
