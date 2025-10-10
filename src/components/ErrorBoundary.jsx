import React from 'react';

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree.
 * Displays a fallback UI when an error occurs, improving user experience and reliability.
 * Logs the error for debugging. This enhances the app's resilience by preventing full crashes.
 * For scalability, consider integrating with error reporting services like Sentry.
 * 
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap.
 * @returns {JSX.Element} The wrapped children or fallback UI on error.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state to show fallback UI when an error is caught.
   * @param {Error} error - The caught error.
   * @returns {object} Updated state.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Logs the error and error info for debugging purposes.
   * This can be extended to send errors to a logging service.
   * @param {Error} error - The caught error.
   * @param {object} errorInfo - Stack trace and component info.
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - can be customized for better UX, e.g., with retry button.
      return (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong.</h2>
          <p>Sorry, an unexpected error occurred. Please refresh the page or contact support.</p>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
              {this.state.error && this.state.error.toString()}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
