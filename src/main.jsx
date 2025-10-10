import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Global styles for the application

/**
 * Entry point for the React application.
 * Renders the App component wrapped in StrictMode for development warnings
 * and ErrorBoundary for runtime error catching, enhancing reliability.
 * For scalability, this can be extended to include providers (e.g., ThemeProvider, Router).
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
