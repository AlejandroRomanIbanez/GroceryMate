import React, { useState } from "react";
import "./Checkout.css";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy M11 64GB",
    color: "white",
    price: 799,
    image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp",
    quantity: 1,
  },
  {
    id: 2,
    name: "Headphones Bose 35 II",
    color: "red",
    price: 239,
    image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp",
    quantity: 1,
  },
  {
    id: 3,
    name: "iPad 9.7 6-gen WiFi 32GB",
    color: "rose pink",
    price: 659,
    image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp",
    quantity: 2,
  },
];

export default function Checkout() {
  const [productQuantities, setProductQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, delta) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = Math.max(0, newQuantities[productId] + delta);
      return newQuantities;
    });
  };

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="checkout-card-body">
            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
              Your products
            </h3>

            {products.map((product) => (
              <div key={product.id} className="d-flex align-items-center mb-5">
                <div className="checkout-card-image-container">
                  <img
                    src={product.image}
                    className="checkout-card-image"
                    alt="Product"
                  />
                  <a href="#!" className="remove-icon">
                    &times;
                  </a>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="checkout-product-title">{product.name}</h5>
                  <h6 className="checkout-product-color">Color: {product.color}</h6>
                  <div className="d-flex align-items-center">
                    <p className="checkout-price">{product.price}€</p>
                    <div className="checkout-quantity">
                      <button
                        className="minus"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        -
                      </button>
                      <input
                        className="quantity-input"
                        min={0}
                        value={productQuantities[product.id]}
                        readOnly
                        type="number"
                      />
                      <button
                        className="plus"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
              <h5 className="fw-bold mb-0">2261€</h5>
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
