import React from "react";
import "../assets/cart.css";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = ({ cartItems, subtotal, username }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      // Create Razorpay order via backend
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8181/api/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) throw new Error(await response.text());

      const razorpayOrderId = await response.text();

      // Razorpay options
      const options = {
        key: "rzp_test_LqWBBDbgwot5lh", // Replace with your Razorpay Key
        amount: subtotal * 100,
        currency: "INR",
        name: "SalesSavvy",
        description: "Test Transaction",
        order_id: razorpayOrderId,

        handler: async function (response) {
          try {
            const verifyResponse = await fetch(
              "http://localhost:8181/api/payment/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}`},
                credentials: "include",
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            const result = await verifyResponse.text();

            if (verifyResponse.ok) {
              alert("Payment verified successfully!");
              navigate("/dashboard");
            } else {
              alert("Payment verification failed: " + result);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },

        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Pay ₹{subtotal}
      </button>
    </div>
  );
};

export default CheckoutComponent;