import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProduct';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import { useHistory } from 'react-router';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();
    const handleRemove = (key) => {
        const filteredCart = cart.filter(product => product.key != key);
        setCart(filteredCart);
        deleteFromDb(key);
    }
    const handleOrder = () => {
        history.push("/inventory");
        setCart([]);
        clearTheCart();
    }
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        cart.map(product => <ReviewProduct
                            handleRemove={handleRemove}
                            key={product.key}
                            product={product}
                        >
                        </ReviewProduct>)
                    }
                </div>
                {/* cart container  */}
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleOrder} className="btn-regular">
                            Place Order
                        </button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;