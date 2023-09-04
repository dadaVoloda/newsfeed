import React, { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import './SkeletonText.css';
import { repeat } from '@app/utils';

interface Props {
  rowsCount?: number;
  dark?: boolean;
}

export const SkeletonText: FC<Props> = ({ dark = false, rowsCount = 1 }) => {
  return (
    <div className={clsx('skeleton-text', { 'skeleton-text--dark': dark })}>
      {repeat((i) => {
        return <span key={i} className="skeleton-text__row skeleton-gradient"></span>;
      }, rowsCount)}
    </div>
  );
};
