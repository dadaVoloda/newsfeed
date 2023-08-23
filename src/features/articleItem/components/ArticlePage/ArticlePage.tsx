import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import './ArticlePage.css';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { Source } from '../../../sources/components/Source/Source';

import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Title } from '@components/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@app/store';
import { getCachedArticleItem } from '@features/articleItem/selectors';
import { getRelatedArticles } from '@features/relatedNews/selectors';
import { getSources } from '@features/sources/selectors';
import { fetchArticleItem } from '@features/articleItem/actions';
import { fetchRelatedArticles } from '@features/relatedNews/actions';
import { setArticleItem } from '@features/articleItem/slice';
import { categoryTitles } from '@features/categories/constants';
import { beautifyDate } from '@app/utils';

export const ArticlePage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const appDispatch = useDispatch<AppDispatch>();
  const articleItem = useSelector(getCachedArticleItem(Number(id)));
  const relatedArticles = useSelector(getRelatedArticles(Number(id)));
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([
      appDispatch(fetchArticleItem(Number(id))),
      appDispatch(fetchRelatedArticles(Number(id))),
    ]).finally(() => {
      setLoading(false);
    });

    return () => {
      dispatch(setArticleItem(null));
    };
  }, [id]);

  if (articleItem === null) return null;

  return (
    <section className="article-page">
      <Hero className="article-page__hero" title={articleItem.title} image={articleItem.image} />

      <div className="container article-page__main">
        <div className="article-page__info">
          <span className="article-page__category">
            {categoryTitles[articleItem.category.name]}
          </span>
          <span className="article-page__date">{beautifyDate(articleItem.date)}</span>
          {articleItem.link.length > 0 && (
            <Source className="article-page__source" href={articleItem.link}>
              {articleItem.source?.name}
            </Source>
          )}
        </div>
        <div className="grid">
          <div className="article-page__content">
            <p>{articleItem.text}</p>
          </div>

          <div className="article-page__sidebar">
            {relatedArticles?.slice(3, 9).map((item) => {
              const source = sources.find(({ id }) => id === item.source_id);
              return (
                <SidebarArticleCard
                  className="article-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  date={item.date}
                  source={source?.name || ''}
                />
              );
            })}
          </div>
        </div>
      </div>

      <section className="article-page__related-articles">
        <div className="container">
          <Title className="article-page__related-articles-title" Component="h2">
            Читайте также:
          </Title>

          <div className="grid article-page__related-articles-list">
            {relatedArticles?.slice(0, 3).map((item) => {
              const source = sources.find(({ id }) => id === item.source_id);
              return (
                <ArticleCard
                  className="article-page__related-articles-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  source={source?.name}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
