import React from 'react';
import axios from 'axios'

import { Spinner } from 'reactstrap'
import '../styles/css/style.css';

const BASE_URL = 'http://127.0.0.1:8000'

class PageImage extends React.PureComponent {

    state = {
        images: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(BASE_URL + '/page/images/')
            .then(response => {
                console.log(response.data.data)
                this.setState({ images: response.data.data, isLoading: false })
            });
    }

    render() {
        console.log(this.state.images)
        return (
            <main id='home-image'>
                {this.state.isLoading ?
                    <div id='spnner'>
                        <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
                    </div>
                    :
                    <div>
                        {this.state.images.length >= 1 && this.state.images.map(function (image, index) {
                            return <img id='page-image' key={index} alt='page-image' src={BASE_URL + image.images} />
                        })}
                    </div>
                }
            </main>
        )
    }
}


export default PageImage;
