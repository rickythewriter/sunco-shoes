import "./Logo.css"
import logo from '../../../assets/icons/logo.svg'

interface BrightText {
    darkBackground?: boolean
}

export default function Logo(props: BrightText) {
    return (
        <div id="header-logo">
            <img id="logo-icon" src={logo} />
            <p className={`${props.darkBackground ? "white-text" : ""}`}>SUN CO.</p>
        </div>
    )
}