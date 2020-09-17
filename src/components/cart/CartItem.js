import React from 'react';

import {BASE_URL} from '../../store/actions/ActionTypes';

const IMG_BASE_URL = BASE_URL + '/images/'


const CartItem = ({ id, name, image, count, rate, discount, discount_type, weight, changeFunc, removeFunc }) => (
    <main id='cart-container'>
        <div className='card'>
            <div style={{ justifyContent: 'flex-end', display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <img src={IMG_BASE_URL + image} alt={IMG_BASE_URL + image} />
                </div>
                <div className='card' style={{ maxWidth: '170px' }}>
                    <h4>{name} - {weight} Kg</h4>
                    <h6>Qty : {count} Nos</h6>
                    <h6>Rate : ₹ {rate}</h6>
                    {discount_type !== 0 && discount > 0 ?
                    <h6>Total : ₹ <strike>{count * rate}</strike> {count*rate - count*discount}</h6>
                    :
                    <h6>Total : ₹ {count * rate}</h6>
                    }
                    <div id='cart-count-box'>
                        <button onClick={() => changeFunc({ id, rate, add: false })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#20B2AA" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" /></svg>
                        </button>
                        <span id='cart-count'>{count}</span>
                        <button onClick={() => changeFunc({ id, rate, add: true })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#20B2AA" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>
                        </button>
                        <button id='remove' onClick={() => removeFunc({ id, count, rate })}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
)

export default CartItem;