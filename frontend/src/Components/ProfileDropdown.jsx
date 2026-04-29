import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useravatar from "../assets/useravatar.png";
import "../assets/styles.css";

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        "http://localhost:8181/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

    } catch (error) {
      console.error("Logout Error:", error);
    }

    // Always logout on frontend
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  return (
    <div className="profile-dropdown">

      <button
        className="profile-button"
        onClick={toggleDropdown}
      >
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
        />

        <span className="username">
          {username || "Guest"}
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">

          <button
            className="menu-btn"
            onClick={handleProfileClick}
          >
            Profile
          </button>

          <button
            className="menu-btn"
            onClick={handleOrdersClick}
          >
            Orders
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}