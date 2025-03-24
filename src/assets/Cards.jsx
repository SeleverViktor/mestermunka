import React from 'react'
import CardItem from './Carditem';
import './Cards.css';

function Cards(){
    return(
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src="images/img-9.jpg"
                        text="megolom magam, ha igy haladok"
                        label='Adventure'
                        path='/services'
                        />
                           <CardItem
                        src="images/img-2.jpg"
                        text="nem viccelek"
                        label='luxury'
                        path='/services'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src="images/img-3.jpg"
                        text="már készülök ugrani"
                        label='sigmamood'
                        path='/services'
                        />
                           <CardItem
                        src="images/img-4.jpg"
                        text="három-kettő-e.."
                        label='adrenaline'
                        path='/services'
                        />
                            <CardItem
                        src="images/img-8.jpg"
                        text="vége"
                        label='relax'
                        path='/services'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Cards;