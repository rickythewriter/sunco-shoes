import CartSummary from "../subcomponents/CartSummary";
import CartItem from "../subcomponents/CartItem";
import { useContext } from "react";
import { ShoppingCartContext, ShoppingCartContextType } from "../../contexts/ShoppingCartContext";
import './Cart.css'

interface IProductInCart {
    product: {
        id: number,
        price: number,
        quantity: number
    }
}

export default function Cart() {

    const { productsInCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;

    return (
        <div id="cart-body">
            <CartSummary />
            <div id="cart-item-section" className="cart-body">
                <h2 id="cart-items-heading">Your Bag</h2>
                {productsInCart.map((product: IProductInCart["product"]) => {
                    return <CartItem product={product} />
                })}
            </div>  
        </div>
    )    
}