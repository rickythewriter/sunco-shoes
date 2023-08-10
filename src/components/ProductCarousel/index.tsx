import { useState, useEffect } from 'react';
import arrowLeft from '../../assets/icons/chevron-left.svg';
import arrowRight from '../../assets/icons/chevron-right.svg';
import './ProductCarousel.css';

/* Mock Server on Port 4200 */
const PRODUCTS_IMAGES_API_BASE_URL = 'http://localhost:4200/images';

interface IProductImages {
    image: {
        id: number,
        shoe_id: number,
        url: string,
        image_position_id: number
    }[]
};

interface IImage {
    image: {
        id: number,
        shoe_id: number,
        url: string,
        image_position_id: number
    }
}

interface IProps {
    productId: string
};

const ProductCarousel: React.FC<IProps> = ({ productId }) => {

    const [productImages, setProductImages] = useState<IProductImages["image"]>([])
    const [activeIdx, setActiveIdx] = useState(0);

    /* Fetch Product's Carousel Images */
    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(PRODUCTS_IMAGES_API_BASE_URL)
            url.searchParams.set('shoe_id', productId)
            const response = await fetch(url);
            let images = await response.json()
            images = images.filter((image: IImage["image"]) => {
                const positionId = image.image_position_id;
                const isCarouselImage = (
                    positionId === 1 ||
                    positionId === 2 ||
                    positionId === 3
                )
                return isCarouselImage;
            })
            setProductImages(images);
        }

        fetchData();
    }, [])

    function updateIdx(newIdx: number) {

        /* Case: Out-of-Range */
        if (newIdx < 0) {
            newIdx = 0;
        } else if (newIdx >= productImages.length) {
            newIdx = productImages.length - 1;
        }

        setActiveIdx(newIdx);
    }

    return (
        <div id="product-carousel">
            <div
                id="product-carousel-image-container"
                style={{ transform: `translate(-${activeIdx * 100}%)`}}
            >
                {productImages.map((image: IImage["image"]) => {
                    return (
                        <img
                            alt="product angle images" 
                            className="carousel-image"
                            src={image.url} 
                        />
                    )
                })}
            </div>
            <div id="carousel-controller">
                <div 
                    className="carousel-arrow-button"
                    onClick={() => {
                        updateIdx(activeIdx - 1)
                    }}
                >
                    <img alt="carousel controller buttons" className={activeIdx > 0 ? "carousel-chevron-active" : "carousel-chevron-inactive"} src={arrowLeft}/>
                </div>
                <div id="carousel-indicator-container">
                    {productImages.map((image: IImage["image"]) => {
                        let carouselIdx;

                        /* Determine Carousel Idx based on Image Position ID */
                        const isFirstIdx = image.image_position_id === 1
                        const isSecondIdx = image.image_position_id === 2
                        const isThirdIdx = image.image_position_id === 3

                        if (isFirstIdx) carouselIdx = 0;
                        else if (isSecondIdx) carouselIdx = 1;
                        else if (isThirdIdx) carouselIdx = 2;

                        return <div className={carouselIdx === activeIdx ? 'carousel-indicator-active' : 'carousel-indicator-inactive'}></div>
                    })} 
                </div>
                <div
                    className="carousel-arrow-button"
                    onClick={() => {
                        updateIdx(activeIdx + 1)
                    }}
                >
                    <img alt="carousel controller buttons" className={activeIdx < productImages.length - 1 ? "carousel-chevron-active" : "carousel-chevron-inactive"} src={arrowRight} />
                </div>
            </div>

        </div>
    )
}

export default ProductCarousel;