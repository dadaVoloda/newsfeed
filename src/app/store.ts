import { configureStore, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import categoriesReducer from '@features/categories/slice';
import sourcesReducer from '@features/sources/slice';
import articleItemReducer from '@features/articleItem/slice';
import articlesListReducer from '@features/articlesList/slice';
import categoryArticlesReducer from '@features/categoryArticles/slice';
import relatedArticlesReducer from '@features/relatedNews/slice';

export const store = configureStore({
  reducer: {
    articlesList: articlesListReducer,
    categoryArticles: categoryArticlesReducer,
    relatedArticles: relatedArticlesReducer,
    categories: categoriesReducer,
    sources: sourcesReducer,
    articleItem: articleItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;
