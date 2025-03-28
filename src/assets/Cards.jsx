import React from 'react'
import CardItem from './Carditem';
import './Cards.css';

function Cards(){
    return(
        <div className='cards'>
            <h1>Check out these EPIC Parties!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src="images/little.jpg"
                        text="LittleBig Concert"
                        label='Adventure'
                        path='/services'
                        />
                           <CardItem
                        src="images/rave.jpeg"
                        text="Pink Core Rave"
                        label='Adrenaline'
                        path='/services'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src="images/tanchaz.jpg"
                        text="Tradicional Dancehause Night"
                        label='Luxury'
                        path='/services'
                        />
                           <CardItem
                        src="images/hippik.jpg"
                        text="Budapest Hippies"
                        label='Freedom'
                        path='/services'
                        />
                            <CardItem
                        src="images/sisi.jpg"
                        text="Sisi Concert"
                        label='Relax'
                        path='/services'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Cards;