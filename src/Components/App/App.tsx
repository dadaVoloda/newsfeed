import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ArticlePage } from '@components/ArticlePage/ArticlePage';
import { MainLayout } from '../../layouts/MainLayout';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { LoginContainer } from '../../features/auth/login/LoginContainer';
import { CategoryPage } from '@components/CategoryPage/CategoryPage';
import { HomePage } from '@components/HomePage/HomePage';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path=":category" element={<CategoryPage />}></Route>
          <Route path="article/:id" element={<ArticlePage />}></Route>
          <Route path="login" element={<LoginContainer />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <AdminArticles />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path=":create"
            element={
              <PrivateRoute>
                <AdminArticleItem />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path=":edit/:id"
            element={
              <PrivateRoute>
                <AdminArticleItem />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};
