import React, { useState } from 'react';

/**
 * Contact section component with a form for inquiries and an embedded Google Map for location.
 * Form is client-side only (action="#"); for production, integrate with a backend (e.g., EmailJS, Formspree).
 * Includes basic client-side validation for reliability; state manages form data and errors.
 * Accessibility: Labels for inputs, ARIA for form and map, semantic structure.
 * Responsiveness: Layout stacks on mobile via CSS; map is responsive.
 * For scalability, externalize contact info (address, email) to siteData.js or API.
 * For extensibility, add file upload, reCAPTCHA, or dynamic map markers.
 */
function Contact() {
  // Form state for controlled inputs, improving UX and validation
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Handle input changes: Update state and clear errors for that field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitStatus(null); // Clear submission status on new input
  };

  // Basic validation: Required fields, email format
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    // Email is optional, but if provided, it must be valid
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission: Validate, prevent default, simulate send (log for now)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzitlbnOLEo0hyCpVW0ilqMbuXsBGHsXKYXHDRzNgYj28Nl3vnqerFx3AJCAitESSvb/exec';
    
    try {
      // We use 'no-cors' mode to prevent CORS errors from Google's redirect response.
      // When sending FormData, the browser automatically sets the correct 'Content-Type' header (multipart/form-data).
      // This is the most reliable way for Google Apps Script's e.parameter to be populated.
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('phone', formData.phone);
      dataToSend.append('email', formData.email);
      dataToSend.append('message', formData.message);

      await fetch(scriptURL, { 
        method: 'POST', 
        body: dataToSend,
        mode: 'no-cors' // Essential for bypassing CORS issues with Google Apps Script redirects
      });

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting to Google Sheet!', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-container">
        <h2 id="contact-title" className="section-title">Get in Touch</h2>
        <div className="contact-content">
          {/* Contact form container: Controlled form with validation */}
          <div className="contact-form-container">
            <h3>Drop us a Line</h3>
            <form name="submit-to-google-sheet" className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby="form-instructions">
              <p id="form-instructions" className="sr-only">Required fields are marked with *</p>
              <div className="form-group">
                <label htmlFor="name" className="sr-only">Your Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="error" role="alert">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="sr-only">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <span id="phone-error" className="error" role="alert">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="error" role="alert">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message" className="sr-only">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message *"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && <span id="message-error" className="error" role="alert">{errors.message}</span>}
              </div>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && <p className="submit-message success">Message sent successfully! We'll get back to you soon.</p>}
              {submitStatus === 'error' && <p className="submit-message error">Something went wrong. Please try again later.</p>}
            </form>
          </div>
          {/* Contact info with map: Static embed; for dynamic, use Google Maps API */}
          <div className="contact-info-container" style={{ padding: 0, borderRadius: 0, boxShadow: 'none', backgroundColor: 'transparent' }}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.9433560254197!2d78.42341787489686!3d17.51021719925554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d3a4ef6e75%3A0x7e65664178ecaf59!2sNavodaya%20High%20School!5e0!3m2!1sen!2sin!4v1760607985446!5m2!1sen!2sin"                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Navodaya High School Location on Google Maps"
                aria-label="Interactive map showing school location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
