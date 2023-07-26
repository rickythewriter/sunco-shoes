import React from "react";
import "./Header.css";
import logo from '../../assets/icons/logo.svg'
import cart from '../../assets/icons/cart.svg'

export default function Header() {
    return (
        <header id="header">
            <div id="header-logo">
                <img id="logo-icon" src={logo} />
                <p>SUN CO.</p>
            </div>
            <div id="view-cart">
                <img id="cart-icon" src={cart} />
                View Cart
            </div>
        </header>   
    )
}