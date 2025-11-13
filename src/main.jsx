import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Global styles for the application

/**
 * Entry point for the React application.
 * Renders the App component wrapped in:
 * - StrictMode: For development warnings.
 * - HelmetProvider: To enable dynamic head management for SEO.
 * - ErrorBoundary: For runtime error catching.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
);
