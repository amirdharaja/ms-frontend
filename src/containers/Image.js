import React from 'react';

import axios from 'axios';

import { Spinner } from 'reactstrap';
import {BASE_URL} from '../store/actions/ActionTypes';


class PageImage extends React.PureComponent {

    state = {
        images: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(BASE_URL + '/page/images/')
            .then(response => {
                this.setState({ images: response.data.data, isLoading: false })
            });
    }

    render() {
        return (
            <main id='home-image'>
                {this.state.isLoading ?
                    <div id='spnner'>
                        <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
                    </div>
                    :
                    <div>
                        {this.state.images.length >= 1 && this.state.images.map(function (image, index) {
                            return <img id='page-image' key={index} alt='page-offer' src={BASE_URL + image.images} />
                        })}
                    </div>
                }
            </main>
        )
    }
}


export default PageImage;
