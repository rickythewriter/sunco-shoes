import { useState, useContext, useEffect } from "react"
import minus from '../../../assets/icons/minus.svg'
import plus from '../../../assets/icons/plus.svg'
import { ShoppingCartContextType, ShoppingCartContext } from "../../../contexts/ShoppingCartContext"
import './ProductQuantitySelector.css'

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
        <div id="product-quantity-selector">
            <h3 id="product-brand">{product.brand}</h3>
            <p id="product-model">{product.model}</p>
            <h3 id="product-price">${product.price}</h3>
            <div id="quantity-selector-border"></div>
            <h4 id="product-quantity-heading">Quantity</h4>
            <div id="quantity-selector">
                <div
                    className="quantity-selector-control"
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}
                >
                    <img src={minus} />
                </div>
                <p 
                    id="product-quantity" 
                    className="quantity-selector-control"
                >
                    {quantity}
                </p>
                <div
                    className="quantity-selector-control"
                    onClick={() => setQuantity(quantity + 1)}
                >
                    <img src={plus} />
                </div>
            </div>
            <div
                id="add-to-cart-button"
                onClick={() => {
                    addToCart(product.id, quantity);
                }}
            >
                Add to Cart
            </div>
        </div>
    )
}

export default ProductQuantitySelector;