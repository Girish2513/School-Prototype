import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      window.location.href = '/admin';
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    // Simulate network delay
    setTimeout(() => {
      // --- Hardcoded credentials for prototype ---
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('isLoggedIn', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/images/logo.png" alt="School Logo" className="login-logo" />
        <h2>Admin Login</h2>
        <p className="login-subtitle">Welcome back! Please enter your credentials.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="login-footer">
          <p>Credentials: admin / password123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;