import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';

import './Header.css';

// interface Props {
//   category: string;
// }

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <Navigation />
      </div>
    </header>
  );
};
