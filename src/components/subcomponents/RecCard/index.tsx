import { useState, useEffect } from "react";

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
        <li key={product.id}>{`${product.brand} ${product.model} - ${imageUrl}`}</li>
    )
}

export default RecCard;