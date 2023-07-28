import { createContext, useEffect, useState } from "react";

interface IItems {
    item: {
        id: number,
        quantity: number
    }[];
}

interface IProps {
    children?: React.ReactNode
}

export type ShoppingCartContextType = {
    productsInCart: IItems["item"],
    addToCart: (productId: number, quantity: number) => void
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

    /* Persistence - Save Cart Items to Local Storage for Persistence on Page Reloads */
    useEffect(() => {
        console.log('Products in Cart: ', productsInCart);
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
        console.log('local storage: ', localStorage.getItem("productsInCart"))
    }, [productsInCart])

    const addToCart = (productId: number, quantity: number = 1) => {
        const item = {
            id: productId,
            quantity
        }

        /* Check if Cart Already Contains Item */
        let itemIsInCart = false;
        let idxToDelete;
        for (const idx in productsInCart) {
            const product = productsInCart[idx];
            if (product.id == productId) {
                console.log('There is a match at index ', idx, 'where product ID is ', product.id);
                itemIsInCart = true;
                idxToDelete = parseInt(idx);
                item.quantity += product.quantity;
                productsInCart.splice(idxToDelete, 1);
                setProductsInCart([...productsInCart, item]);
            }
        }

        if (!itemIsInCart) setProductsInCart([...productsInCart, item]);

        if (productsInCart.length === 0) setProductsInCart([item]);

        // setProductsInCart([...productsInCart, item]);
    }

    return (
        <ShoppingCartContext.Provider value={{
            productsInCart,
            addToCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartContextProvider;