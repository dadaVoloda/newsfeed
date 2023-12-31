import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { beautifyDate } from '@app/utils';
import { clsx } from 'clsx';

import './SidebarArticleCard.css';
import { Image } from '@components/Image/Image';

interface Props {
  id: number;
  title: string;
  source: string;
  date: string;
  image: string;
  className?: string;
}

export const SidebarArticleCard: FC<Props> = ({ id, title, source, date, image, className }) => {
  return (
    <Link to={`/article/${id}`} className={clsx('sidebar-article-card', className)}>
      <div className="sidebar-article-card__media">
        <Image className="sidebar-article-card__image" src={image} alt="" />
        <div className="sidebar-article-card__date">{beautifyDate(date)}</div>
      </div>
      <h3 className="sidebar-article-card__title">{title}</h3>
      <div className="sidebar-article-card__source">{source}</div>
    </Link>
  );
};
