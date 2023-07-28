import { useState, useEffect, useContext } from "react"
import minus from '../../../assets/icons/minus.svg'
import plus from '../../../assets/icons/plus.svg'
import { ShoppingCartContext, ShoppingCartContextType } from "../../../contexts/ShoppingCartContext";

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

    const { updateQuantityInCart, removeItemFromCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;
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
            urlImage.searchParams.set('image_position_id', '1');
            const response = await fetch(urlImage);
            const imageData = await response.json()
            const imageUrl = imageData[0].url;
            setImageUrl(imageUrl);
        };

        fetchData();
    }, []);

    function updateQuantity(newQuantity: number) {
        if (newQuantity < 1) newQuantity = 1;
        setQuantity(newQuantity);
        updateQuantityInCart(product.id, newQuantity);
    }

    return (
        <>
            <img className="" src={imageUrl} />
            {productData &&
                <>
                    <p>{productData.brand}</p>
                    <p>{productData.price}</p>
                    <p>{productData.model}</p>
                </>
            }
            <div id="quantity-selector">
                <div
                    className="quantity-selector-control chevron"
                    onClick={() => { updateQuantity(quantity - 1) }}
                >
                    <img className={quantity === 1 ? "minus-inactive" : ""} src={minus} />
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
                    <img src={plus} />
                </div>
            </div>
            <div
                onClick={() => removeItemFromCart(product.id)}
            >
                Remove
            </div>
        </>
    )
}

export default CartItem;