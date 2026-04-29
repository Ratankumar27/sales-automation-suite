import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation.jsx';
import { ProductList } from './ProductList.jsx';   
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import '../assets/styles.css';

export default function CustomerHomepage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem("username") || '');
  const [cartError, setCartError] = useState(false); // State for cart fetch error
  const [isCartLoading, setIsCartLoading] = useState(true); // State for cart loading

  useEffect(() => {
    fetchProducts();

    if (username) {
      fetchCartCount(); // Fetch cart count only if username is available
    }
  }, [username]); // Re-run cart count fetch if username changes

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
      `http://localhost:8181/api/products${
        category ? `?category=${category}` : '?category=Shirts'
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
    );

      if (!response.ok) {
      console.error("Error:", response.status);
      setProducts([]);
      return;
    }

      const data = await response.json();

      if (data) {
        setProducts(Array.isArray(data) ? data : data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true); // Set loading state

    try {
      const response = await fetch(
        `http://localhost:8181/api/cart/items/count?username=${username}`,
        {
          // credentials: 'include', // Include authToken as a cookie
          headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

     if (!response.ok) {
  throw new Error("Failed to fetch cart count");
}

const data = await response.json();

// 👇 handle both cases safely
if (typeof data === "number") {
  setCartCount(data);
} else if (data.count !== undefined) {
  setCartCount(data.count);
} else {
  console.error("Unexpected response:", data);
  setCartCount(0);
}

setCartError(false); // Reset error state if successful
} catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true); // Set error state
    } finally {
      setIsCartLoading(false); // Remove loading state
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
  try {
    const response = await fetch("http://localhost:8181/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        username: username,
        productId: Number(productId),
        quantity: 1
      })
    });

    if (response.ok) {
      alert("Added to Cart");
      fetchCartCount();
    } else {
      const text = await response.text();
      console.log(text);
      alert("Failed to add");
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="customer-homepage">
      <Header
        cartCount={
        isCartLoading
        ? '...'
        : typeof cartCount === 'number'
        ? cartCount
        : 0
      }
        username={username}
      />

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>

      <main className="main-content">
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>

      <Footer />
    </div>
  );
}