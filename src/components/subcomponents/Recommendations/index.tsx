import { useState, useEffect } from "react"

/* Mock Server on Port 4200 */
const PRODUCTS_API_BASE_URL = 'http://localhost:4200/shoes'

interface IProductData {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string
    }[]
}

export default function Recommendations() {

    const [recommendations, setRecommendations] = useState<IProductData["product"]>([])

    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(PRODUCTS_API_BASE_URL)
            url.searchParams.set('_limit', '4'); // BUSINESS REQUIREMENT: HOME PAGE WITH LIST OF FOUR PRODUCTS
            const response = await fetch(url);
            const recommendations = await response.json();
            setRecommendations(recommendations);
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Explore our latest drops</h2>
            <ul>
            {
                recommendations.map( recommendation => {
                    return (
                        <li key={recommendation.id}>{`${recommendation.brand} ${recommendation.model}`}</li>
                    )
                })
            }
            </ul>
        </>
    )
}