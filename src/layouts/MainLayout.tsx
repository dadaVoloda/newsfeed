import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Components/Header/Header';
import { Footer } from '../Components/Footer/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
