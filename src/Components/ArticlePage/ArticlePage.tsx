import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import './ArticlePage.css';
import { Article, ArticleItemApi, Source as SourceType } from '../../types';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { Source } from '@components/Source/Source';

import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { beautifyDate, categoryTitles } from '../../utils';
import { Title } from '@components/Title/Title';

export const ArticlePage: FC = () => {
  const [articleItem, setArticleItem] = React.useState<ArticleItemApi | null>(null);
  const [relatedArticles, setRelatedArticles] = React.useState<Article[] | null>(null);
  const [sources, setSources] = React.useState<SourceType[]>([]);

  const { id } = useParams();

  React.useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem);

    Promise.all([
      fetch(`https://frontend.karpovcourses.net/api/v2/sources`).then((response) =>
        response.json()
      ),
      fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then(
        (response) => response.json()
      ),
    ]).then(([sources, articles]) => {
      setSources(sources);
      setRelatedArticles(articles.items);
    });
  }, [id]);

  if (articleItem === null) return;

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
