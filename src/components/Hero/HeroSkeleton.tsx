import React, { FC } from 'react';
import { clsx } from 'clsx';
import './Hero.css';
import { Title } from '@components/Title/Title';
import { Image } from '@components/Image/Image';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';

interface Props {
  hasImage?: boolean;
  title?: string;
  hasText?: boolean;
  className?: string;
}

export const HeroSkeleton: FC<Props> = ({ hasImage = true, title, hasText = false, className }) => {
  return (
    <section className={clsx('hero', { 'hero--no-image': !hasImage }, className)}>
      <div className="hero__in">
        {hasImage && <Image className="hero__image" skeleton />}

        <div className="hero__container container">
          <div className="hero__content" style={{ width: title ? undefined : '100%' }}>
            <Title className="hero__title">{title || <SkeletonText dark />}</Title>
            {hasText && (
              <div className="hero__text">
                <SkeletonText dark rowsCount={2} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
