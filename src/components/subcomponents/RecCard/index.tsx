import { useState, useEffect } from "react";
import './RecCard.css'

const PRODUCT_IMAGES_API_BASE_URL = 'http://localhost:4200/images';

interface IProps {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string
    }
}
 
const RecCard: React.FC<IProps> = ({product}) => {

    const [imageUrl, setImageUrl] = useState('');

    /* Fetch Product Image URL */
    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(PRODUCT_IMAGES_API_BASE_URL)
            const productId = product.id.toString();
            url.searchParams.set('shoe_id', productId)
            url.searchParams.set('image_position_id', '1');
            const response = await fetch(url);
            const imageData = await response.json()
            const imageUrl = imageData[0].url;
            setImageUrl(imageUrl);
        }

        fetchData();
    }, [])

    return (
        <>
            <img className="reccard reccard-img" src={imageUrl}/>
            <h3 className="reccard reccard-brand">{product.brand}</h3>
            <p className="reccard reccard-model">{product.model}</p>
            <h3 className="reccard reccard-price">{`$${product.price}`}</h3>
        </>
        
    )
}

export default RecCard;