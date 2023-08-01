import React, { ElementType, FC } from 'react';
import { clsx } from 'clsx';
import './Title.css';

interface Props {
  Component?: ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Title: FC<Props> = ({ Component = 'h1', children, className }) => {
  return <Component className={clsx('title', className)}>{children}</Component>;
};
