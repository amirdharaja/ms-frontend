import React from 'react';

import axios from 'axios';
import CartItem from './CartItem';
import MainNav from '../../containers/Nav';
import Message from '../../containers/Message';

import { connect } from 'react-redux';
import * as userActions from '../../store/actions/actions';

import { Spinner } from 'reactstrap';

import BASE_URL from './CartItem';


class CartList extends React.PureComponent {

    state = {
        cart: [],
        category_details: [],
        cart_total_amount: 0,
        shipping_charge: 0,
        cart_count: 0,
        favourite_count: 0,
        isLoading: true,
        message: '',
        alertType: '',
        alertVisible: false,
    }

    componentDidMount() {
        this.props.cartData()
        if (localStorage.getItem('token')) {
            axios.get(BASE_URL + '/cart/', { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
                .then(response => {
                    this.setState({
                        cart: response.data.data.carts,
                        category_details: response.data.data.categories,
                        cart_count: response.data.data.cart_count,
                        favourite_count: response.data.data.favourite_count,
                        cart_total_amount: response.data.data.cart_total_amount,
                        alertType: 'success',
                        isLoading: false,
                    })
                })
                .catch(error => {
                    if (error.response) {
                        this.setState({ message: error.response.data.error, alertType: 'danger', alertVisible: true });
                    }
                    else this.setState({ message: 'Unable to process, please Try again', alertType: 'danger', alertVisible: true });
                })
        }
        else {
            this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true, isLoading:false })
        }
    }

    handleChangeFunc(cart) {
        if (localStorage.getItem('token')) {

            const existingCartIndex = this.state.cart.findIndex(c => c.id === cart.id);
            if (existingCartIndex >= 0) {
                const carts = this.state.cart.slice();
                const existingCart = carts[existingCartIndex]

                if (cart.add === true) {
                    const updateCartCount = {
                        ...existingCart,
                        count: existingCart.count + 1,
                    };
                    this.setState({ cart_total_amount: this.state.cart_total_amount + cart.rate })
                    carts[existingCartIndex] = updateCartCount;

                    this.setState({ cart: carts, cart_count: this.state.cart_count + 1 });
                }
                else {
                    const updateCartCount = {
                        ...existingCart,
                        count: existingCart.count - 1
                    };
                    this.setState({ cart_total_amount: this.state.cart_total_amount - cart.rate })
                    if (updateCartCount.count <= 0) {
                        carts.splice(existingCartIndex, 1)
                    }
                    else { carts[existingCartIndex] = updateCartCount };

                    this.setState({ cart: carts, cart_count: this.state.cart_count - 1 });
                }
            }

            axios.put(BASE_URL + '/update/cart/', {
                cart: cart
            }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })

                .then(response => {
                    this.setState({
                        message: response.data.message,
                        alertType: 'success',
                        isLoading: false,
                        alertVisible: true
                    })
                })

                .catch(error => {
                    console.log(error)
                    if (error.response) {
                        this.setState({ message: error.response.data.message, alertType: 'warning', alertVisible: true });
                    }
                    else this.setState({ message: 'Unable to process, please Try again', alertType: 'danger', alertVisible: true });
                })

        }
        else {
            this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true })
        }
    }

    handleDeleteFunc(cart) {
        if (localStorage.getItem('token')) {
            const existingCartIndex = this.state.cart.findIndex(c => c.id === cart.id);
            if (existingCartIndex >= 0) {
                const carts = this.state.cart.slice();
                carts.splice(existingCartIndex, 1)
                this.setState({
                    cart: carts,
                    cart_count: this.state.cart_count - cart.count,
                    cart_total_amount: this.state.cart_total_amount - (cart.count * cart.rate)
                });
            }

            axios.delete(BASE_URL + `/remove/cart/${cart.id}/`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })

                .then(response => {
                    this.setState({
                        message: 'Cart item removed',
                        alertType: 'success',
                        isLoading: false,
                        alertVisible: true
                    })
                })

                .catch(error => {
                    console.log(error)
                    if (error.response) {
                        this.setState({ message: error.response.data.error, alertType: 'danger', alertVisible: true });
                    }
                    else this.setState({ message: 'Unable to process, please Try again', alertType: 'danger', alertVisible: true });
                })

        }
        else {
            this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true })
        }
    }

    render() {
        return (
            <main>
                <div style={{ marginTop: '0px', position: 'fixed', zIndex: 9999 }}>
                    <MainNav
                        cart_count={this.state.cart_count}
                        favourite_count={this.state.favourite_count}
                    />
                </div>

                {this.state.alertVisible &&
                    <Message
                        messageTitle={this.state.messageTitle}
                        message={this.state.message}
                        alertType={this.state.alertType}
                    />
                }


                {
                    this.state.isLoading
                        ?
                        <div id='spnner'>
                            <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
                        </div>
                        :
                        <div>
                            {(this.state.cart_count > 0 && this.props.isAuthenticated) ?
                                <span>
                                    <h2 style={{ paddingTop: '100px', textAlign: 'center' }}>Cart Summery</h2>
                                    <hr />
                                    <div id='cart-page-button' style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                                        <a href='/'><button id='continue'>Continue Shopping</button></a>
                                        <a href='/checkout'><button id='checkout'>Continue Checkout</button></a>
                                    </div>
                                    <hr />
                                    <div id='snippet'>
                                        <hr />
                                        <h5> Cart Total &nbsp; : &nbsp;₹ {this.state.cart_total_amount}</h5>
                                        <hr />
                                    </div>
                                    <hr />
                                    <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                            this.state.cart.map((item, index) => <CartItem {...item} key={index}
                                                changeFunc={this.handleChangeFunc.bind(this)}
                                                removeFunc={this.handleDeleteFunc.bind(this)} />)
                                        }
                                    </div>
                                    <hr />
                                    <div id='cart-page-button' style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                                        <a href='/'><button id='continue'>Continue Shopping</button></a>
                                        <a href='/checkout'><button id='checkout'>Continue Checkout</button></a>
                                    </div>
                                    <hr />
                                </span>
                                :
                                <div style={{ minHeight: '340px' }}>
                                    <h2 style={{ paddingTop: '100px', textAlign: 'center' }}>Cart is Empty</h2>
                                    <hr />
                                    <div id='cart-page-button' style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                                        <a href='/'><button id='continue'>Continue Shopping</button></a>
                                    </div>
                                    <hr />
                                </div>
                            }
                        </div>
                }


            </main>

        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        cartData: () => dispatch(userActions.getCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
