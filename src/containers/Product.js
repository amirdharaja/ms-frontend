import React, { useState } from 'react';

import NumericInput from 'react-numeric-input';
import {BASE_URL} from '../store/actions/ActionTypes';


const Product = ({ id, name, weight, slug, image, rate, divide_by, discount_type, discount, sub_category, addFunc, addFavourite }) => {
    let cart_count = 1
    const onChangeCount = (event) => {
        cart_count = event
        if (cart_count < 0) {
            cart_count = 1
        }
    }
    const [mrp, setMrp] = useState(rate / divide_by);
    const [value, setValue] = useState(divide_by);

    const onChange = (event) => {
        setValue(event.target.value)
        console.log(value)
        if (event.target.value === '4') setMrp(rate / 4)
        else if (event.target.value === '3') setMrp(rate - rate / 4)
        else if (event.target.value === '2') setMrp(rate / 2)
        else if (event.target.value === '1') setMrp(rate)
    }

    return (
        <main className='product'>

            <div className="card" id={id}>
                <h5 id='offer'>
                    {discount_type !== 0 && discount > 0 &&
                        <div>
                            <svg fill="green" width="36px" height="26px"><g>
                                <path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z" />
                            </g></svg>
                            {discount_type === '₹' 
                            ?<span>{discount_type + ' ' + discount} OFF</span>
                        :<span>{discount + ' ' + discount_type} OFF</span>
                        }
                            
                        </div>
                    }
                </h5>
                <a href={`/${sub_category}/${slug}/${id}`}><img src={BASE_URL + image} alt={name} title={name} /></a>
                <h5>{name}</h5>
                {divide_by === '1' &&
                    <div>
                        <select type='select' onChange={onChange}>
                            <option value='1'>MRP ₹ {rate} - {weight} Kg</option>
                        </select>
                        <div>
                            {(discount_type !== 0 && discount > 0) ?
                                <span>
                                    {discount_type === '%'
                                        ? <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                        : <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                    }
                                </span>
                                :
                                <span>MRP ₹ {mrp}</span>
                            }
                        </div>
                    </div>
                }
                {divide_by === '2' &&
                    <div>
                        <select type='select' onChange={onChange}>
                            <option value='2'>MRP ₹ {rate / 2} - {weight / 2} Kg</option>
                            <option value='1'>MRP ₹ {rate} - {weight} Kg</option>
                        </select>
                        <div>
                            {(discount_type !== 0 && discount > 0) ?
                                <span>
                                    {discount_type === '%'
                                        ? <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                        : <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                    }
                                </span>
                                :
                                <span>MRP ₹ {mrp}</span>
                            }
                        </div>
                    </div>
                }
                {divide_by === '4' &&
                    <div>
                        <select type='select' onChange={onChange}>
                            <option value='4'>MRP ₹ {rate / 4} - {weight / 4} Kg</option>
                            <option value='2'>MRP ₹ {rate / 2} - {weight / 2} Kg</option>
                            <option value='3'>MRP ₹ {rate - rate / 4} - {weight - weight / 4} Kg</option>
                            <option value='1'>MRP ₹ {rate} - {weight} Kg</option>
                        </select>
                        <div>
                            {(discount_type !== 0 && discount > 0) ?
                                <span>
                                    {discount_type === '%'
                                        ? <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                        : <span>MRP ₹<strike>{mrp}</strike> {mrp-discount} </span>
                                    }
                                </span>
                                :
                                <span>MRP ₹ {mrp}</span>
                            }
                        </div>
                    </div>
                }
                <div id='card-count'>
                    <NumericInput
                        style={{
                            input: { width: '100px' },
                            arrowUp: { backgroundColor: 'red' },
                            button: { color: 'red' }
                        }}
                        name='cart_input'
                        value={1}
                        min={1}
                        mobile
                        required
                        onChange={onChangeCount}
                        inputMode="numeric"
                    />
                </div>
                <button id='favourite-button' onClick={() => addFavourite({ id })}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></button>
                <button id='cart-button' onClick={() => addFunc({ id, weight, rate, count: cart_count, value, divide_by })}> Add to cart </button>
            </div>
        </main>

    )
}

export default Product;