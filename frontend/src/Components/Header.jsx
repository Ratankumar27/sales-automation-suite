import React from 'react';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
import '../assets/styles.css';
import logo from "../assets/logo.png"

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="logo" className="logo" />

        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}