/**
 * LoginPage component - Admin authentication page.
 * Provides secure login form for school administrators.
 * Features form validation, loading states, and auto-redirect.
 * Security: Hardcoded credentials for prototype (replace with real auth).
 * Performance: Minimal state management, localStorage for session.
 * Accessibility: Proper labels, focus management, error announcements.
 * Responsive: Centered layout adapts to screen size.
 *
 * @param {object} props - Component props.
 * @param {function} props.onLoginSuccess - Callback for successful login.
 * @returns {JSX.Element} The login page component.
 */
import React, { useState, useEffect } from 'react';
import './LoginPage.css'; // Login page styles

function LoginPage({ onLoginSuccess }) {
  // Form state management
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error message
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Loading state

  // Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      window.location.href = '/admin'; // Redirect to admin page
    }
  }, []);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setIsLoggingIn(true); // Show loading state

    // Simulate network delay for UX
    setTimeout(() => {
      // Hardcoded credentials for prototype - replace with real authentication
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('isLoggedIn', 'true'); // Store login state
        onLoginSuccess(); // Trigger success callback
      } else {
        setError('Invalid username or password.'); // Show error
        setIsLoggingIn(false); // Hide loading state
      }
    }, 1000); // 1 second delay
  };

  // Render login form
  return (
    <div className="login-container">
      <div className="login-box">
        {/* School logo */}
        <img src="/images/logo.png" alt="School Logo" className="login-logo" />

        {/* Page title */}
        <h2>Admin Login</h2>

        {/* Subtitle */}
        <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Username input */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Required field
              autoFocus // Auto-focus on load
            />
          </div>

          {/* Password input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Required field
            />
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="login-button" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging In...' : 'Login'} {/* Dynamic text */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
