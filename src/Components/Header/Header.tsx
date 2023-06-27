import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';

import './Header.css';

interface Props {
  category: string;
  onNavClick: (e: React.MouseEvent<HTMLElement>, category: string) => void;
}

export const Header: FC<Props> = (props) => {
  return (
    <header className="header">
      <div className="container">
        <Navigation {...props} />
      </div>
    </header>
  );
};
