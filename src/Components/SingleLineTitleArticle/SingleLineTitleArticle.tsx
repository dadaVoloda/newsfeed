import React, { FC } from 'react';

import './SingleLineTitleArticle.css';

interface Props {
  image: string;
  title: string;
  category: string;
  source: string;
  text: string;
  onClick: () => void;
}

export const SingleLineTitleArticle: FC<Props> = ({
  image,
  title,
  category,
  source,
  text,
  onClick,
}) => {
  return (
    <article className="single-line-title-article" onClick={onClick}>
      <img className="single-line-title-article__image" src={image} alt="" />
      <span className="article-category single-line-title-article__category">{category}</span>
      <h2 className="single-line-title-article__title">{title}</h2>
      <p className="single-line-title-article__text">{text}</p>
      <span className="article-source single-line-title-article__source">{source}</span>
    </article>
  );
};
