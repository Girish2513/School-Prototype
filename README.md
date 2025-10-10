# Navodaya High School Website

A modern, responsive single-page application (SPA) built with React and Vite for Navodaya High School. This project showcases the school's website with engaging sections for hero introduction, about the school, admissions process, and contact information. It emphasizes accessibility, performance, and maintainability through modular components, custom hooks, and comprehensive documentation.

## Features
- **Responsive Design**: Mobile-first layout with hamburger menu, media queries, and adaptive components.
- **Smooth Animations**: Intro fade-in, scroll-based stacking panels, and smooth navigation.
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, and screen reader support.
- **Error Handling**: Global ErrorBoundary to gracefully handle runtime errors.
- **Form Validation**: Client-side validation for contact form with user feedback.
- **Performance Optimized**: Fast Vite builds, lazy loading considerations, and efficient hooks for scroll/inView detection.
- **Centralized Content**: Data managed in `siteData.js` for easy updates.
- **Security**: DOMPurify for sanitizing user-generated content.

## Prerequisites
- Node.js (version 18 or higher) and npm (version 9 or higher).
- Git for version control.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/Girish2513/School-Prototype.git
   cd navodaya-react-app
   ```
2. Install dependencies:
   ```
   npm install
   ```
   This installs all required packages listed in `package.json`. For a detailed list, see [DEPENDENCIES.md](DEPENDENCIES.md).

## Running the Application
### Development Mode
Start the development server with hot reloading:
```
npm run dev
```
- The app will be available at `http://localhost:5173` (or another port if 5173 is in use).
- Changes to source files will automatically reload the browser.

### Building for Production
Create an optimized production build:
```
npm run build
```
- Outputs static files to the `dist/` directory.
- Suitable for deployment to hosting services like Vercel, Netlify, or GitHub Pages.

### Previewing the Build
Serve the production build locally:
```
npm run preview
```
- Access at `http://localhost:4173` (or similar).

### Linting
Run ESLint to check code quality:
```
npm run lint
```

## Project Structure
- **src/**: Source code.
  - **components/**: Reusable UI components (e.g., Header, Hero, About).
  - **hooks/**: Custom React hooks (e.g., useScroll, useSectionInView).
  - **App.jsx**: Root component.
  - **main.jsx**: Entry point.
- **public/**: Static assets (images, videos).
- **explanation.md**: Detailed project overview, component usage, and architecture.
- **DEPENDENCIES.md**: Key dependencies and notes.

For a deeper dive, refer to [explanation.md](explanation.md).

## Deployment
1. Build the project: `npm run build`.
2. Deploy the `dist/` folder to a static hosting service:
   - **Vercel**: Connect GitHub repo for automatic deploys.
   - **Netlify**: Drag-and-drop `dist/` or connect repo.
   - **GitHub Pages**: Use `gh-pages` branch or Actions workflow.
3. Ensure the base URL is configured in `vite.config.js` if deploying to a subdirectory.

Example for GitHub Pages:
- Install `gh-pages`: `npm install --save-dev gh-pages`.
- Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`.
- Run `npm run deploy`.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m "Add amazing feature"`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Please adhere to ESLint rules and add tests where applicable. All contributions are welcome!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For questions or issues, open a GitHub issue or contact the maintainer at [your-email@example.com].

---

Built with ❤️ for Navodaya High School. Last updated: [Current Date].
