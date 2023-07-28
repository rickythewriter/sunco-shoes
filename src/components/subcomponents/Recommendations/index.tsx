import { useState, useEffect } from "react"
import RecCard from "../RecCard"
import './Recommendations.css'

/* Mock Server on Port 4200 */
const PRODUCTS_API_BASE_URL = 'http://localhost:4200/shoes';

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

    /* Fetch Recommended Products */
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
        <section id="recs">
            <h2>Explore our latest drops</h2>
            <div id="rec-reel">
                {
                    recommendations.map(recommendation => {
                        return (
                            <RecCard product={recommendation} />
                        )
                    })
                }
            </div>
        </section>
    )
}