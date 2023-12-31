import React, { FC, useState } from 'react';

import { useParams } from 'react-router-dom';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';

import './CategoryPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@app/store';
import { CategoryNames } from '@features/categories/types';
import { getCategoryNews } from '@features/categoryArticles/selectors';
import { categoryIds, categoryTitles } from '@features/categories/constants';
import { getCategories } from '@features/categories/selectors';
import { getSources } from '@features/sources/selectors';
import { fetchCategoryArticles } from '@features/categoryArticles/actions';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { repeat } from '@app/utils';

export const CategoryPage: FC = () => {
  const { category = 'tech' } = useParams<Record<string, CategoryNames>>();
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(getCategoryNews(categoryIds[category]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchCategoryArticles(categoryIds[category])).then(() => {
      setLoading(false);
    });
  }, [category]);

  if (loading) {
    return (
      <section className="category-page">
        <HeroSkeleton className="category-page__hero" title={categoryTitles[category]} />
        <div className="container grid">
          <section className="category-page__content">
            {repeat((i) => {
              return <ArticleCardSkeleton className="category-page__item" key={i} />;
            }, 6)}
          </section>
          <section className="category-page__sidebar">
            {repeat((i) => {
              return <SidebarArticleCardSkeleton className="category-page__sidebar-item" key={i} />;
            }, 3)}
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="category-page">
      <Hero
        className="category-page__hero"
        title={categoryTitles[category]}
        image={require(`@images/categories/${category}.jpg`)}
      />
      <div className="container grid">
        <section className="category-page__content">
          {articles.slice(3).map((item) => {
            const category = categories.find(({ id }) => id === item.category_id);
            const source = sources.find(({ id }) => id === item.source_id);

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
          {articles.slice(0, 3).map((item) => {
            const source = sources.find(({ id }) => id === item.source_id);
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
