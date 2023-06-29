import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Articles } from '../Articles/Articles';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ArticleItem } from '../ArticleItem/ArticleItem';

import './App.css';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route path="/:category" element={<Articles />}></Route>
          <Route path="/article/:id" element={<ArticleItem />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};
