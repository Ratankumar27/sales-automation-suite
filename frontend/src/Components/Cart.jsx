import React, { useEffect, useState } from "react";
import "../assets/cart.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import CheckoutComponent from "./CheckoutComponent";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  // Fetch Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:8181/api/cart/items?username=${localStorage.getItem(
            "username"
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();

        setCartItems(
          data?.cart?.products?.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price).toFixed(2),
            price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
          })) || []
        );

        setOverallPrice(
          parseFloat(data?.cart?.overall_total_price || 0).toFixed(2)
        );

        setUsername(data?.username || "");
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate Subtotal
  useEffect(() => {
    const total = cartItems
      .reduce((sum, item) => sum + parseFloat(item.total_price), 0)
      .toFixed(2);

    setSubtotal(total);
  }, [cartItems]);

  // Remove Item
  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:8181/api/cart/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            username,
            productId,
          }),
        }
      );

      if (response.status === 204) {
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== productId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Quantity
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8181/api/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            username,
            productId,
            quantity: newQuantity,
          }),
        }
      );

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: (
                    parseFloat(item.price_per_unit) * newQuantity
                  ).toFixed(2),
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <Header username={username} cartCount={cartItems.length} />

      <div className={`cart-container ${cartItems.length === 0 ? "empty" : ""}`}>
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product_id} className="cart-item">
                  <img src={item.image_url} alt={item.name} />

                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>₹{item.price_per_unit}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>Total: ₹{item.total_price}</p>

                    <button
                    className="btn btn-danger px-4 py-2 rounded-pill shadow-sm fw-semibold"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    Remove
                  </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h3>Summary</h3>

              <p>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </p>

              <p>
                <span>Shipping</span>
                <span>₹50</span>
              </p>

              <h4>
                <span>Total</span>
                <span>₹{(parseFloat(subtotal) + 50).toFixed(2)}</span>
              </h4>

              <CheckoutComponent
                cartItems={cartItems}
                subtotal={(parseFloat(subtotal) + 50).toFixed(2)}
                username={username}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;