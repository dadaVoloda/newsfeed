import React from 'react';
import { createRoot } from 'react-dom/client';
import './common.css';
import { App } from '@components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeAPI } from './api';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

const firebaseApp = initializeAPI();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
