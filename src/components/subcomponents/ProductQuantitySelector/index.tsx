import { useState, useContext, useEffect } from "react"
import minus from '../../../assets/icons/minus.svg'
import plus from '../../../assets/icons/plus.svg'
import { ShoppingCartContextType, ShoppingCartContext } from "../../../contexts/ShoppingCartContext"

interface IProps {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string
    }
}

const ProductQuantitySelector: React.FC<IProps> = ({product}) => {

    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;

    return (
        <>
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Price: ${product.price}</p>
            <h4>Quantity</h4>
            <div
                onClick={() => {
                    if (quantity > 1) {
                        setQuantity(quantity - 1)
                    }
                }}
            >
                <img src={minus} />
            </div>
            <p>{quantity}</p>
            <div
                onClick={() => setQuantity(quantity + 1)}
            >
                <img src={plus} />
            </div>
            <div
                onClick={() => {
                    addToCart(product.id, quantity);
                }}
            >
                Add to Cart
            </div>
        </>
    )
}

export default ProductQuantitySelector;