import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

import './Navigation.css';
import { categoryTitles } from '@features/categories/constants';

interface Props {
  className?: string;
}

interface ItemProps {
  name: string;
  title: string;
}

const NavigationItem: FC<ItemProps> = ({ name, title }) => {
  return (
    <li className="navigation__item">
      <NavLink to={`/${name}`} className={`navigation__link`}>
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className }) => {
  return (
    <nav className={clsx('navigation', className)}>
      <ul className="navigation__list">
        <NavigationItem name="" title="Новости" />
        {Object.entries(categoryTitles).map(([name, title]) => (
          <NavigationItem key={name} name={name} title={title} />
        ))}
      </ul>
    </nav>
  );
};
