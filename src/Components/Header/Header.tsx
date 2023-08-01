import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';

import './Header.css';
import { ColorSchemeSwitcher } from '@components/ColorSchemeSwitcher/ColorSchemeSwitcher';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <Navigation className="header__navigation" />
        <div className="header__controls">
          <ColorSchemeSwitcher />
        </div>
      </div>
    </header>
  );
};
