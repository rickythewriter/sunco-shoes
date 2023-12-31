import { useEffect, useState } from "react"
import './ProductDesc.css'

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
            shoeFeatures.forEach((element: IShoeFeature["shoeFeature"]) => {
                const featureId = element.feature_id.toString();
                urlFeatures.searchParams.append('id', featureId);
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
        <div id="description-container" className="product-row">
            <div id="description-column-left">
                <h2 id="description-heading">Description</h2>
                <div className="horizontal-rule"></div>
                <p className="product-description">{product.description}</p>
                <ul className="product-description">
                    {productFeatures.map((feature: IFeature["feature"]) => {
                        return (
                            <li>{feature.feature}</li>
                        )
                    })}
                </ul>
            </div>
            <div id="description-column-right">
                <img alt="description image" id="description-image" src={imageUrl} />
            </div>
        </div>
    )
}

export default ProductDesc;