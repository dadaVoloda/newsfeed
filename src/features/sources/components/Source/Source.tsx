import React, { FC } from 'react';
import { clsx } from 'clsx';
import './Source.css';

interface SourceProps {
  className?: string;
  href?: string;
  children?: string;
}

export const Source: FC<SourceProps> = ({ children = 'Источник', className, href }) => {
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={clsx('source', 'source--link', className)}
    >
      {children}
    </a>
  ) : (
    <span className={clsx('source', className)}>{children}</span>
  );
};
