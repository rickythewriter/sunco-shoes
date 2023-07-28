/* 
    If ID, then get shoe data.
    Use url, because not all products shown in recs
*/
/* If ID non-existent, then show error 
    Uh-oh! We couldn't find the page you're looking for. Continue shopping
*/

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ProductCarousel from "../subcomponents/ProductCarousel/ProductCarousel";
import ProductQuantitySelector from "../subcomponents/ProductQuantitySelector";
import ProductDesc from "../subcomponents/ProductDesc";
import './Product.css'

/* Mock Server on Port 4200 */
const PRODUCTS_API_BASE_URL = 'http://localhost:4200/shoes';

interface IProductData {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string
    }
}

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState<IProductData["product"]>();

    /* Fetch Product By ID*/
    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(PRODUCTS_API_BASE_URL)
            const id = productId ?? 'null'
            url.searchParams.set('id', id);
            const response = await fetch(url);
            const data = await response.json();
            const product = data[0];
            setProduct(product);
        };

        fetchData();
    }, []);

    return (
        <>
            {product && (
                <>
                    <div id="product-row-1">
                        <ProductCarousel productId={product.id.toString()} />
                        <ProductQuantitySelector product={product} />
                    </div>
                    <ProductDesc product={product} />
                </>
            )}
        </>
    )
}