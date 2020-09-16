import React from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/actions';

import MainNav from '../../containers/Nav';
import Message from '../../containers/Message';
import FavouriteItem from './FavouriteItem';

import { Spinner } from 'reactstrap';
import  BASE_URL from '../Products';


class FavouriteList extends React.PureComponent {

    state = {
        favourite: [],
        cart_count: 0,
        favourite_count: 0,
        isLoading: true,
        message: '',
        alertType: 'default',
        alertVisible: false,
    }

    componentDidMount() {
        this.props.category()
        if (localStorage.getItem('token')) {
            axios.get(BASE_URL + '/favourite/', { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
                .then(response => {
                    this.setState({
                        favourite: response.data.data.favourites,
                        cart_count: response.data.data.cart_count,
                        favourite_count: response.data.data.favourite_count,
                        isLoading: false,
                    })
                })
                .catch(error => {
                    this.setState({ message: 'Unable to process, please Try again', alertType: 'danger', alertVisible: true });
                })
        }
        else {
            this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true, isLoading: false })
        }
    }

    handleDeleteFunc(item) {
        if (localStorage.getItem('token')) {
            const existingIndex = this.state.favourite.findIndex(f => f.id === item.id);
            if (existingIndex >= 0) {
                const items = this.state.favourite.slice();
                items.splice(existingIndex, 1)
                this.setState({
                    favourite: items,
                    favourite_count: this.state.favourite_count - 1
                });
            }

            axios.delete(BASE_URL + `/remove/favourite/${item.id}/`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })

                .then(response => {
                    this.setState({
                        alertType: 'info',
                        message: 'Favaurite item removed', 
                        isLoading: false,
                        alertVisible: true
                    })
                })

                .catch(error => {
                    this.setState({ message: 'Unable to process, please Try again', alertType: 'danger', alertVisible: true });
                })
        }
        else {
            this.setState({ message: 'Please Login to continues', alertType: 'warning', alertVisible: true, isLoading: false })
        }
    }

    render() {
        return (
            <div>
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
                        <div id='favourite-list'>
                            <h2 style={{ paddingTop: '100px', textAlign: 'center' }}>My Favourite Items</h2>
                            <hr />
                            <table>
                                <tbody>
                                    {this.props.isAuthenticated  &&
                                        this.state.favourite.map((item, index) => <FavouriteItem {...item} {...index} key={index}
                                            removeFunc={this.handleDeleteFunc.bind(this)} />)
                                    }
                                </tbody>
                            </table>
                        </div>
                }

                {this.state.favourite.length <= 0 && 
                <h4 style={{textAlign:'center'}}>Yours favourite list empty</h4>}
            </div>

        )
    }
}


const mapStateToProps = state => {
    return state
}


const mapDispatchToProps = dispatch => {
    return {
        category: () => dispatch(userActions.getCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteList);
