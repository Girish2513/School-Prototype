# Navodaya React App - Project Explanation

## Overview
This is a React-based single-page application (SPA) for Navodaya High School, built with Vite for fast development and optimized production builds. The app showcases the school's website with sections for hero, about, admissions, and contact, featuring responsive design, accessibility, and smooth animations. It uses modern React practices like custom hooks, PropTypes for validation, and centralized data management.

## Project Structure
The project is organized as follows:

### Root Directory
- `package.json`: Defines dependencies (e.g., React, Vite, DOMPurify), scripts (dev, build, preview), and project metadata.
- `vite.config.js`: Vite configuration for build optimization, plugins, and server settings.
- `index.html`: Entry HTML file with meta tags, title, and root div for React mounting.
- `README.md`: General project documentation (if present).
- `explanation.md`: This file, explaining the project.

### src/ Directory (Source Code)
- `main.jsx`: Entry point that renders the App component wrapped in React.StrictMode and ErrorBoundary for resilience.
- `App.jsx`: Main component managing global state (intro animation, scroll detection, section visibility) and rendering sections.
- `App.css`: Global styles for the App component.
- `index.css`: Main stylesheet with global styles, animations, media queries, and component-specific styles.

#### src/components/ Directory (Reusable Components)
- `Header.jsx`: Fixed header with logo, school name, navigation menu, and dynamic theming based on scroll/section.
- `Hero.jsx`: Hero section with background video, title, description, and call-to-action button.
- `About.jsx`: About section using ExpandingGrid for interactive content display.
- `ExpandingGrid.jsx`: Interactive grid component for showcasing items with expand/collapse functionality.
- `Admissions.jsx`: Admissions section with ScrollStack for stacked panels on scroll.
- `Contact.jsx`: Contact form with validation, map embed, and info display.
- `Footer.jsx`: Site footer with links, social media, and branding.
- `ErrorBoundary.jsx`: Catches JavaScript errors in the component tree and displays a fallback UI.
- `siteData.js`: Centralized data file containing content for sections (e.g., admissions panels, contact info) for easy maintenance.
- `index.css`: Shared styles for components.

#### src/hooks/ Directory (Custom Hooks)
- `useScroll.js`: Hook to detect scroll position and return isScrolled state.
- `useSectionInView.js`: Hook using Intersection Observer to detect if sections are in view.

### public/ Directory (Static Assets)
- `index.html`: Served as the base HTML.
- `images/`: Logo, background, slider images, school campus photo.
- `videos/`: School tour video for hero section.

### node_modules/ Directory
- Contains installed dependencies (auto-generated).

## Component Usage and Locations
- **App.jsx** (src/): Root component, handles intro animation, scroll state, and renders all sections. Uses custom hooks for scroll and inView detection.
- **Header.jsx** (src/components/): Top navigation bar. Logo clicks scroll to top. School name visible only at home. Hamburger menu for mobile.
- **Hero.jsx** (src/components/): Full-screen intro with video background, text, and CTA button.
- **About.jsx** (src/components/): Displays expandable grid of school features (e.g., history, vision).
- **ExpandingGrid.jsx** (src/components/): Grid that expands items on click, with keyboard navigation.
- **Admissions.jsx** (src/components/): Stacked panels showing admission process steps, animated on scroll.
- **Contact.jsx** (src/components/): Form for inquiries, with validation and map.
- **Footer.jsx** (src/components/): Links and social media.
- **ErrorBoundary.jsx** (src/components/): Wraps app to handle errors gracefully.
- **siteData.js** (src/components/): Exports objects for content (e.g., admissionsData array).

## Key Features
- **Responsive Design**: Mobile-first with media queries for tablets/desktops.
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, skip links (removed per user request).
- **Animations**: Intro fade-in, scroll-based stacking, smooth scrolling.
- **Security**: DOMPurify for sanitizing HTML in ExpandingGrid.
- **Performance**: Custom hooks for efficient scroll/inView detection, lazy loading considerations.
- **Maintainability**: JSDoc comments, PropTypes, modular structure.

## How to Run
1. Ensure Node.js is installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start development server (usually at http://localhost:5173).
4. Run `npm run build` for production build.
5. Run `npm run preview` to preview build locally.

## Technologies Used
- **React**: UI library with hooks and components.
- **Vite**: Build tool for fast development.
- **CSS**: Custom styles with variables for theming.
- **JavaScript**: ES6+ features.
- **Libraries**: react-intersection-observer for inView, DOMPurify for security.

## Notes
- The app is a single-page application with hash-based navigation.
- Data is centralized in siteData.js for easy updates.
- Removed unnecessary files (e.g., unused components) during refactoring.
- All files have comprehensive comments for readability.

This explanation should help anyone understand the project's structure, components, and how to work with it.
