import React from 'react';
import { clsx } from 'clsx';
import './Hero.css';
import { Title } from '@components/Title/Title';

interface Props {
  image?: string;
  title: string;
  text?: string;
  className?: string;
}

export const Hero: React.FC<Props> = ({ image = '', title, text = '', className }) => {
  const hasImage = image.length > 0;

  return (
    <section className={clsx('hero', { 'hero--no-image': !hasImage }, className)}>
      <div className="hero__in" style={{ backgroundImage: `url(${image})` }}>
        <div className="hero__container container">
          <div className="hero__content">
            <Title className="hero__title">{title}</Title>
            {text.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
