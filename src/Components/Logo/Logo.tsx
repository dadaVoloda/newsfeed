import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.css';

import logo from '../../images/logo.svg';
export const Logo = () => {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={logo} alt="Логотип" />
    </NavLink>
  );
};
