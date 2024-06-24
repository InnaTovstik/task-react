import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoApp from './TodoApp';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);

reportWebVitals();
