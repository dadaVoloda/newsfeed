import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './Components/App/App';
import { HashRouter } from 'react-router-dom';

import './common.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
