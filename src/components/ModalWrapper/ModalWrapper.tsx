import React, { FC, HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

import './ModalWrapper.css';

interface Props extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export const ModalWrapper: FC<Props> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  ...restProps
}) => {
  useEffect(() => {
    document.documentElement.classList.add('--prevent-scroll');

    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, []);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.documentElement.addEventListener('keydown', documentKeydownListener);

    return () => {
      document.documentElement.removeEventListener('keydown', documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={clsx(
        'modal-wrapper',
        `modal-wrapper--alignY-${alignY}`,
        `modal-wrapper--alignX-${alignX}`,
        className
      )}
      {...restProps}
      onClick={onClose}
    >
      <div
        className="modal-wrapper__children"
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('overlay') as HTMLElement
  );
};
