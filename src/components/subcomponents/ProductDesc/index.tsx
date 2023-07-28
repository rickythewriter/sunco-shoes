import { useEffect, useState } from "react"

/* Mock Server on Port 4200 */
const SHOE_FEATURES_API_BASE_URL = 'http://localhost:4200/shoe_features';
const FEATURES_API_BASE_URL = 'http://localhost:4200/features';
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

interface IShoeFeature {
    shoeFeature: {
        id: number,
        shoe_id: number,
        feature_id: number
    }
}

interface IFeature {
    feature: {
        id: number,
        feature: string
    }
}

const ProductDesc: React.FC<IProps> = ({ product }) => {

    const [productFeatures, setProductFeatures] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    /* get features and image */
    useEffect(() => {
        const fetchData = async () => {
            /* Query Shoe Features */
            const urlShoeFeatures = new URL(SHOE_FEATURES_API_BASE_URL);
            const productId = product.id.toString();
            urlShoeFeatures.searchParams.set('shoe_id', productId);
            const responseShoeFeatures = await fetch(urlShoeFeatures);
            const shoeFeatures = await responseShoeFeatures.json();

            /* Query Feature Descriptions */
            const urlFeatures = new URL(FEATURES_API_BASE_URL);
            let params = new URLSearchParams(urlFeatures.search);
            shoeFeatures.forEach((element: IShoeFeature["shoeFeature"]) => {
                const featureId = element.feature_id.toString();
                params.append("id", featureId)
            })
            const responseFeatures = await fetch(urlFeatures);
            const features = await responseFeatures.json();

            setProductFeatures(features);

            /* Get Description Image */
            const url = new URL(PRODUCT_IMAGES_API_BASE_URL)
            url.searchParams.set('shoe_id', productId)
            url.searchParams.set('image_position_id', '4');
            const response = await fetch(url);
            const imageData = await response.json()
            const imageUrl = imageData[0].url;
            setImageUrl(imageUrl);
        }

        fetchData();
    }, [])

    return (
        <>
            <h2>Description</h2>
            <p>{product.description}</p>
            <ul>
                {productFeatures.map((feature: IFeature["feature"]) => {
                    return (
                        <li>{feature.feature}</li>
                    )
                })}
            </ul>
            <img className="" src={imageUrl} />
        </>
    )
}

export default ProductDesc;