import React, { FC } from 'react';

import './MainArticle.css';
import { Article } from '../../types';

interface Props {
  item: Article;
  category: string;
  source: string;
  onClick: () => void;
}

export const MainArticle: FC<Props> = ({ item, category, source, onClick }) => {
  return (
    <article className="main-article" onClick={onClick}>
      <div className="main-article__img-container">
        <img className="main-article__img" src={item.image} alt="Фото новости" />
      </div>
      <div className="main-article__content">
        <span className="article-category main-article__category">{category}</span>
        <h2 className="main-article__title">{item.title}</h2>
        <p className="main-article__text">{item.description}</p>
        <span className="article-source main-article__source">{source}</span>
      </div>
    </article>
  );
};
