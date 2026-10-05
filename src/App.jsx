import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SplashScreen } from './components/SplashScreen';
import { CustomCursor } from './components/CustomCursor';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { ThemeSwitcherHUD } from './components/ThemeSwitcherHUD';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatePresence } from 'framer-motion';

export function PortfolioContent() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Sci-Fi 404 Scanlines Overlay */}
      <div className="scanlines" />

      {/* Cinematic 404 Opening Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* 3D WebGL Background Canvas */}
      <ThreeBackground />

      {/* 10-Language Glassmorphic / Neomorphic Navbar */}
      <Navbar />

      {/* Floating Theme & Audio Controls HUD */}
      <ThemeSwitcherHUD />

      {/* Main Page Sections with Authentic Profile Data */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
