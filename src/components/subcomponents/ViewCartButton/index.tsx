import "./ViewCartButton.css"
import cart from '../../../assets/icons/cart.svg'

export default function ViewCartButton() {
    return (
        <div id="view-cart">
            <img id="cart-icon" src={cart} />
            View Cart
        </div>
    )
}