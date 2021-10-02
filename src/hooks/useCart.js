import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = products => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const newCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key)
                if (addedProduct) {
                    addedProduct.quantity = savedCart[key];
                    newCart.push(addedProduct);
                }
            }
            setCart(newCart);
        }
    }, [products])
    return [cart, setCart];
}

export default useCart;