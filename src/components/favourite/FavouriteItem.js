import React from 'react';

import BASE_URL from './FavouriteList';

const IMG_BASE_URL = BASE_URL + '/images/';


const FavouriteItem = ({id, name, image, removeFunc }) => (
    <main>
        <tr key={id}>
            <a href='/'>
            <td><img src={IMG_BASE_URL + image} alt={IMG_BASE_URL + name} /></td>
            <td style={{width:'200px',}}><h5>{name}</h5></td>
            </a>
            <td><button id='remove' onClick={() => removeFunc({ id })}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button></td>
        </tr>
        <hr />
    </main>
)

export default FavouriteItem;