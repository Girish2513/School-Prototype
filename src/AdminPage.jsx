import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage({ tickerItems, setTickerItems, popupImages, setPopupImages }) {
  const [localTickerItems, setLocalTickerItems] = useState(tickerItems);
  const [localPopupImages, setLocalPopupImages] = useState(popupImages);

  useEffect(() => {
    setLocalTickerItems(tickerItems);
    setLocalPopupImages(popupImages);
  }, [tickerItems, popupImages]);

  const handleTickerChange = (index, value) => {
    const updated = [...localTickerItems];
    updated[index] = value;
    setLocalTickerItems(updated);
  };

  const handlePopupImageChange = (index, value) => {
    const updated = [...localPopupImages];
    updated[index] = value;
    setLocalPopupImages(updated);
  };

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updated = [...localPopupImages];
        updated[index] = e.target.result; // Base64 data URL
        setLocalPopupImages(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTickerItem = () => {
    setLocalTickerItems([...localTickerItems, '']);
  };

  const removeTickerItem = (index) => {
    setLocalTickerItems(localTickerItems.filter((_, i) => i !== index));
  };

  const addPopupImage = () => {
    setLocalPopupImages([...localPopupImages, '']);
  };

  const removePopupImage = (index) => {
    setLocalPopupImages(localPopupImages.filter((_, i) => i !== index));
  };

  const saveChanges = () => {
    setTickerItems(localTickerItems);
    setPopupImages(localPopupImages);
    alert('Changes saved successfully!');
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <section className="admin-section">
        <h2>News Ticker Items</h2>
        {localTickerItems.map((item, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              value={item}
              onChange={(e) => handleTickerChange(index, e.target.value)}
              placeholder="Enter ticker text"
            />
            <button onClick={() => removeTickerItem(index)} className="remove-btn">Remove</button>
          </div>
        ))}
        <button onClick={addTickerItem} className="add-btn">Add Ticker Item</button>
      </section>

      <section className="admin-section">
        <h2>Popup Banner Images</h2>
        {localPopupImages.map((image, index) => (
          <div key={index} className="input-group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(index, e)}
              className="file-input"
            />
            <input
              type="text"
              value={image}
              onChange={(e) => handlePopupImageChange(index, e.target.value)}
              placeholder="Or enter image URL (e.g., /images/image.jpg)"
            />
            <button onClick={() => removePopupImage(index)} className="remove-btn">Remove</button>
          </div>
        ))}
        <button onClick={addPopupImage} className="add-btn">Add Image</button>
      </section>

      <button onClick={saveChanges} className="save-btn">Save Changes</button>
    </div>
  );
}

export default AdminPage;
