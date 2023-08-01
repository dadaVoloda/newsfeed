import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';

import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <Navigation />
        </div>
        <div className="footer__bottom">
          Сделано на Frontend курсе в&nbsp;
          <a
            className="footer__link"
            href="https://karpov.courses/frontend"
            target="_blank"
            rel="noreferrer"
          >
            Karpov.Courses
          </a>
        </div>
      </div>
    </footer>
  );
};
