import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import AppRouter from './routers/AppRouter.jsx';
import './styles/styles.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/firebase.js';
import { startCreateUser } from './actions/userActions.js';

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


onAuthStateChanged(auth, (user) => {
  console.log('auth state changed', auth)
  if (user && user.isAnonymous) {
      startCreateUser({ uid: auth.currentUser.uid, authProvider: 'anonymous' })
  }
})