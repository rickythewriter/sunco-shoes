import { createContext, useEffect, useState } from "react";

interface IItems {
    item: {
        id: number,
        price: number,
        quantity: number
    }[];
}

interface IProps {
    children?: React.ReactNode
}

export type ShoppingCartContextType = {
    productsInCart: IItems["item"],
    cartHasUpdated: boolean,
    setCartHasUpdated: React.Dispatch<React.SetStateAction<boolean>>,
    addToCart: (productId: number, price: number, quantity: number) => void,
    updateQuantityInCart: (productId: number, quantity: number) => void,
    removeItemFromCart: (productId: number) => void
};

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

const ShoppingCartContextProvider: React.FC<IProps> = ({ children }) => {

    /* Persistence - Use Cart Items from Local Storage as Default Value */
    let storedProducts;
    const savedProducts = localStorage.getItem("productsInCart");
    if (savedProducts) {
        storedProducts = JSON.parse(savedProducts)
    } else {
        storedProducts = [];
    }

    const [productsInCart, setProductsInCart] = useState<IItems["item"]>(storedProducts);
    const [cartHasUpdated, setCartHasUpdated] = useState(false);

    /* Persistence - Save Cart Items to Local Storage for Persistence on Page Reloads */
    useEffect(() => {
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
    }, [productsInCart])

    const addToCart = (productId: number, price: number, quantity: number = 1) => {
        const item = {
            id: productId,
            price,
            quantity
        }

        /* Check if Cart Already Contains Item */
        let itemIsInCart = false;
        let idxToDelete;
        for (const idx in productsInCart) {
            const product = productsInCart[idx];
            if (product.id === productId) {
                itemIsInCart = true;
                idxToDelete = parseInt(idx);
                item.quantity += product.quantity;
                productsInCart.splice(idxToDelete, 1);
                setProductsInCart([...productsInCart, item]);
            }
        }

        if (!itemIsInCart) setProductsInCart([...productsInCart, item]);

        if (productsInCart.length === 0) setProductsInCart([item]);

        setCartHasUpdated(true);
    }

    const updateQuantityInCart = (productId: number, quantity: number) => {
        
        let idxToDelete;
        for (const idx in productsInCart) {
            const product = productsInCart[idx];
            if (product.id === productId) {
                const item = {
                    id: productId,
                    price: product.price,
                    quantity
                }
                idxToDelete = parseInt(idx);
                productsInCart.splice(idxToDelete, 1);
                setProductsInCart([...productsInCart, item]);
                setCartHasUpdated(true);
            }
        }
    }

    const removeItemFromCart = (productId: number) => {
        let idxToDelete;
        for (const idx in productsInCart) {
            const product = productsInCart[idx];
            if (product.id === productId) {
                idxToDelete = parseInt(idx);
                productsInCart.splice(idxToDelete, 1);
                setProductsInCart([...productsInCart]);
                setCartHasUpdated(true);
            }
        }
    }

    return (
        <ShoppingCartContext.Provider value={{
            productsInCart,
            addToCart,
            updateQuantityInCart,
            removeItemFromCart,
            cartHasUpdated,
            setCartHasUpdated
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartContextProvider;