import React from "react";
import "./Footer.css";
import Logo from "../Logo";
import instagram from '../../assets/icons/instagram.svg'
import twitter from '../../assets/icons/twitter.svg'
import youtube from '../../assets/icons/youtube.svg'

export default function Footer() {
    return (
        <footer id="footer">
            <div id="footer-logo">
                <Logo darkBackground={true} />
            </div>
            <p id="footer-text">© 2023 dot.cards text task. All rights reserved</p>
            <div id="footer-social">
                <img alt="social media icon" id="instagram-icon" className="social-icon" src={instagram} />
                <img alt="social media icon" id="twitter-icon" className="social-icon" src={twitter} />
                <img alt="social media icon" id="youtube-icon" className="social-icon" src={youtube} />
            </div>
        </footer>
    )
}