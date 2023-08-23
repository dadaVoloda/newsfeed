import React, { FC } from 'react';

import './Footer.css';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';

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
