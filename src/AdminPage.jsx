// Import React hooks for state management and side effects
import { useState, useEffect, useCallback } from 'react';
// Import CSS styles for the AdminPage component
import './AdminPage.css';
// Import Firebase database functions
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";

// Import custom icon components for theme toggle
import { SunIcon } from './components/SunIcon'; // Icon for light mode
import { MoonIcon } from './components/MoonIcon'; // Icon for dark mode

// Main AdminPage component for managing site content
function AdminPage({ tickerItems, setTickerItems, popupImages, setPopupImages, onReset }) {
  // State for theme toggle (dark/light mode)
  const [isDarkMode, setDarkMode] = useState(false); // Boolean to track current theme
  // State for save operation loading indicator
  const [isSaving, setSaving] = useState(false); // Shows saving spinner when true
  // State for drag-and-drop visual feedback
  const [isDraggingOver, setIsDraggingOver] = useState(false); // True when dragging over upload zone

  // Transform popupImages array into banner objects for admin interface
  // Converts string URLs to objects with id, name, and preview
  const [banners, setBanners] = useState(
    popupImages.map((url, i) => ({ id: i, name: url.split('/').pop(), preview: url }))
  );

  const [lastUpdated, setLastUpdated] = useState({
    ticker: new Date(),
    banners: new Date(),
  });

  // Apply dark/light mode
  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  // Automatically log out after a period of inactivity when the tab is hidden.
  useEffect(() => {
    let logoutTimer; // Timer ID

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Set a timer to log out after 2 minutes (120,000 ms)
        logoutTimer = setTimeout(() => {
          console.log('Logging out due to inactivity.');
          handleLogout();
        }, 120000); // 2 minutes
      } else {
        // If the tab becomes visible again, clear the timer
        clearTimeout(logoutTimer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(logoutTimer); // Also clear the timer on unmount
    };
  }, []);

  // --- HANDLERS ---

  const handleTickerChange = useCallback((index, newText) => {
    setTickerItems(items => items.map((item, i) => (i === index ? newText : item)));
  }, []);

  const addTickerItem = useCallback(() => {
    setTickerItems(items => [...items, 'New item...']);
  }, []);

  const removeTickerItem = useCallback((index) => {
    setTickerItems(items => items.filter((_, i) => i !== index));
  }, []);

  // Read file as base64
  const readFileAsDataURL = (file) => { // Not wrapped in useCallback as it doesn't depend on component state
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const processUploadedFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const MAX_FILE_SIZE_MB = 2;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    try {

      const dataUrl = await readFileAsDataURL(file);
      const newBanner = {
        id: Date.now(),
        name: file.name,
        preview: dataUrl,
      };
      setBanners((b) => [...b, newBanner]);
    } catch (error) {
      console.error('Error reading file:', error);
      alert(`Error processing file: ${error.message || 'Please try again.'}`);
    }
  }, []);

  const handleBannerUpload = useCallback((event) => {
    const file = event.target.files[0];
    processUploadedFile(file);
  }, [processUploadedFile]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files[0];
    processUploadedFile(file);
  }, [processUploadedFile]);

  const removeBanner = useCallback((id) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    setBanners(updatedBanners);
    setPopupImages(updatedBanners.map(b => b.preview));
  }, [banners, setPopupImages]);

  // ✅ Save both tickerItems and banners directly to Firebase (no storage)
  const handleSaveChanges = useCallback(async () => {
    setSaving(true);
    try {
      console.log("Saving data to Firebase (no Storage)...");

      // Extract base64 previews from current banners
      const base64Images = banners.map((b) => b.preview);

      // Save ticker items and base64 images directly to Realtime Database
      await set(ref(db, "ticker/"), { items: tickerItems });
      await set(ref(db, "popup/"), { images: base64Images });

      // Update local state
      setPopupImages(base64Images);
      const now = new Date();
      setLastUpdated({ ticker: now, banners: now });

      alert("✅ Changes saved successfully!");
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert(`❌ Failed to save changes. ${error.message || 'Check console for details.'}`);
    } finally {
      setSaving(false);
    }
  }, [banners, tickerItems, setPopupImages]);


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // --- RENDER ---
  return (
    <div className="admin-container">
      {/* Admin panel header */}
      <header className="admin-header">
        <div className="header-left">
          <img src="/images/logo.png" alt="School Logo" className="logo" />
          <span className="school-name">Admin Panel</span>
        </div>
        <div className="header-right">
          <button className="theme-toggle-button" onClick={() => setDarkMode(!isDarkMode)} aria-label="Toggle theme">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-main">
        <h1 className="admin-main-title">Welcome, Admin!</h1>

        {/* Ticker Items Section */}
        <section className="section-card">
          <div className="section-header">
            <h2>News Ticker Items</h2>
            <p className="last-updated">Last updated on {formatDate(lastUpdated.ticker)}</p>
          </div>

          <div className="item-list">
            {tickerItems.map((item, index) => (
              <div key={index} className="ticker-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleTickerChange(index, e.target.value)}
                  placeholder="Enter ticker text..."
                />
                <button onClick={() => removeTickerItem(index)} className="btn-remove">Remove</button>
              </div>
            ))}
          </div>

          <button onClick={addTickerItem} className="btn-add">+ Add Ticker Item</button>

          <div className="ticker-preview-container">
            <h4>Ticker Preview</h4>
            <div className="ticker-preview">
              <div className="ticker-content">
                {tickerItems.map((item, i) => <span key={i}>{item}</span>)}
                {tickerItems.map((item, i) => <span key={`dup-${i}`}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Popup Banner Section */}
        <section className="section-card">
          <div className="section-header">
            <h2>Popup Banner Images</h2>
            <p className="last-updated">Last updated on {formatDate(lastUpdated.banners)}</p>
          </div>

          <div className="banner-list">
            {banners.map((banner) => (
              <div key={banner.id} className="banner-item">
                <img src={banner.preview} alt={banner.name} className="banner-thumbnail" />
                <p className="banner-name">{banner.name}</p>
                <div className="banner-actions">
                  <button onClick={() => removeBanner(banner.id)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`upload-zone ${isDraggingOver ? 'dragging-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" id="banner-upload" accept="image/*" onChange={handleBannerUpload} />
            <label htmlFor="banner-upload">
              <p>Drag & drop or click to upload new banner</p>
              <small>Recommended: 1080×720 px, Max 2MB</small>
            </label>
          </div>
        </section>

        {/* Save + Reset Buttons */}
        <div className="save-section">
          <button className="save-button" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button className="reset-button" onClick={onReset} disabled={isSaving}>
            Reset to Defaults
          </button>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
