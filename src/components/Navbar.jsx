import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, Globe, ChevronDown, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { theme, lang, setLang, t, languages } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: t.nav?.home || 'Home', href: '#hero' },
    { id: 'about', label: t.nav?.about || 'About', href: '#about' },
    { id: 'skills', label: t.nav?.skills || 'Skills', href: '#skills' },
    { id: 'projects', label: t.nav?.projects || 'Projects', href: '#projects' },
    { id: 'journey', label: t.nav?.journey || 'Education', href: '#journey' },
    { id: 'contact', label: t.nav?.contact || 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (currentY > 150 && currentY > lastScrollY && !mobileMenuOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);

      const scrollPos = currentY + window.innerHeight / 3;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const elem = document.getElementById(navItems[i].id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen, navItems]);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    soundFx.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 990,
        padding: scrolled ? '10px 0' : '20px 0',
        transition: 'padding 0.4s ease'
      }}
    >
      <div
        className="neo-card"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '10px 20px',
          borderRadius: scrolled ? '20px' : '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(5, 7, 13, 0.92)' : theme.cardBg,
          border: `1.5px solid ${theme.primary}50`,
          boxShadow: scrolled
            ? `0 12px 35px rgba(0,0,0,0.8), 0 0 25px ${theme.glow}`
            : '10px 10px 30px rgba(0, 0, 0, 0.7), -8px -8px 24px rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Brand Logo: ONLY logo.png */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero', 'hero')}
          onMouseEnter={() => soundFx.playHover()}
          data-cursor-text="HOME"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <img
            src="/logo.png"
            alt="Ali Logo"
            style={{
              height: scrolled ? '38px' : '44px',
              maxWidth: '180px',
              objectFit: 'contain',
              transition: 'height 0.3s ease',
              filter: `drop-shadow(0 0 10px ${theme.glow})`
            }}
          />
        </a>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(0,0,0,0.3)',
            padding: '6px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor-text={item.label}
                style={{
                  position: 'relative',
                  padding: '8px 14px',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'color 0.3s ease',
                  zIndex: 2
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: theme.primary,
                      borderRadius: '18px',
                      opacity: 0.25,
                      boxShadow: `0 0 15px ${theme.glow}`,
                      zIndex: -1
                    }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Multi-Language Selector Dropdown & Hire Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* 10-Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                soundFx.playClick();
                setLangDropdownOpen(!langDropdownOpen);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="neo-button"
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                gap: '6px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${theme.primary}40`
              }}
            >
              <Globe size={14} color={theme.primary} />
              <span>{currentLangObj.flag} {currentLangObj.label}</span>
              <ChevronDown size={14} />
            </button>

            {/* Language Dropdown Menu */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="neo-card"
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    width: '180px',
                    maxHeight: '280px',
                    overflowY: 'auto',
                    padding: '8px',
                    borderRadius: '16px',
                    background: '#090d1a',
                    border: `1.5px solid ${theme.primary}`,
                    boxShadow: `0 10px 30px rgba(0,0,0,0.9), 0 0 20px ${theme.glow}`,
                    zIndex: 9999
                  }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: lang === l.code ? `${theme.primary}20` : 'transparent',
                        border: 'none',
                        color: lang === l.code ? theme.primary : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{l.flag} {l.label}</span>
                      {lang === l.code && <Sparkles size={12} color={theme.primary} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', 'contact')}
            onMouseEnter={() => soundFx.playHover()}
            className="neo-button"
            data-cursor-text="HIRE"
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              color: '#05070d',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              border: 'none',
              boxShadow: `0 0 20px ${theme.glow}`
            }}
          >
            <Send size={14} />
            <span>{t.nav?.hire || 'HIRE ALI'}</span>
          </a>

          {/* Mobile Drawer Toggle Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${theme.primary}50`,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'none',
              padding: '8px',
              borderRadius: '12px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={22} color={theme.primary} /> : <Menu size={22} color={theme.primary} />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="neo-card"
            style={{
              maxWidth: '1240px',
              margin: '12px auto 0',
              padding: '20px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: 'rgba(5, 7, 13, 0.96)',
              border: `1.5px solid ${theme.primary}`
            }}
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  style={{
                    color: isActive ? theme.primary : '#ffffff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 700,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isActive ? `${theme.primary}15` : 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles size={14} color={theme.primary} />}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
};
