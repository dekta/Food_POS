import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new client API for rendering
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Select the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root for the React app
const root = ReactDOM.createRoot(rootElement);

// Render the app wrapped in BrowserRouter
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
