import CartSummary from "../subcomponents/CartSummary";
import CartItem from "../subcomponents/CartItem";
import { useContext } from "react";
import { ShoppingCartContext, ShoppingCartContextType } from "../../contexts/ShoppingCartContext";

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
        <>
            <CartSummary />
            <h2>Your Bag</h2>
            {productsInCart.map((product: IProductInCart["product"]) => {
                return <CartItem product={product}/>
            })}
        </>
    )    
}