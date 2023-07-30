import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import minus from '../../../assets/icons/minus.svg'
import plus from '../../../assets/icons/plus.svg'
import { ShoppingCartContext, ShoppingCartContextType } from "../../../contexts/ShoppingCartContext";
import './CartItem.css'

/* Mock Server on Port 4200 */
const PRODUCTS_API_BASE_URL = 'http://localhost:4200/shoes';
const PRODUCT_IMAGES_API_BASE_URL = 'http://localhost:4200/images';

interface IProps {
    product: {
        id: number,
        price: number,
        quantity: number
    }
}

interface IProductData {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string
    }
}

const CartItem: React.FC<IProps> = ({ product }) => {

    const { productsInCart, updateQuantityInCart, removeItemFromCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;
    const [productData, setProductData] = useState<IProductData["product"]>();
    const [imageUrl, setImageUrl] = useState('');
    const [quantity, setQuantity] = useState(product.quantity);

    /* Fetch Product By ID. Fetch Preview Image */
    useEffect(() => {
        const fetchData = async () => {
            const urlProduct = new URL(PRODUCTS_API_BASE_URL)
            const productId = product.id.toString();
            urlProduct.searchParams.set('id', productId);
            const responseProduct = await fetch(urlProduct);
            const data = await responseProduct.json();
            const productData = data[0];
            setProductData(productData);

            const urlImage = new URL(PRODUCT_IMAGES_API_BASE_URL)
            urlImage.searchParams.set('shoe_id', productId)
            urlImage.searchParams.set('image_position_id', '5');
            const response = await fetch(urlImage);
            const imageData = await response.json()
            const imageUrl = imageData[0].url;
            setImageUrl(imageUrl);
        };

        fetchData();
    }, [productsInCart]);

    function updateQuantity(newQuantity: number) {
        if (newQuantity < 1) newQuantity = 1;
        setQuantity(newQuantity);
        updateQuantityInCart(product.id, newQuantity);
    }

    return (
        <div 
            className="cart-item"
            onClick={() => { if (productData) console.log("Clicked on ", productData.brand) }}
        >
            <div className="cart-item-column-left">
                <img alt="shoe image" className="cart-item-image" src={imageUrl} />
            </div>
            <div className="cart-item-column-right">
                {productData &&
                    <>
                        <div className="cart-item-brand-row">
                        <p className="cart-item-brand"><Link to={`/products/${product.id}`}>{productData.brand}</Link></p>
                            <p className="cart-item-price">${productData.price}</p>
                        </div>
                        <p className="cart-item-model">{productData.model}</p>
                    </>
                }
                <div className="cart-item-selector-row">
                    <div id="quantity-selector">
                        <div
                            className="quantity-selector-control chevron"
                            onClick={() => { updateQuantity(quantity - 1) }}
                        >
                            <img alt="minus button" className={quantity === 1 ? "minus-inactive" : ""} src={minus} />
                        </div>
                        <p
                            id="product-quantity"
                            className="quantity-selector-control"
                        >
                            {quantity}
                        </p>
                        <div
                            className="quantity-selector-control chevron"
                            onClick={() => updateQuantity(quantity + 1)}
                        >
                            <img alt="plus button" src={plus} />
                        </div>
                    </div>
                    <div
                        className="remove-from-cart"
                        onClick={() => {
                            removeItemFromCart(product.id);
                            // console.log(productsInCart);
                            if (productData) console.log('removed ', productData.brand)
                        }}
                    >
                        Remove
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;