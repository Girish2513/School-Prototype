import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section footer-contact">
          <h4>Contact Us</h4>
          <p>Navodaya High School<br />123 Education Lane, Knowledge City, 500001</p>
          <p>Email: <a href="mailto:info@navodayahighschool.com">info@navodayahighschool.com</a></p>
          <p>Phone: <a href="tel:+911234567890">+91 12345 67890</a></p>
        </div>
        <div className="footer-section footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-section footer-quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#admissions">Admissions</a></li>
            <li><a href="#academics">Academics</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Navodaya High School. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;