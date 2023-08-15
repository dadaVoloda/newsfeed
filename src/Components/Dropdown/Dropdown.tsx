import React, { createElement, FC, HTMLAttributes, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import throttle from 'lodash.throttle';

import './Dropdown.css';
import { clsx } from 'clsx';

interface Props extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const getScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();
  const scrollWidth = getScrollWidth();
  const MARGIN_TOP = 12;

  return {
    top: window.scrollY + rect.bottom + MARGIN_TOP,
    right: window.innerWidth - rect.right - window.scrollX - scrollWidth / 2,
  };
};

export const Dropdown: FC<Props> = ({
  targetRef,
  shown,
  onShownChange,
  children,
  style,
  className,
  ...restProps
}) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useEffect(() => {
    setCoords(calcCoords(targetRef.current as HTMLElement));
  }, []);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  useEffect(() => {
    const documentClickListener = () => {
      onShownChange(false);
    };
    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 100);

    if (shown) {
      document.addEventListener('click', documentClickListener);
      window.addEventListener('resize', windowResizeListener);
    }

    return () => {
      document.removeEventListener('click', documentClickListener);
      window.removeEventListener('resize', windowResizeListener);
    };
  }, [onShownChange, shown]);

  return shown
    ? createPortal(
        <div className={clsx('dropdown', className)} style={{ ...style, ...coords }}>
          {children}
        </div>,
        document.getElementById('overlay') as HTMLElement
      )
    : null;
};
