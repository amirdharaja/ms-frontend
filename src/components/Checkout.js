
import React, { Component } from 'react';

import { Spinner } from 'reactstrap';

import axios from 'axios';
import { connect } from 'react-redux';
import * as userActions from '../store/actions/actions';

import MainNav from '../containers/Nav';
import Message from '../containers/Message';

import {BASE_URL} from '../store/actions/ActionTypes';


class Checkout extends Component {


  state = {
    can_add_new_address: true,
    new_address: { address_type: 'Home', },
    payment_type: null,
    existing_address_id: null,
    form_is_valid: false,

    isLoading: true,
    message: '',
    alertType: 'default',
    alertVisible: false,

    errors: {},

    name: 'Card Holder',
    number: 'xxxx xxxx xxxx xxxx',
    month: 'MM',
    day: 'YY',
    ccv: 'CCV'

  }

  nameChange(n) {
    this.setState({
      name: n.target.value
    });
  }

  numberChange(c) {
    this.setState({
      number: c.target.value
    });
  }

  monthChange(m) {
    this.setState({
      month: m.target.value
    });
  }

  dayChange(d) {
    this.setState({
      day: d.target.value
    });
  }

  ccvChange(v) {
    this.setState({
      ccv: v.target.value
    });
  }


  addressDisplayController = () => {
    let check = this.state.can_add_new_address
    this.setState({ can_add_new_address: !check })
  }

  shippingAddressController = event => {
    this.setState({ existing_address_id: event.target.value, alertVisible: false, errors: {} })
  }

  shippingNewAddressController = event => {
    const data = this.state.new_address;
    data[event.target.name] = event.target.value;
    this.setState({
      new_address: data,
      existing_address_id: null,
      errors: {},
      alertVisible: false,
    });
  }

  paymentTypeController = event => {
    this.setState({ payment_type: event.target.value, errors: {}, alertVisible: false })
  }

  submitCheckoutForm = (event) => {
    let is_valid = this.checkoutFormValidation()
    event.preventDefault();
    if (is_valid && localStorage.getItem('token')) {
      let data;
      this.state.can_add_new_address
        ? data = { address: this.state.new_address, payment_type: this.state.payment_type }
        : data = { existing_address_id: this.state.existing_address_id, payment_type: this.state.payment_type }
      axios.post(BASE_URL + '/order/checkout/', {
        data: data
      }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
        .then(response => {
          this.setState({ message: 'Success, Order placed', alertType: 'success', alertVisible: true, isLoading: false });
          if (response.status === 200) {
            window.location.replace("/orders");
          }
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.message, alertType: 'danger', alertVisible: true, isLoading: false });
          }
          else this.setState({ message: 'Unable to Continue, please Try again', alertType: 'danger', alertVisible: true, isLoading: false });
        })

    }
    else if (!is_valid) {
      this.setState({
        isLoading: false,
        message: 'Form is not valid, Please fill all the required fields',
        alertType: 'danger',
        alertVisible: true,
      })
    }
    else {
      this.setState({
        isLoading: false,
        message: 'Please Login to continue',
        alertType: 'info',
        alertVisible: true,
      })
      window.location.replace("/");
    }
  }

  checkoutFormValidation = () => {
    let formIsValid = true;
    let errors = {};
    let fields = this.state.new_address;
    let payment_type = this.state.payment_type
    if (!this.state.can_add_new_address) {

      if (!payment_type || payment_type === '') {
        errors["payment_type"] = "*Select Payment Type";
        formIsValid = false
      }

      if (this.state.existing_address_id === null || this.state.existing_address_id === '') {
        errors["existing_address"] = "*Please select any one of the address from the list OR Enter new address";
        formIsValid = false
      }
      this.setState({ errors: errors });
      return formIsValid;
    }

    else {

      if (!payment_type || payment_type === '') {
        errors["payment_type"] = "*Select Payment Type";
        formIsValid = false
      }

      if (!fields["home_number"] || fields["home_number"] === '') {
        errors["home_number"] = "*Home number cannot be empty";
        formIsValid = false
      }

      if (!fields["street"] || fields["street"] === '') {
        errors["street"] = "*Street details cannot be empty";
        formIsValid = false
      }

      if (!fields["area"] || fields["area"] === '') {
        errors["area"] = "*Area cannot be empty";
        formIsValid = false
      }

      if (!fields["landmark"] || fields["landmark"] === '') {
        errors["landmark"] = "*Landmark cannot be empty";
        formIsValid = false
      }

      if (!fields["city_id"] || fields["city_id"] === '') {
        errors["city"] = "*Please select City";
        formIsValid = false
      }

      if (!fields["pincode_id"] || fields["pincode_id"] === '') {
        errors["pincode"] = "*Please select Pincode";
        formIsValid = false
      }

      if (!fields["address_type"] || fields["address_type"] === '') {
        errors["address_type"] = "*Please select address type";
        formIsValid = false
      }
      this.setState({ errors: errors });
      return formIsValid;
    }
  }

  componentDidMount() {
    this.props.checkout()
    this.props.category()
  }

  render() {
    return (
      <div id='checkout-page'>
        <div style={{ marginTop: '0px', position: 'fixed', zIndex: 9999 }}>
          <MainNav
            cart_count={this.props.cart_count}
            favourite_count={this.props.favourite_count}
          />
        </div>

        {this.state.alertVisible &&
          <Message
            messageTitle={this.state.messageTitle}
            message={this.state.message}
            alertType={this.state.alertType}
          />
        }

        {(this.props.isLoading)
          ?
          <div id='spnner'>
            <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
          </div>
          :
          <div>
            {(this.props.cart_count >= 1)
              ?
              <div style={{ paddingTop: '100px', textAlign: 'center', fontFamily: 'ubuntu' }}>
                <h3 style={{ textAlign: 'center' }}>Checkout Form</h3>
                <hr />
                <div id='checkout'>
                  <div id='address'>
                    <h3>Shipping Address</h3><br />
                    <hr />
                    <form onSubmit={this.submitCheckoutForm}>
                      <h5>Yes, I select from the previous saved address</h5>
                      <label className="switch">
                        <input type="checkbox" onChange={this.addressDisplayController} />
                        <span className="slider round"></span>
                      </label>
                      <hr />
                      {(this.state.can_add_new_address === false) ?
                        <div>
                          {(this.props.address.length !== 0) ?
                            <div>
                              <select id='select-address' onChange={this.shippingAddressController}>
                                <option name='address' value=''>Select Address</option>
                                {this.props.address.map(function (address, index) {
                                  return (
                                    <option value={address.id} key={index}>#{index + 1} - {address.address_type} - {address.home_number}, {address.street}, {address.area}</option>
                                  )
                                })}
                              </select>
                              <div className="errorMsg">{this.state.errors.existing_address}</div>
                            </div>
                            :
                            <h6 id='no-address-info'>You have no saved address</h6>
                          }
                        </div>
                        :
                        <div>
                          <h5><strong><u>New Address</u></strong></h5>
                          <div id='address-form'>
                            <div>
                              <label htmlFor="home_number">Home / Apartment No*</label>
                              <input
                                type='text'
                                placeholder='54/A'
                                id='home_number'
                                name='home_number'
                                onChange={this.shippingNewAddressController}
                                value={this.state.new_address.home_number}
                              />
                              <div className="errorMsg">{this.state.errors.home_number}</div>

                            </div>

                            <div>
                              <label htmlFor="street">Street*</label>
                              <input
                                type='text'
                                placeholder='Main street'
                                id='street'
                                name='street'
                                onChange={this.shippingNewAddressController}
                                value={this.state.new_address.street}
                              />
                              <div className="errorMsg">{this.state.errors.street}</div>
                            </div>
                            <div>
                              <label htmlFor="area">Area*</label>
                              <input
                                type='text'
                                placeholder='Gandhipuram'
                                id='area'
                                name='area'
                                onChange={this.shippingNewAddressController}
                                value={this.state.new_address.area}
                              />
                              <div className="errorMsg">{this.state.errors.area}</div>
                            </div>
                            <div>
                              <label htmlFor="landmark">Landmark*</label>
                              <input
                                type='text'
                                placeholder='Behind Ganapathi silks '
                                id='landmark'
                                name='landmark'
                                onChange={this.shippingNewAddressController}
                                value={this.state.new_address.landmark}
                              />
                              <div className="errorMsg">{this.state.errors.landmark}</div>
                            </div>
                            <div>
                              <label htmlFor="landmark">City*</label>
                              <select
                                name='city_id'
                                onChange={this.shippingNewAddressController}
                              >
                                <option name='pincode_id' value=''>Select City</option>
                                {this.props.city.map(function (city, index) {
                                  return (
                                    <option
                                      key={index}
                                      value={city.id}
                                    >{city.name}</option>
                                  )
                                })}
                              </select>
                              <div className="errorMsg">{this.state.errors.city}</div>
                            </div>

                            <div>
                              <label htmlFor="landmark">Pincode*</label>
                              <select
                                name='pincode_id'
                                onChange={this.shippingNewAddressController}
                              >
                                <option name='pincode_id' value=''>Select Pincode</option>
                                {this.props.pincode.map(function (pincode, index) {
                                  return (
                                    <option
                                      key={index}
                                      value={pincode.id}
                                    >{pincode.pincode}</option>
                                  )
                                })}
                              </select>
                              <div className="errorMsg">{this.state.errors.pincode}</div>
                            </div>
                            <div>
                              <label htmlFor="landmark">Address Type*</label>
                              <select
                                name='address_type'
                                onChange={this.shippingNewAddressController}>
                                <option value='Home'>Home</option>
                                <option value='Work'>Work</option>
                                <option value='Other'>Other</option>
                              </select>
                              <div className="errorMsg">{this.state.errors.address_type}</div>
                            </div>
                          </div>
                        </div>
                      }
                      <hr />
                      <h5>Payment Option</h5>
                      <div id='payment-option'>
                        <div className="custom-control custom-radio"
                          name='payment'
                          onChange={this.paymentTypeController}>
                          <input id="a" name="payment_option" value="COD" type="radio"
                            className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="a">COD</label>
                        </div>
                        <div className="custom-control custom-radio"
                          name='payment'
                          onChange={this.paymentTypeController}>
                          <input id="b" name="payment_option" value="Wallet" type="radio"
                            className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="b">Wallet</label>
                        </div>
                        <div className="custom-control custom-radio"
                          name='payment'
                          onChange={this.paymentTypeController}>
                          <input id="c" name="payment_option" value="Card" type="radio"
                            className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="c">Card</label>
                        </div>
                      </div>
                      <div className="errorMsg">{this.state.errors.payment_type}</div>
                      <hr />
                      {(this.state.payment_type === 'Wallet') &&
                        <div>
                          {(this.props.wallet_balance < this.props.cart_total_amount + this.props.shipping_charge)
                            ?
                            <div>
                              <h4 id='insufficient-wallet'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" /></svg>
                                    Wallet balance insufficient</h4>
                              <h6>Wallet balance : ₹ {this.props.wallet_balance}</h6>
                              <h6>Total cart amount: ₹ {this.props.cart_total_amount + this.props.shipping_charge}</h6>
                            </div>
                            :
                            <div>
                              <h4 id='sufficient-wallet'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                        Wallet balance sufficient</h4>
                              <h6>Wallet balance : ₹ {this.props.wallet_balance}</h6>
                              <h6>Total cart amount: ₹ {this.props.cart_total_amount + this.props.shipping_charge}</h6>
                            </div>
                          }
                        </div>
                      }

                      {(this.state.payment_type === 'Card') &&
                        <div>
                          <div className="credit">
                            <div>
                              <div><h1 className="credit__bank">My Bank</h1></div>
                            </div>
                            <div>
                              <div>
                                <p className="credit__card-number">{this.state.number}</p>
                                <span className="credit__ccv">{this.state.ccv}</span>
                              </div>
                              <div>
                                <p className="credit__name">{this.state.name}</p>
                                <p className="credit__date">{this.state.month} / {this.state.day}</p>
                              </div>
                            </div>
                          </div>
                          <div className='credit__card-inputs'>

                            <div>
                              <label htmlFor="name">Name</label>
                              <input type='text' placeholder='Card holder Name' onChange={this.nameChange.bind(this)} />
                            </div>
                            <div>
                              <label htmlFor="card_number">Card Number</label>
                              <input type='text' maxLength={12} minLength={12} placeholder='Card holder Name' onChange={this.numberChange.bind(this)} />
                            </div>

                            <div className='credit__dates'>
                              <label htmlFor="mm">Month</label>
                              <input type='text' maxLength={2} minLength={2} placeholder='Month' onChange={this.monthChange.bind(this)} />
                              <label htmlFor="yy">Year</label>
                              <input type='text' maxLength={2} minLength={2} placeholder='Year' onChange={this.dayChange.bind(this)} />
                              <label htmlFor="cvv">CVV</label>
                              <input type='text' maxLength={3} minLength={3} placeholder='CVV' onChange={this.ccvChange.bind(this)} />
                            </div>

                          </div>
                        </div>
                      }
                      {!this.state.payment_type
                        ? <button id='checkout-button' type="submit" onClick={this.submitCheckoutForm}>Continue to checkout</button>
                        : <button id='checkout-button' type="submit" onClick={this.submitCheckoutForm}>Confirm & Pay via {this.state.payment_type} <span style={{ fontWeight: 'normal' }}>(₹ {this.props.cart_total_amount + this.props.shipping_charge})</span></button>
                      }
                      <hr />
                    </form>
                  </div>
                  <div id='checkout-snippet'>
                    <h3>Wallet Balance : ₹ {this.props.wallet_balance}</h3>
                    <h2>
                      <table>
                        <tbody>
                          <tr>
                            <td id='a'>Your Cart </td>
                            <td id='b'>{this.props.cart_count}</td>
                          </tr>
                        </tbody>
                      </table>
                    </h2>
                    <div>
                      <hr />
                      {this.props.cart.map(function (item, index) {
                        return (
                          <div key={index}>
                            <table>
                              <tbody>
                                <tr>
                                  <td id='a'>{item.count} x {item.name} ({item.weight}Kg)</td>
                                  <td id='b'>₹ {item.count * item.rate}</td>
                                </tr>
                              </tbody>
                            </table>
                            <hr />
                          </div>
                        )
                      })
                      }
                      <h5 id='sub-total'>
                        <table>
                          <tbody>
                            <tr>
                              <td id='a'>Sub Total</td>
                              <td id='b'>₹ {this.props.cart_total_amount}</td>
                            </tr>
                          </tbody>
                        </table>
                      </h5>
                      <hr />
                      <h5 id='sub-total'>
                        <table>
                          <tbody>
                            <tr>
                              <td id='a'>Shipping Charge</td>
                              <td id='b'> ₹ {this.props.shipping_charge}</td>
                            </tr>
                          </tbody>
                        </table>
                      </h5>
                      <hr />
                      <h5 id='grand-total'>
                        <table>
                          <tbody>
                            <tr>
                              <td id='a'> Grand Total</td>
                              <td id='b'> ₹ {this.props.cart_total_amount + this.props.shipping_charge}</td>
                            </tr>
                          </tbody>
                        </table>
                      </h5>

                      <hr />
                    </div>
                    <div id='input'>
                      <input placeholder='Promo Code'></input><button>REDEEM</button>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div style={{ minHeight: '600px', textAlign: 'center', paddingTop: '100px' }}>
                <hr />
                  Your Shopping bag is empty
                <hr />
                <div id='cart-page-button'>
                  <a href='/'><button id='continue'>Continue Shopping</button></a>
                </div>
                <hr />
              </div>
            }
          </div>
        }
      </div>


    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    checkout: () => dispatch(userActions.checkoutData()),
    category: () => dispatch(userActions.getCategory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
