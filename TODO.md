# TODO: Remove About Us Section Completely

## Tasks
- [x] Remove About component file: `School-Prototype/src/components/About.jsx`
- [x] Remove `aboutSectionsData` from `School-Prototype/src/components/siteData.js`
- [x] Update `School-Prototype/src/App.jsx`:
  - Remove import of About component
  - Remove About section from JSX
  - Remove aboutInViewState and related state/hook
  - Update isLightSectionInView logic to exclude about
- [x] Update `School-Prototype/src/components/Header.jsx`:
  - Remove "About Us" nav item
- [x] Update `School-Prototype/src/components/Footer.jsx`:
  - Remove "About Us" quick link from footerData
