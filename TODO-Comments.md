<!-- 
  This is a Markdown file used for tracking the progress of a large-scale commenting task across the entire 'School-Prototype' project.
  The goal is to ensure every part of the codebase is well-documented for future maintenance and understanding.
-->

# TODO: Add Detailed Comments to All Files

This file tracks the progress of adding extensive comments to every function, CSS rule, and almost every line of code in the School-Prototype project.

<!-- 
  The "Completed Files" section is a checklist to mark which files have been fully commented.
  This provides a quick overview of the task's progress.
  To mark a file as complete, change `[ ]` to `[x]`.
-->
## Completed Files
- [ ] TODO-Comments.md (this file)

<!--
  The "Pending Files" section lists all the files that still require commenting.
  It's organized by file type (JSX, CSS, etc.) to make the task more manageable.
-->
## Pending Files

<!-- Core application files that are fundamental to the React app's structure and initialization. -->
### Core JSX Files
- [x] src/App.jsx
- [ ] src/main.jsx

<!-- 
  These are the main page components of the application.
  Each file likely represents a distinct page or a major, complex UI section.
-->
### Component JSX Files
- [ ] src/AdminPage.jsx
- [ ] src/Admissions.jsx
- [ ] src/ExpandingGrid.jsx
- [ ] src/LoginPage.jsx
- [ ] src/PopupBanner.jsx

<!-- 
  Reusable components that are used across different pages.
  These are the building blocks of the user interface.
-->
- [ ] src/components/AboutUs.jsx
- [ ] src/components/Achievements.jsx
- [ ] src/components/Admissions.jsx
- [ ] src/components/Avatar.jsx
- [ ] src/components/Contact.jsx
- [ ] src/components/CountUp.jsx
- [ ] src/components/ErrorBoundary.jsx
- [ ] src/components/ExpandingGrid.jsx
- [ ] src/components/Footer.jsx
- [ ] src/components/Gallery.jsx
- [ ] src/components/Header.jsx
- [ ] src/components/Hero.jsx
- [ ] src/components/HeroStats.jsx
- [ ] src/components/MoonIcon.jsx
- [ ] src/components/ScrollFloat.jsx
- [ ] src/components/SunIcon.jsx
- [ ] src/components/TestimonialCard.jsx
- [ ] src/components/Testimonials.jsx
- [ ] src/components/TextType.jsx
- [ ] src/components/ViewGallery.jsx
- [ ] src/components/WhatsAppButton.jsx

<!-- 
  Files related to state management, custom hooks, and static data.
  - AppContext.jsx: Likely contains React Context for global state.
  - useScroll.js & useSectionInView.js: Custom hooks for UI behavior.
  - siteData.js: A module exporting data used throughout the site (e.g., text, links).
-->
### Context and Hooks
- [ ] src/context/AppContext.jsx
- [ ] src/hooks/useScroll.js
- [ ] src/hooks/useSectionInView.js
- [ ] src/components/siteData.js

<!-- 
  Styling files for the application. Comments here should explain CSS rules, selectors,
  and why certain styles are applied. This includes referencing design elements like
  original headings, text styles, and image names from a design file if applicable.
-->
### CSS Files
- [ ] src/App.css
- [ ] src/AdminPage.css
- [ ] src/Admissions.css
- [ ] src/index.css
- [ ] src/LoginPage.css
- [ ] src/PopupBanner.css
- [ ] src/components/AboutUs.css
- [ ] src/components/Achievements.css
- [ ] src/components/Admissions.css
- [ ] src/components/Contact.css
- [ ] src/components/ErrorBoundary.css
- [ ] src/components/ExpandingGrid.css
- [ ] src/components/Footer.css
- [ ] src/components/Gallery.css
- [ ] src/components/Header.css
- [ ] src/components/Hero.css
- [ ] src/components/HeroStats.css
- [ ] src/components/Testimonials.css
- [ ] src/components/TextType.css
- [ ] src/components/ViewGallery.css
- [ ] src/components/WhatsAppButton.css

<!--
  This section contains guidelines and reminders for the commenting process.
  It ensures consistency and quality across all commented files.
-->
## Notes
- Comments should explain functions, variables, logic, CSS selectors/properties, and references to images/photos.
- Update this file after completing each file by marking [x].
- After all comments are added, test the app with `npm run dev`.
