import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export const Footer = () => {
  const { theme } = useTheme();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '40px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(5, 7, 13, 0.9)'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        {/* Brand & Copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/logo.png"
            alt="Ali Logo"
            style={{
              height: '32px',
              maxWidth: '140px',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 8px ${theme.glow})`
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
              Ali — Full Stack Web Developer
            </div>
            <div className="mono" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              © {new Date().getFullYear()} All Rights Reserved. Built with 3D & Clean Code.
            </div>
          </div>
        </div>

        {/* Local Time Indicator */}
        <div
          className="glass-panel"
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span style={{ color: '#9ca3af' }}>PAKISTAN (PKT): </span>
          <span style={{ color: theme.primary, fontWeight: 700 }}>{time || '12:00:00 AM'}</span>
        </div>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHover()}
          data-cursor-text="TOP"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 0 15px ${theme.glow}`,
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};
