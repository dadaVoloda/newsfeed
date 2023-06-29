import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

import logo from '../../images/logo.svg';

type LinkName = 'Главная' | 'Мода' | 'Технологии' | 'Политика' | 'Спорт';

interface Link {
  name: LinkName;
  path: string;
}

interface Props {
  placement?: 'header' | 'footer';
}

const links: Link[] = [
  { name: 'Главная', path: '' },
  { name: 'Мода', path: 'fashion' },
  { name: 'Технологии', path: 'tech' },
  { name: 'Политика', path: 'politics' },
  { name: 'Спорт', path: 'sport' },
];

export const Navigation: FC<Props> = ({ placement = 'header' }) => {
  return (
    <nav className={`navigation grid navigation--${placement}`}>
      <Link to="/" className="navigation__logo">
        <img className="navigation__image" src={logo} alt="Логотип" />
      </Link>
      <ul className="navigation__list">
        {links.map((link) => (
          <li className="navigation__item" key={link.name}>
            <NavLink to={link.path} className={`navigation__link`}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
