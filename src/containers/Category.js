import React from 'react';
import "../styles/css/style.css";

const BASE_CATEGORY_IMG_URL = 'http://localhost:8000/images/';

export const Category = props => {
    const category_details = props.category_details

    return (
        <div id='category'>
            <hr />
            <h5 id='sub-title'>We deliver, All over Coimbatore</h5>
            <h5 id='sub-title'>Contact : 9524284655, 9999123456</h5>
            <hr />
            <h3 id='title'>Our Smart Store</h3>
            <div className="cards-list">
                {
                    category_details.map(function (category_detail, index) {
                        return (
                            <a key={index} href={`category/${category_detail.slug}/${category_detail.id}/all-items/`}>
                                <div className="card" key={index}>
                                    <div className="card_image"> <img id='item-img' alt={category_detail.name} src={BASE_CATEGORY_IMG_URL + category_detail.image} /> </div>
                                    <div className="card_title">
                                        <p>{category_detail.name}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
            </div>
            <hr />
        </div>
    );
}


export default Category;