import React, { useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
  useEffect(() => {
    const track = document.getElementById("galleryTrack");
    if (!track) return;

    const items = track.querySelectorAll(".gallery-item");
    const totalItems = items.length;
    if (totalItems < 3) {
      console.warn("Gallery animation requires at least 3 items.");
      return;
    }

    let centerIndex = 0;
    let animationInterval;

    const updateGallery = () => {
      const leftIndex = (centerIndex - 1 + totalItems) % totalItems;
      const rightIndex = (centerIndex + 1) % totalItems;

      items.forEach((item, index) => {
        item.classList.remove("left", "center", "right");
        if (index === centerIndex) item.classList.add("center");
        else if (index === leftIndex) item.classList.add("left");
        else if (index === rightIndex) item.classList.add("right");
      });
    };

    const advance = () => {
      centerIndex = (centerIndex + 1) % totalItems;
      updateGallery();
    };

    const startAnimation = () => {
      clearInterval(animationInterval);
      animationInterval = setInterval(advance, 3000);
    };

    updateGallery();
    startAnimation();

    return () => clearInterval(animationInterval);
  }, []);

  const handleViewFullGallery = (e) => {
    e.preventDefault(); // Prevent the default link behavior (page reload)
    // Update the URL in the browser's address bar
    window.history.pushState({}, '', '/view-gallery');
    // Dispatch a 'popstate' event to notify App.jsx of the URL change
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>SNEAK<br />PEAK</h2>
        <div className="gallery-line"></div>
        <p>Catch a sneak peek of campus life! 🎓<br />Where every picture tells a story of learning, laughter, and growth.</p>
      </div>

      <div className="gallery-content">
        <div id="galleryTrack" className="gallery-track">
          <div className="gallery-item"><img src="/images/welcome.jpg" alt="Welcome" /></div>
          <div className="gallery-item"><img src="/images/school-ground.jpg" alt="Activity" /></div>
          <div className="gallery-item"><img src="/images/flag-hoisting.jpg" alt="Classroom" /></div>
          <div className="gallery-item"><img src="/images/event.jpg" alt="Event" /></div>
          <div className="gallery-item"><img src="/images/school-front-side.jpg" alt="Group Photo"/></div>
        </div>
      </div>
      <a href="/view-gallery" onClick={handleViewFullGallery} className="btn-gallery-view">
        View Full Gallery
      </a>
    </section>
  );
};

export default Gallery;
