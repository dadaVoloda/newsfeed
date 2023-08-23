import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './app/common.css';
import { App } from '@app/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeAPI } from '@app/api';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { store } from '@app/store';

const firebaseApp = initializeAPI();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);
