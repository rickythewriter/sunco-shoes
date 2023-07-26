import "./Header.css";
import Logo from '../subcomponents/Logo';
import cart from '../../assets/icons/cart.svg'

export default function Header() {
    return (
        <header id="header">
            <Logo />
            <div id="view-cart">
                <img id="cart-icon" src={cart} />
                View Cart
            </div>
        </header>   
    )
}