import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './css/base.css';
import './css/style.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
