import React, { FC } from 'react';

import './Header.css';
import { ColorSchemeSwitcher } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';

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
