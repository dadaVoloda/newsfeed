import React, { ImgHTMLAttributes, SyntheticEvent, useState } from 'react';
import { clsx } from 'clsx';
import { FC } from 'react';

import './Image.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
}
export const Image: FC<ImageProps> = ({
  className,
  src = '',
  alt,
  onLoad,
  skeleton = false,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad && onLoad(e);
  };

  return (
    <div
      className={clsx(
        'image',
        {
          'image--loaded': loaded,
          'skeleton-gradient': skeleton || (src.length > 0 && !loaded),
        },
        className
      )}
    >
      {src.length > 0 && (
        <img {...restProps} className="image__element" onLoad={handleOnLoad} src={src} alt={alt} />
      )}
    </div>
  );
};
