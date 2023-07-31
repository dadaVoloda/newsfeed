import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Articles } from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { MainLayout } from '../../layouts/MainLayout';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { LoginContainer } from '../../features/auth/login/LoginContainer';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Articles />}></Route>
          <Route path=":category" element={<Articles />}></Route>
          <Route path="article/:id" element={<ArticleItem />}></Route>
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
