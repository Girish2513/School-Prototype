import React from 'react';
import PropTypes from 'prop-types';
import { footerData } from './siteData';

/**
* Footer component displaying site-wide links, contact info, and social media.
* Data sourced from siteData.js for maintainability; includes contact, social, quick links, and copyright.
* Accessibility: Semantic footer, ARIA labels for links, keyboard navigation.
* Responsiveness: Layout adapts via CSS; stacks on mobile.
* For scalability, footerData can be extended with more sections or dynamic content.
* For extensibility, add newsletter signup or privacy policy links.
*/
function Footer({ isHomePage = true }) {
const handleFooterLinkClick = (e) => {
e.preventDefault();
const targetId = e.currentTarget.getAttribute('href').substring(1);
const targetElement = document.getElementById(targetId);

if (!isHomePage) {
// If not on the home page, navigate to home with the hash
// Use pushState to avoid a full page reload.
// The App component will listen for this and handle the scroll.
const path = `/${targetId ? '#' + targetId : ''}`;
window.history.pushState({ targetId }, '', path);
const navEvent = new PopStateEvent('popstate');
window.dispatchEvent(navEvent);
} else {
// If on the home page, scroll smoothly
if (targetElement) {
targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}
};


return (
<footer id="footer" className="site-footer" role="contentinfo">
<div className="footer-container">
{/* Contact section: Address, email, phone with proper links */}
<div className="footer-section footer-contact">
<h4>{footerData.contact.title}</h4>
<p dangerouslySetInnerHTML={{ __html: footerData.contact.address }}></p>
<p>
Email: <a href={`mailto:${footerData.contact.email}`} aria-label={`Email us at ${footerData.contact.email}`}>{footerData.contact.email}</a>
</p>
<p>
Phone: <a href={`tel:${footerData.contact.phone}`} aria-label={`Call us at ${footerData.contact.phone}`}>{footerData.contact.phone}</a>
</p>
</div>
{/* Social links: External links with security attributes */}
<div className="footer-section footer-social">
<h4>{footerData.social.title}</h4>
<div className="social-links">
{footerData.social.links.map((link) => (
<a
key={link.platform}
href={link.url}
target="_blank"
rel="noopener noreferrer"
aria-label={link.ariaLabel}
>
<i className={link.icon} aria-hidden="true"></i>
</a>
))}
</div>
</div>
{/* Quick links: Internal navigation for accessibility */}
<div className="footer-section footer-quick-links">
<h4>{footerData.quickLinks.title}</h4>
<ul>
{footerData.quickLinks.links.map((link) => (
<li key={link.href}>
<a
href={link.href}
onClick={handleFooterLinkClick}
aria-label={`Navigate to ${link.text}`}
>{link.text}</a>
</li>
))}
</ul>
</div>
</div>
{/* Footer bottom: Copyright notice */}
<div
className="footer-bottom"
style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
paddingRight: '3rem'
}}>
<p>{footerData.copyright}</p>
<div style={{ textAlign: 'right' }}>
<p>
© Designed by{' '}
<a
href="https://www.instagram.com/itswebaura?igsh=MWxjdWJnYWYxdGdzYg=="
target="_blank"
rel="noopener noreferrer"
style={{ textDecoration: 'none' }}
>
<span style={{ color: 'tomato' }}>WebAura</span>
</a>
</p>
<p style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#888' }}>
            <a
              href="https://girish-saana.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              Girish Saana
            </a>
            {' • '}G.Druvath Kumar{' • '}R.Venu Kumar
</p>
</div>
</div>
</footer>
);
}

Footer.propTypes = {
isHomePage: PropTypes.bool,
};


export default Footer;
