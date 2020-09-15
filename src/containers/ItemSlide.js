import React from 'react';
import axios from 'axios'

import { Spinner } from 'reactstrap'
import '../styles/css/style.css';

import $ from 'jquery';
const BASE_URL = 'http://127.0.0.1:8000'

class ItemSlide extends React.PureComponent {

    state = {
        items: [],
        isLoading: true
    }

    scroll(direction) {
        let far = $('.image-container').width() / 2 * direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate({ scrollLeft: pos }, 1000)
    }

    componentDidMount() {
        axios.get(BASE_URL + '/best-selling-products/')
            .then(response => {
                this.setState({ items: response.data.data, isLoading: false })
            });
    }

    render() {
        return (
            <main id='item-slider'>
                <h3 id='title'>BEST SELLING PRODUCTS</h3>
                {this.state.isLoading ?
                    <div id='spnner'>
                        <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
                    </div>
                    :
                    <div className="main">
                        <div className="wrapper">
                            <div className="image-container">
                                {this.state.items && this.state.items.map(function (item, index) {
                                    return (
                                        <a href={`/${item.sub_category_id}/${item.slug}/${item.id}`} key={index}>
                                            <div className="image">
                                                <img src={BASE_URL + '/images/' + item.image} alt={item.name} />
                                                <h4>{item.name}</h4>
                                            </div>
                                        </a>)
                                })}
                            </div>
                            <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                            <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
                        </div>
                    </div>
                }
            </main>
        )
    }
}


export default ItemSlide;
