import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './RelatedSmallArticle.css';

interface Props {
  id: number;
  image: string;
  title: string;
  category: string;
  source: string;
}

export const RelatedSmallArticle: FC<Props> = ({ id, image, title, category, source }) => {
  return (
    <Link to={`/article/${id}`} className="related-small-article">
      <img className="related-small-article__image" src={image} alt="" />
      <div className="related-small-article__content">
        <span className="article-category related-small-article__category">{category}</span>
        <h2 className="related-small-article__title">{title}</h2>
        <span className="article-source related-small-article__source">{source}</span>
      </div>
    </Link>
  );
};
