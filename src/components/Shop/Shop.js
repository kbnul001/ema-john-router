import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import './Shop.css';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart(products);
    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });
    }, []);

    /*  useEffect(() => {
         if (products.length) {
             const savedCart = getStoredCart();
             const storedCart = [];
             for (const key in savedCart) {
                 const addedProduct = products.find(product => product.key === key);
                 if (addedProduct) {
                     const quantity = savedCart[key];
                     addedProduct.quantity = quantity;
                     storedCart.push(addedProduct);
                 }
             }
             setCart(storedCart);
         }
     }, [products]) */

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let tempCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            product.quantity += 1;
            tempCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            tempCart = [...cart, product];
        }
        // const newCart = [...cart, product];
        setCart(tempCart);
        // save to local storage (for now)
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    return (
        <>
            {/* search container  */}
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>
            {/* shop container  */}
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>
                {/* cart container  */}
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="btn-regular" >
                            <Link to="/orders">Review Items</Link>
                        </button>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;