import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { EmailModal } from '@features/subscribeNotification/components/EmailModal/EmailModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import { fetchCategories } from '@features/categories/actions';
import { fetchSources } from '@features/sources/actions';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

export const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSources());
  }, []);

  return (
    <>
      {emailModalShown && (
        <EmailModal
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setEmailModalShown(false);
          }}
        />
      )}
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
