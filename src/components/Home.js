
import React, { Component } from 'react';

import * as userActions from '../store/actions/actions';
import { connect } from 'react-redux';

import MainNav from '../containers/Nav.js';
import HomeCarousel from '../containers/HomeCarousel.js';
import Category from '../containers/Category';
import About from '../containers/About';
import Contact from '../containers/Contact';
import ItemSlide from '../containers/ItemSlide';
import BrandSlide from '../containers/BrandSlide';
import PageImage from '../containers/Image';

import { Spinner } from 'reactstrap';
import '../styles/css/style.css'


class Home extends Component {

  componentDidMount() {
    this.props.getHome()
  }

  render() {
    return (
      <div className="Home">

        <MainNav
          category_names={this.props.category_details}
          cart_count={this.props.cart_count}
          favourite_count={this.props.favourite_count}
        />
        {this.props.loading ?
          <div id='spnner'>
            <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
          </div>
          :
          <HomeCarousel
            main_slide_images={this.props.main_slide_images}
          />
        }
        {this.props.loading ?
          <div id='spnner'>
            <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
          </div>
          :
          <Category
            category_details={this.props.category_details}
          />
        }
        <PageImage />
        <About />
        <ItemSlide />
        <Contact />
        <BrandSlide />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    getHome: () => dispatch(userActions.getHome()),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Home);
