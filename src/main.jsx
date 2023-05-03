import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import AppRouter from './routers/AppRouter.jsx';
import './styles/styles.scss';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

const container = document.getElementById('root');
const appRoot = createRoot(container);
appRoot.render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
)