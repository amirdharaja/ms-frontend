import React from 'react';
import axios from 'axios'

import { connect } from 'react-redux';
import * as userActions from '../store/actions/actions';


import Product from '../containers/Product';
import MainNav from '../containers/Nav';
import Message from '../containers/Message';

import item_not_found_1 from '../resources/item_not_found_1.jpg'

import { Input, ListGroupItem, Row, Col, Form, Spinner } from 'reactstrap'


const BASE_URL = 'http://127.0.0.1:8000'

class Products extends React.PureComponent {

  state = {
    products: [],
    category_names: [],
    cart_count: 0,
    favourite_count: 0,
    isLoading: true,
    messageTitle: '',
    message: '',
    alertType: 'default',
    alertVisible: false,
    filter: {
      search_keyword: '',
      paginate: 12,
      sort: 'A',
    }
  }


  filterInputChanged = event => {
    const filter = this.state.filter;
    filter[event.target.name] = event.target.value;
    this.setState({
      filter: filter
    });
    this.componentDidMount()
  }

  componentDidMount() {
    this.getProducts(1)
  }

    getProducts = (page) => {
    this.props.category()

    let url = this.props.location.pathname + `?page=${page}&paginate=${this.state.filter.paginate}&sort=${this.state.filter.sort}&search_keyword=${this.state.filter.search_keyword}`
    if (localStorage.getItem('token')) {
      axios.get(BASE_URL + url, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
        .then(response => {
          this.setState({
            products: response.data.data.items,
            category_names: response.data.data.category_names,
            cart_count: response.data.data.cart_count,
            favourite_count: response.data.data.favourite_count,
            isLoading: false,
          })
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.error, alertColor: 'danger', alertVisible: true, isLoading: false });
          }
          else this.setState({ message: 'Unable to process, please Try again', alertColor: 'danger', alertVisible: true, isLoading: false });
        })
    }
    else {
      axios.get(BASE_URL + url)
        .then(response => {
          this.setState({
            products: response.data.data.items,
            category_names: response.data.data.category_names,
            isLoading: false,
          })
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.error, alertColor: 'danger', alertVisible: true, isLoading: false });
          }
          else this.setState({ message: 'Unable to Process, please Try again', alertColor: 'danger', alertVisible: true, isLoading: false });
        })
    }
  }


  handleFavouriteFunc = (product) => {
    if (localStorage.getItem('token')) {
      axios.post(BASE_URL + '/add/favourite/', { item: product }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
        .then(response => {
          this.setState({
            favourite_count: response.data.data.favourite_count,
            message: response.data.message,
            alertType: response.data.alertType ? response.data.alertType : 'success',
            isLoading: false,
            alertVisible: true
          })
        })
        .catch(err => {
          alert(err)
          if (err.response) {
            this.setState({ message: err.response, alertType: 'danger', alertVisible: true });
          }
          else this.setState({ message: 'Unable to continue, Please try again', alertType: 'danger', alertVisible: true })
        })
    }
    else {
      this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true })
    }
  }


  handleAddFunc = (product) => {
    if (localStorage.getItem('token')) {
      axios.post(BASE_URL + '/add/cart/', {
        cart: product
      }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } })
        .then(response => {
          this.setState({
            message: response.data.message,
            cart_count: response.data.data.cart_count,
            alertType: 'success',
            isLoading: false,
            alertVisible: true
          })
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.error, alertType: 'danger', alertVisible: true });
          }
          else this.setState({ message: 'Unable to continue, please Try again', alertType: 'danger', alertVisible: true });
        })
    }
    else {
      this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true })
    }
  }

  render() {
    return (
      <main className='products'>
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

        <div className='card-list'>

          <div className='side-menu'>
            <ListGroupItem id='heading' key='caterory'>CATEGORIES</ListGroupItem>
            {
              this.state.category_names.map(function (category, index) {
                return (
                  <div key={index}>
                    <ListGroupItem id='category' tag='a' href={`/category/${category.slug}/${category.id}/all-items/`}>{category.name}</ListGroupItem>
                    {
                      category.sub_categories.map(function (sub_category, index) {
                        return (
                          <div key={index}>
                            <ListGroupItem id='sub_category' tag='a' href={`/category/${category.slug}/${category.id}/all-items/${sub_category.id}/`}>{sub_category.name}</ListGroupItem>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
          <div className='items'>

            <div id='item-nav'>
              <Form id="filter-form">
                <Row form>

                  <Col md={3}>
                    <Input
                      type='select'
                      name="paginate"
                      value={this.state.paginate}
                      onChange={this.filterInputChanged}
                    >
                      <option value="12">Show : 12</option>
                      <option value="24">Show : 24</option>
                      <option value="36">Show : 36</option>
                    </Input>
                  </Col>

                  <Col md={3}>
                    <Input
                      type='select'
                      name="sort"
                      value={this.state.sort}
                      onChange={this.filterInputChanged}
                    >
                      <option value="A">Sort By Name (A - Z)</option>
                      <option value="D">Sort By Name (Z - A)</option>
                      <option value="L">Sort By Price (Low - High)</option>
                      <option value="H">Sort By Price (High -Low)</option>
                    </Input>
                  </Col>

                  <Col md={6}>
                    <Input
                      type="search"
                      name="search_keyword"
                      placeholder="Search Product"
                      value={this.state.search_keyword}
                      onChange={this.filterInputChanged}
                    />
                  </Col>

                </Row>

              </Form>

            </div>

            {this.state.isLoading ?
              <div id='spnner'>
                <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
              </div>
              :
              <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }} >
                {(this.state.products.length !== 0)
                  ? this.state.products.map(product => <Product key={product.id} {...product} addFunc={this.handleAddFunc} addFavourite={this.handleFavouriteFunc}/>)
                  : <div><h4 style={{ textAlign: 'center', marginTop: '50px' }}><img width='300px' alt='No item found' src={item_not_found_1} /></h4></div>
                }
              </div>
            }
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    category: () => dispatch(userActions.getCategory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);