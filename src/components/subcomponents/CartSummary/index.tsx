import { useState, useContext, useEffect } from 'react'
import arrowRight from '../../../assets/icons/arrow-right.svg'
import { ShoppingCartContext, ShoppingCartContextType } from '../../../contexts/ShoppingCartContext'
import './CartSummary.css'

/* Mock Server on Port 4200 */
const PRODUCTS_API_BASE_URL = 'http://localhost:4200/shoes';

interface IProductData {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string,
        quantity?: number
    }[]
}

interface IProductInCart {
    product: {
        id: number,
        price: number,
        quantity: number
    }
}

interface IProduct {
    product: {
        id: number,
        brand: string,
        model: string,
        price: number,
        description: string,
    }
}

export default function CartSummary() {

    function calculateSubTotal() {
        let subTotal = 0;
        productsInCart.forEach((product: IProductInCart["product"]) => {
            subTotal += product.price * product.quantity;
        })
        return subTotal;
    }

    function calculateTax(subTotal: number, taxRate: number = 0.0725) {
        return Number((subTotal * taxRate).toFixed(2))
    }

    const { productsInCart } = useContext(ShoppingCartContext) as ShoppingCartContextType;
    const [subTotal, setSubTotal] = useState(calculateSubTotal());
    const [shippingCost, setShippingCost] = useState(0);
    const [tax, setTax] = useState(calculateTax(subTotal));
    const [discount, setDiscount] = useState(tax);
    const [total, setTotal] = useState(subTotal + shippingCost + tax - discount);

    useEffect(() => {
        const subTotal = calculateSubTotal();
        const tax = calculateTax(subTotal)
        const shipping = productsInCart.length > 0 ? 20 : 0;

        setSubTotal(subTotal);
        setShippingCost(shipping);
        setTax(tax);
        setDiscount(tax);
        setTotal(subTotal + shippingCost + tax - discount)
    }, [productsInCart])

    return (
        <div id="cart-summary" className="white-card cart-body">
            <h2 id="cart-summary-heading">Summary</h2>
            <div className="summary-row">
                <div className="charge-name">
                    <p>Subtotal</p>
                </div>
                <div className="charge-amount">
                    <p>${subTotal.toFixed(2)}</p>
                </div>
            </div>
            <div className="summary-row">
                <div className="charge-name">
                    <p>Shipping and delivery</p>
                </div>
                <div className="charge-amount">
                    <p>${shippingCost.toFixed(2)}</p>
                </div>
            </div>
            <div className="summary-row">
                <div className="charge-name">
                    <p>Tax</p>
                </div>
                <div className="charge-amount">
                    <p>${tax.toFixed(2)}</p>
                </div>
            </div>
            <div className="summary-row">
                <div className="charge-name">
                    <p>Discount</p>
                </div>
                <div className="charge-amount orange">
                    <p>-${discount.toFixed(2)}</p>
                </div>
            </div>
            <div className="horizontal-rule"/>
            <div className="summary-row total-row">
                <div id="total-cost-heading" className="charge-name">
                    <p>Total</p>
                </div>
                <div id="total-cost-amount"className="charge-amount">
                    <p>{total.toFixed(2)}</p>
                </div>
            </div>
            <div id="checkout-button">
                Checkout
                <img className="arrow-right" src={arrowRight} />
            </div>
        </div>
        
    )
}