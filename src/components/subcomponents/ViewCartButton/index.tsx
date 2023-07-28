import "./ViewCartButton.css"
import cart from '../../../assets/icons/cart.svg'
import { useContext } from "react"
import { ShoppingCartContext, ShoppingCartContextType } from "../../../contexts/ShoppingCartContext"

export default function ViewCartButton() {

    const { productsInCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;

    return (
        <div id="view-cart">
            <img id="cart-icon" src={cart} />
            View Cart
            { productsInCart.length > 0 && <div id="cart-item-quantity">{productsInCart.length}</div> }
        </div>
    )
}