import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProduct';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const handleRemove = (key) => {
        const filteredCart = cart.filter(product => product.key != key);
        setCart(filteredCart);
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
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;