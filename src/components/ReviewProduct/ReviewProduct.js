import React from 'react';

const ReviewProduct = (props) => {
    const { name, key, quantity, price } = props.product;
    return (
        <div className="product">
            <div>
                <h4 className="product-name">{name}</h4>
                <p>Price: {price}</p>
                <p>Quantity: {quantity}</p>
                <br />
                <button onClick={() => props.handleRemove(key)} className="btn-regular">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewProduct;