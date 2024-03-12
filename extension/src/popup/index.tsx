import React, { createRoot } from 'react-dom/client';

import App from './App';

import './theme.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = createRoot(rootEl);

  root.render(<App />);
}
