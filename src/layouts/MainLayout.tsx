import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { EmailModal } from '@components/EmailModal/EmailModal';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

export const MainLayout = () => {
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

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
