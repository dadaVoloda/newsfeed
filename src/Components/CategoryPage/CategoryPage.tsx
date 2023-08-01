import React, { FC } from 'react';

import { CategoryNames, NewsApi } from '../../types';
import { categoryIds, categoryTitles } from '../../utils';
import { useParams } from 'react-router-dom';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

import './CategoryPage.css';

export const CategoryPage: FC = () => {
  const [articles, setArticles] = React.useState<NewsApi>({
    items: [],
    categories: [],
    sources: [],
  });

  const { category = 'tech' } = useParams<Record<string, CategoryNames>>();

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category] || ''))
      .then((response) => response.json())
      .then((data: NewsApi) => {
        setArticles(data);
      });
  }, [category]);

  return (
    <section className="category-page">
      <Hero className="category-page__hero" title={categoryTitles[category]} image="test" />
      <div className="container grid">
        <section className="category-page__content">
          {articles.items.slice(3).map((item) => {
            const category = articles.categories.find(({ id }) => id === item.category_id);
            const source = articles.sources.find(({ id }) => id === item.source_id);

            return (
              <ArticleCard
                className="category-page__item"
                id={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                category={category?.name}
                source={source?.name}
                key={item.id}
              />
            );
          })}
        </section>
        <section className="category-page__sidebar">
          {articles.items.slice(0, 3).map((item) => {
            const source = articles.sources.find(({ id }) => id === item.source_id);
            return (
              <SidebarArticleCard
                className="category-page__sidebar-item"
                id={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
                source={source?.name || ''}
                key={item.id}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
