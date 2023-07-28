import React from "react";
import promoImg from '../../../assets/images/home-promotion.png'
import arrowRight from '../../../assets/icons/arrow-right.svg'
import './Promo.css'

export default function Promo() {
    return (
        <div id="home-promo">
            <img alt="promotional product image" id="promo-img" src={promoImg} />
            <div id="promo-content">
                <h2 id="discount">25% OFF</h2>
                <h1 id="title">Summer Sale</h1>
                <caption id="caption">Discover our summer styles with discount</caption>
                <div id="shop-now-button">
                    Shop Now
                    <img alt="arrow" className="arrow-right" src={arrowRight} />
                </div>
            </div>
        </div>
    )    
}