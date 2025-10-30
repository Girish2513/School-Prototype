import React, { useState, useEffect, useRef } from 'react';
import './AdminPage.css';
import { SunIcon } from './components/SunIcon'; // Assuming you create these files
import { MoonIcon } from './components/MoonIcon';

function AdminPage({ tickerItems, setTickerItems, popupImages, setPopupImages, onReset }) {
  // --- STATE MANAGEMENT ---
  const [isDarkMode, setDarkMode] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [replacingBannerId, setReplacingBannerId] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);


  // Transform popupImages (string array) to a structure the admin page can use
  const [banners, setBanners] = useState(
    popupImages.map((url, i) => ({ id: i, name: url.split('/').pop(), preview: url }))
  );

  // Last Updated Timestamps
  const [lastUpdated, setLastUpdated] = useState({
    ticker: new Date(),
    banners: new Date(),
  });

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  // --- HANDLERS ---

  const handleTickerChange = (index, newText) => {
    setTickerItems(items => items.map((item, i) => (i === index ? newText : item)));
  };

  const addTickerItem = () => {
    setTickerItems(items => [...items, 'New item...']);
  };

  const removeTickerItem = (index) => {
    setTickerItems(items => items.filter((_, i) => i !== index));
  };

  const processUploadedFile = (file) => {
    if (file) {
      const newBanner = {
        id: Date.now(),
        name: file.name,
        preview: URL.createObjectURL(file),
      };
      setBanners(b => [...b, newBanner]);
    }
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    processUploadedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files[0];
    processUploadedFile(file);
  };

  const removeBanner = (id) => {
    setBanners(b => b.filter(banner => banner.id !== id));
    setPopupImages(popupImages.filter((_, i) => i !== banners.findIndex(b => b.id === id)));
  };

  const handleReplaceClick = (bannerId) => {
    setReplacingBannerId(bannerId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBannerReplace = (event) => {
    const file = event.target.files[0];
    if (file && replacingBannerId !== null) {
      setBanners(currentBanners =>
        currentBanners.map(banner =>
          banner.id === replacingBannerId
            ? { ...banner, name: file.name, preview: URL.createObjectURL(file) }
            : banner
        )
      );
      setReplacingBannerId(null);
      event.target.value = null; // Allows selecting the same file again
    }
  };

  const handleSaveChanges = () => {
    setSaving(true);
    console.log("Saving data...", { tickerItems, banners });

    setTimeout(() => {
      // Update the main app's state for popup images
      setPopupImages(banners.map(b => b.preview));
      setSaving(false);

      alert('✅ Changes saved successfully!');
      const now = new Date();
      setLastUpdated({ ticker: now, banners: now });
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // --- RENDER ---
  return (
    <div className="admin-container">
      {/* --- Header --- */}
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

      {/* --- Main Content --- */}
      <main className="admin-main">
        <h1 className="admin-main-title">Welcome, Admin!</h1>
        {/* News Ticker Section */}
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
                  <button onClick={() => handleReplaceClick(banner.id)} className="btn-replace">Replace</button>
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

        {/* Hidden file input for replacing banners */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleBannerReplace}
          style={{ display: 'none' }}
          accept="image/*" />

        {/* Save Section */}
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
