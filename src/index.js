import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/authContext';
import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
    <App/>
    <Toaster/>
    <Analytics />
    </AuthContextProvider>
    
);

