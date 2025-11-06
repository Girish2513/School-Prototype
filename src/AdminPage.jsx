// Import React hooks for state management and side effects
import { useState, useEffect, useRef } from 'react';
// Import CSS styles for the AdminPage component
import './AdminPage.css';
// Import custom icon components for theme toggle
import { SunIcon } from './components/SunIcon'; // Icon for light mode
import { MoonIcon } from './components/MoonIcon'; // Icon for dark mode

// Main AdminPage component for managing site content
// Props: tickerItems (array), setTickerItems (function), popupImages (array), setPopupImages (function), onReset (function)
function AdminPage({ tickerItems, setTickerItems, popupImages, setPopupImages, onReset }) {
  // State for theme toggle (dark/light mode)
  const [isDarkMode, setDarkMode] = useState(false); // Boolean to track current theme
  // State for save operation loading indicator
  const [isSaving, setSaving] = useState(false); // Shows saving spinner when true
  // Ref for hidden file input used for banner replacement
  const fileInputRef = useRef(null); // Reference to file input element
  // State to track which banner is being replaced
  const [replacingBannerId, setReplacingBannerId] = useState(null); // ID of banner being replaced
  // State for drag-and-drop visual feedback
  const [isDraggingOver, setIsDraggingOver] = useState(false); // True when dragging over upload zone

  // Transform popupImages array into banner objects for admin interface
  // Converts string URLs to objects with id, name, and preview
  const [banners, setBanners] = useState(
    popupImages.map((url, i) => ({ id: i, name: url.split('/').pop(), preview: url }))
  );

  // State for tracking last update timestamps for different sections
  const [lastUpdated, setLastUpdated] = useState({
    ticker: new Date(), // Last time ticker items were updated
    banners: new Date(), // Last time banner images were updated
  });

  // Effect to apply theme to document body when dark mode changes
  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? 'dark' : 'light'; // Set data attribute for CSS theming
  }, [isDarkMode]);

  // --- HANDLERS ---

  // Handler to update a specific ticker item text
  const handleTickerChange = (index, newText) => {
    setTickerItems(items => items.map((item, i) => (i === index ? newText : item))); // Update item at index
  };

  // Handler to add a new ticker item
  const addTickerItem = () => {
    setTickerItems(items => [...items, 'New item...']); // Append default text to ticker items
  };

  // Handler to remove a ticker item by index
  const removeTickerItem = (index) => {
    setTickerItems(items => items.filter((_, i) => i !== index)); // Filter out item at index
  };

  // Helper function to read a file as a Base64 Data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Helper function to process an uploaded file and create a banner object
  const processUploadedFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      const newBanner = {
        id: Date.now(), // Unique ID based on timestamp
        name: file.name, // Original file name
        preview: dataUrl, // Use the permanent Data URL for preview
      };
      setBanners((b) => [...b, newBanner]); // Add new banner to banners array
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error processing file. Please try again.');
    }
  };

  // Handler for file input change (regular upload)
  const handleBannerUpload = (event) => {
    const file = event.target.files[0]; // Get first selected file
    processUploadedFile(file); // Process the file
  };

  // Handler for drag over event (prevent default, show visual feedback)
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default browser behavior
    setIsDraggingOver(true); // Set dragging state for visual feedback
  };

  // Handler for drag leave event (hide visual feedback)
  const handleDragLeave = () => {
    setIsDraggingOver(false); // Reset dragging state
  };

  // Handler for drop event (process dropped file)
  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default browser behavior
    setIsDraggingOver(false); // Reset dragging state
    const file = event.dataTransfer.files[0]; // Get first dropped file
    processUploadedFile(file); // Process the file
  };

  // Handler to remove a banner by ID
  const removeBanner = (id) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    setBanners(updatedBanners); // Remove from local banners state
    // Immediately update the parent state to reflect the removal
    setPopupImages(updatedBanners.map(b => b.preview));
  };

  // Handler for replace button click (trigger hidden file input)
  const handleReplaceClick = (bannerId) => {
    setReplacingBannerId(bannerId); // Set which banner is being replaced
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // Handler for banner replacement via file input
  const handleBannerReplace = async (event) => {
    const file = event.target.files[0]; // Get selected file
    if (file && replacingBannerId !== null) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        setBanners((currentBanners) =>
          currentBanners.map((banner) =>
            banner.id === replacingBannerId
              ? { ...banner, name: file.name, preview: dataUrl } // Update banner with new file
              : banner
          )
        );
      } catch (error) {
        console.error('Error replacing file:', error);
        alert('Error replacing file. Please try again.');
      }
      setReplacingBannerId(null); // Reset replacement state
      event.target.value = null; // Clear input to allow re-selecting same file
    }
  };

  // Handler for saving all changes
  const handleSaveChanges = () => {
    setSaving(true); // Show loading state
    console.log("Saving data...", { tickerItems, banners }); // Debug log

    setTimeout(() => {
      // Update the main app's state for popup images
      setPopupImages(banners.map(b => b.preview)); // Convert banners to URL array
      setSaving(false); // Hide loading state

      alert('✅ Changes saved successfully!'); // Success notification
      const now = new Date();
      setLastUpdated({ ticker: now, banners: now }); // Update timestamps
    }, 1000); // Simulate save delay
  };

  // Handler for admin logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    window.location.href = '/login'; // Redirect to login page
  };

  // Utility function to format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }); // Format as "Jan 1, 2023, 12:00 PM"
  };

  // --- RENDER ---
  return (
    <div className="admin-container">
      {/* Admin panel header with logo, title, theme toggle, and logout */}
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

      {/* Main content area of the admin panel */}
      <main className="admin-main">
        <h1 className="admin-main-title">Welcome, Admin!</h1>

        {/* Section for managing news ticker items */}
        <section className="section-card">
          <div className="section-header">
            <h2>News Ticker Items</h2>
            <p className="last-updated">Last updated on {formatDate(lastUpdated.ticker)}</p>
          </div>

          {/* List of editable ticker items */}
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

          {/* Preview of how ticker will look */}
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

        {/* Section for managing popup banner images */}
        <section className="section-card">
          <div className="section-header">
            <h2>Popup Banner Images</h2>
            <p className="last-updated">Last updated on {formatDate(lastUpdated.banners)}</p>
          </div>

          {/* List of uploaded banner images with actions */}
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

          {/* Drag-and-drop upload zone for new banners */}
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

        {/* Hidden file input for banner replacement functionality */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleBannerReplace}
          style={{ display: 'none' }}
          accept="image/*" />

        {/* Section with save and reset buttons */}
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
