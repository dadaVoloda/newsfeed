import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.css';
import loader from '../../images/loader.svg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: FC<Props> = ({ children, loading = false, onClick, ...restProps }) => {
  return (
    <button {...restProps} className="button" onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img className="button__spinner" src={loader} alt="Спиннер" />
        </span>
      )}
    </button>
  );
};
