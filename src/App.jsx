import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  // State to manage the intro animation class
  const [isIntro, setIsIntro] = useState(true);
  
  // State to manage the header scroll class
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect for the intro animation (runs only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);
    
    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  // useEffect for the header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamically apply classes based on state
  const wrapperClassName = isIntro ? 'intro-state' : '';

  return (
    // We apply the intro class to a wrapper div, since we can't directly manipulate the <body> tag in React
    <div className={wrapperClassName}>
      <div className="hero-section">
        <Header isScrolled={isScrolled} />
        <Hero />
      </div>
      <About />
    </div>
  );
}

export default App;