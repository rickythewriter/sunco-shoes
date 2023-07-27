import React from "react";
import promoImg from '../../../assets/images/home-promotion.png'
import arrowRight from '../../../assets/icons/arrow-right.svg'
import './Promo.css'

export default function Promo() {
    return (
        <div id="home-promo">
            <img id="promo-img" src={promoImg} />
            <h2 id="discount">25% OFF</h2>
            <h1 id="title">Summer Sale</h1>
            <caption>Discover our summer styles with discount</caption>
            <div id="shop-now-button">
                Shop Now
                <img className="arrow-right" src={arrowRight} />
            </div>
        </div>
    )    
}