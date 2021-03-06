import React from 'react';


const Card = ({property}) => {
    const {index, picture, city, address, bedrooms, bathrooms, carSpaces} = property
    return (
        <div id={`card-${index}`} className='card'>
            <img src={picture} alt={city} width='100%' />
            <div className='details'>
                <span className='index'>{index+1}</span>
                <p className='location'>
                    {city} <br />
                    {address}
                </p>
                <ul className='features'>
                    <li className='icon-bed'>{bedrooms}
                    <span>bedrooms</span></li>
                    <li className='icon-bed'>{bathrooms}
                    <span>bathrooms</span></li>
                    <li className='icon-car'>{carSpaces}
                    <span>Parking spots</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Card;