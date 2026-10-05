import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { Terminal, Zap, ShieldAlert, Play, Cpu } from 'lucide-react';

export const SplashScreen = ({ onComplete }) => {
  const { theme, t } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 4;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Keyboard "Enter" key listener to enter portfolio instantly!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        soundFx.playSuccess();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const handleEnter = () => {
    soundFx.playSuccess();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#05070d',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* 404 System Matrix Background Grid */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, rgba(239, 68, 68, 0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulseGlow 3s infinite ease-in-out',
          pointerEvents: 'none'
        }}
      />

      {/* Futuristic 404 Card */}
      <div
        className="neo-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '36px',
          borderRadius: '32px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          background: '#090d1a',
          border: '1.5px solid #00f0ff',
          boxShadow: '0 0 50px rgba(0,240,255,0.4), 12px 12px 35px rgba(0,0,0,0.9)'
        }}
      >
        {/* 404 Diagnostic Header Badge */}
        <div
          className="mono"
          style={{
            fontSize: '0.75rem',
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            padding: '4px 14px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          <Zap size={14} className="animate-spin-slow" />
          <span>404 // DEVELOPER FOUND</span>
        </div>

        {/* Profile Image with 404 Holographic Neon Ring */}
        <div
          style={{
            position: 'relative',
            width: '110px',
            height: '110px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            padding: '4px',
            background: 'linear-gradient(135deg, #00f0ff, #ef4444, #7000ff)',
            boxShadow: '0 0 30px rgba(0,240,255,0.6)'
          }}
        >
          <img
            src="/profile.png"
            alt="Ali"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              background: '#0a0b10'
            }}
            onError={(e) => {
              // Fallback if image isn't loaded yet
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3rem',
            fontWeight: 900,
            letterSpacing: '0.05em',
            marginBottom: '4px',
            background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 50%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ALI
        </h1>

        <p className="mono" style={{ fontSize: '0.82rem', color: '#00f0ff', marginBottom: '24px', letterSpacing: '0.08em' }}>
          ERROR → HUMAN_CREATIVITY_DETECTED
        </p>

        {/* Progress Bar & Loader */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span style={{ color: '#9ca3af' }}>{t.splash?.status || '404 // INITIALIZING SYSTEM...'}</span>
            <span style={{ color: '#00f0ff', fontWeight: 700 }}>{progress}%</span>
          </div>

          <div
            style={{
              height: '10px',
              width: '100%',
              backgroundColor: '#05070d',
              borderRadius: '20px',
              padding: '2px',
              boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.9), inset -4px -4px 8px rgba(255,255,255,0.02)'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00f0ff, #ef4444, #7000ff)',
                borderRadius: '20px',
                boxShadow: '0 0 20px rgba(0,240,255,0.9)'
              }}
            />
          </div>
        </div>

        {/* Enter Button (Click or Keyboard ENTER) */}
        <motion.button
          onClick={handleEnter}
          onMouseEnter={() => soundFx.playHover()}
          className="neo-button"
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '18px',
            fontSize: '0.95rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: '#05070d',
            background: 'linear-gradient(135deg, #00f0ff, #3b82f6)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 0 30px rgba(0,240,255,0.6)'
          }}
        >
          <Play size={18} fill="#05070d" />
          <span>{t.splash?.enter || 'ENTER PORTFOLIO (PRESS ENTER)'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
