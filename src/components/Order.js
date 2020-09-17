import React, { Component } from 'react';

import MainNav from '../containers/Nav.js';
import { Spinner } from 'reactstrap';

import { connect } from 'react-redux';
import * as userActions from '../store/actions/actions';



class Order extends Component {

  componentDidMount() {
    this.props.getOrders()
    this.props.category()
  }

  render() {
    return (
      <main>
        <MainNav
          cart_count={this.props.cart_count}
          favourite_count={this.props.favourite_count}
        />
        <div className='orders'>
          <h3 style={{ textAlign: 'center' }}>My Orders</h3>
          {this.props.isLoading
            ?
            <div id='spnner'>
              <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
            </div>
            :
            <>
              {this.props.isAuthenticated &&
                <div>
                  <div className='orders__count'>
                    <div className='card orders__count__card'>
                      <h4>Total</h4>
                      <h4>{this.props.orders_count.total}</h4>
                    </div>
                    <div className='card orders__count__card'>
                      <h4>Current</h4>
                      <h4>{this.props.orders_count.current}</h4>
                    </div>
                    <div className='card orders__count__card'>
                      <h4>Delivered</h4>
                      <h4>{this.props.orders_count.delivered}</h4>
                    </div>
                    <div className='card orders__count__card'>
                      <h4>Canceled</h4>
                      <h4>{this.props.orders_count.canceled}</h4>
                    </div>
                  </div>

                  <div className='orders__orders'>

                    {this.props.ordered_items.length >= 1 ? (
                      <div>
                        {this.props.ordered_items.map(function (item, index) {
                          return (
                            <div key={index}>

                              <div className='orders__orders__items' key={index}>

                                {item.status !== 'Canceled' && item.status !== 'Delivered' && item.status !== 'Pending' ? (
                                  <div className="row px-3" style={{ width: '100%' }}>
                                    <div className="col">
                                      <ul id="progressbar">
                                        <li className="step0 active " id="step1">PLACED</li>
                                        {item.status === 'Out for Delivery' ? (
                                          <li className="step0 active text-center pulse" id="step2">OUT FOR DELIVERY</li>
                                        ) : (<li className="step0 text-center" id="step2">OUT FOR DELIVERY</li>)
                                        }

                                        {item.status === 'Delivered' ? (
                                          <li className="step0 active text-muted text-right" id="step3">DELIVERED</li>
                                        ) : (<li className="step0 text-muted text-right" id="step3">DELIVERED</li>)
                                        }

                                      </ul>
                                    </div>
                                  </div>) : (<div></div>)
                                }


                                <div className='card orders__orders__items__item'>
                                  <h3>ORDER</h3>
                                  <h4>ID : {item.order_id}</h4>
                                  <h5>TOTAL : ₹ {item.total_cost + item.shipping_charge} </h5>
                                  <h5>PAYMENT : {item.payment}</h5>
                                  <h6>{item.status}</h6>
                                </div>
                                <div className='card orders__orders__items__item'>
                                  <h3>ADDRESS</h3>
                                  <span><strong>{item.address.address_type}</strong></span>
                                  <span>{item.address.home_number}, {item.address.street}</span>
                                  <span>{item.address.landmark}</span>
                                  <span>{item.address.area}</span>
                                  <span>{item.address.city} - {item.address.pincode}</span>
                                </div>
                                <div className='card orders__orders__items__item'>
                                  <h3>ITEMS</h3>
                                  <table>
                                    <tbody>
                                      {item.items.map(function (data, index) {
                                        return (
                                          <tr key={index}>
                                            <td>{data.count} X {data.name} ({data.weight} Kg)</td>
                                            <td>₹ {data.count * data.rate}</td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>


                            </div>


                          )
                        })}
                      </div>
                    ) : (
                        <div><h4>No data found</h4></div>
                      )
                    }
                  </div>
                </div>
              }
            </>
          }

          <hr />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return state
}


const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(userActions.getOrders()),
    category: () => dispatch(userActions.getCategory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
