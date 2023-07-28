import "./Logo.css"
import { Link } from "react-router-dom"
import logo from '../../../assets/icons/logo.svg'

interface BrightText {
    darkBackground?: boolean
}

export default function Logo(props: BrightText) {
    return (
        <Link to="/">
            <div id="header-logo">
                <img alt="logo" id="logo-icon" src={logo} />
                <p className={`${props.darkBackground ? "white-text" : ""}`}>SUN CO.</p>
            </div>
        </Link>
    )
}