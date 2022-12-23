import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/404';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
