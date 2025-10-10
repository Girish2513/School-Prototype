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
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes: Update state and clear errors for that field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Basic validation: Required fields, email format
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission: Validate, prevent default, simulate send (log for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call; replace with actual submission (e.g., fetch to backend)
    console.log('Form submitted:', formData);
    setTimeout(() => {
      alert('Message sent successfully!'); // Replace with better UX (toast)
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-container">
        <h2 id="contact-title" className="section-title">Get in Touch</h2>
        <div className="contact-content">
          {/* Contact form container: Controlled form with validation */}
          <div className="contact-form-container">
            <h3>Send us a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby="form-instructions">
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
                <label htmlFor="email" className="sr-only">Your Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email *"
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
                <label htmlFor="subject" className="sr-only">Subject *</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && <span id="subject-error" className="error" role="alert">{errors.subject}</span>}
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
            </form>
          </div>
          {/* Contact info with map: Static embed; for dynamic, use Google Maps API */}
          <div className="contact-info-container">
            <h3>Find Us Here</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.927295113422!2d78.3734099759328!3d17.45193800133994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c55aaaaaab%3A0x63c3b4632f23554!2sNavodaya%20High%20School!5e0!3m2!1sen!2sin!4v1716466946453!5m2!1sen!2sin"
                width="100%"
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
