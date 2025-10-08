import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import CSS System
import './css/index.css';

import Application from './ts/Application';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Application />
  </StrictMode>,
);
