import React, { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';

import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Navigation placement={'footer'} />
        <div className="footer__bottom">
          <p className="footer__text">
            Сделано на Frontend курсе в&nbsp;
            <a
              className="footer__link"
              href="https://karpov.courses/frontend"
              target="_blank"
              rel="noreferrer"
            >
              Karpov.Courses
            </a>
          </p>
          <p className="footer__text footer__text--gray">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
