import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from 'axios';

export default function Checkout({ products, basket, setBasket }) {
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    setProductQuantities(basket.reduce((acc, item) => {
      acc[item.product_id] = item.quantity;
      return acc;
    }, {}));
  }, [basket]);

  const handleQuantityChange = async (productId, delta) => {
    const newQuantities = { ...productQuantities };
    newQuantities[productId] = Math.max(0, (newQuantities[productId] || 0) + delta);

    if (newQuantities[productId] === 0) {
      handleRemoveFromCart(productId);
    } else {
      setProductQuantities(newQuantities);

      const updatedProductIndex = basket.findIndex(item => item.product_id === productId);
      if (updatedProductIndex === -1) return;

      const updatedProduct = { ...basket[updatedProductIndex] };
      updatedProduct.quantity = newQuantities[productId];

      const newBasket = [...basket];
      newBasket[updatedProductIndex] = updatedProduct;

      setBasket(newBasket);

      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/me/basket`,
          newBasket,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error('Failed to update basket:', error);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const newBasket = basket.filter(item => item.product_id !== productId);
    setBasket(newBasket);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/me/basket`,
        newBasket,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Failed to remove from basket:', error);
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product._id === productId) || {};
  };

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="checkout-card-body">
            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
              Your products
            </h3>

            {basket.map((item) => {
              const product = getProductDetails(item.product_id);
              return (
                <div key={item.product_id} className="d-flex align-items-center mb-5">
                  <div className="checkout-card-image-container">
                    <img
                      src={product.imageUrl}
                      className="checkout-card-image"
                      alt="Product"
                    />
                    <a href="#!" className="remove-icon" onClick={() => handleRemoveFromCart(item.product_id)}>
                      &times;
                    </a>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="checkout-product-title">{product.name}</h5>
                    <div className="d-flex align-items-center">
                      <p className="checkout-price">{product.price}€</p>
                      <div className="checkout-quantity">
                        <button
                          className="minus"
                          onClick={() => handleQuantityChange(item.product_id, -1)}
                        >
                          -
                        </button>
                        <input
                          className="quantity-input"
                          min={0}
                          value={productQuantities[item.product_id] || 0}
                          readOnly
                          type="number"
                        />
                        <button
                          className="plus"
                          onClick={() => handleQuantityChange(item.product_id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <hr
              className="mb-4"
              style={{
                height: "2px",
                backgroundColor: "#1266f1",
                opacity: 1,
              }}
            />

            <div className="shipment-container">
              <h5 className="fw-bold mb-0">Shipment:</h5>
              <h5 className="fw-bold mb-0">10€</h5>
            </div>
            <div className="total-container">
              <h5 className="fw-bold mb-0">Total:</h5>
              <h5 className="fw-bold mb-0">
                {basket.reduce((acc, item) => {
                  const product = getProductDetails(item.product_id);
                  return acc + product.price * (productQuantities[item.product_id] || 0);
                }, 0) + 10}€
              </h5>
            </div>
          </div>
        </div>
        <div className="checkout-card payment-section">
          <div className="checkout-card-body">
            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
              Payment
            </h3>
            <form className="payment-form">
              <input
                className="payment-input"
                placeholder="Card number"
                type="text"
              />
              <input
                className="payment-input"
                placeholder="Name on card"
                type="text"
              />
              <div className="checkout-row">
                <div className="checkout-col-md-6">
                  <input
                    className="payment-input"
                    placeholder="Expiration"
                    type="text"
                    minLength="7"
                    maxLength="7"
                  />
                </div>
                <div className="checkout-col-md-6">
                  <input
                    className="payment-input"
                    placeholder="Cvv"
                    type="text"
                    minLength="3"
                    maxLength="3"
                  />
                </div>
              </div>
              <button className="btn-buy-now" type="submit">Buy now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
