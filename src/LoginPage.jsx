/**
 * LoginPage component - Admin authentication page.
 * Provides secure login form for school administrators.
 * Uses Firebase Authentication for secure email/password sign-in.
 * Features form validation, loading states, and auto-redirect.
 * Accessibility: Proper labels, focus management, error announcements.
 * Responsive: Centered layout adapts to screen size.
 *
 * @param {object} props - Component props.
 * @param {function} props.onLoginSuccess - Callback for successful login.
 * @returns {JSX.Element} The login page component.
 */
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './LoginPage.css'; // Login page styles

function LoginPage({ onLoginSuccess }) {
  // Form state management
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error message
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Loading state

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setIsLoggingIn(true); // Show loading state

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // Trigger success callback
    } catch (err) {
      // Map Firebase error codes to user-friendly messages
      const errorMessages = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
      };
      setError(errorMessages[err.code] || 'Login failed. Please try again.');
      setIsLoggingIn(false); // Hide loading state
    }
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
          {/* Email input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Required field
              autoFocus // Auto-focus on load
              autoComplete="email"
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
              autoComplete="current-password"
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
