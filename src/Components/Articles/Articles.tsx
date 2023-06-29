import React, { FC } from 'react';

import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';

import './Articles.css';
import { NewsApi } from '../../types';
import { categoryIds } from '../../utils';
import { useParams } from 'react-router-dom';

export const Articles: FC = () => {
  const [articles, setArticles] = React.useState<NewsApi>({
    items: [],
    categories: [],
    sources: [],
  });

  const { category = 'index' } = useParams();

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryIds[category] || ''))
      .then((response) => response.json())
      .then((data: NewsApi) => {
        setArticles(data);
      });
  }, [category]);

  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles.categories.find(({ id }) => id === item.category_id);
            const source = articles.sources.find(({ id }) => id === item.source_id);

            return (
              <MainArticle
                item={item}
                category={category?.name || ''}
                source={source?.name || ''}
                key={item.id}
              />
            );
          })}
        </section>
        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => id === item.source_id);
            return <SmallArticle item={item} source={source?.name || ''} key={item.id} />;
          })}
        </section>
      </div>
    </section>
  );
};
