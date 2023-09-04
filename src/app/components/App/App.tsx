import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { MainLayout } from '../../../layouts/MainLayout';
import { AdminLayout } from '../../../layouts/AdminLayout';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
import { AdminArticles } from '@features/admin/components/AdminArticles/AdminArticles';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { PrivateRoute } from '@features/auth/components/PrivateRoute/PrivateRoute';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';

export const App = () => {
  const { pathname } = useLocation();
  const prevPathName = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathName.current) {
      prevPathName.current = pathname;
      window.scrollTo(0, 0);
    }
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
