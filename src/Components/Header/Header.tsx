import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';

import './Header.css';

// interface Props {
//   category: string;
// }

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <Navigation className="header__navigation" />
      </div>
    </header>
  );
};
