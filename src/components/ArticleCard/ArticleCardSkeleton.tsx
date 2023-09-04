import React, { FC } from 'react';
import { clsx } from 'clsx';
import './ArticleCard.css';
import { Image } from '@components/Image/Image';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';

interface Props {
  hasImage?: boolean;
  hasDescription?: boolean;
  className?: string;
}

export const ArticleCardSkeleton: FC<Props> = ({
  hasImage = true,
  hasDescription = true,
  className,
}) => {
  return (
    <div
      className={clsx(
        'article-card',
        'article-card--skeleton',
        {
          'article-card--has-description': hasDescription,
        },
        className
      )}
    >
      {hasImage && <Image className="article-card__image" skeleton />}
      <div className="article-card__content">
        <h2 className="article-card__title">
          <SkeletonText rowsCount={2} />
        </h2>
        {hasDescription && (
          <div className="article-card__description">
            <SkeletonText rowsCount={2} />
          </div>
        )}
        <div className="article-card__info">
          <SkeletonText />
        </div>
      </div>
    </div>
  );
};
