import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { TRANSLATIONS, LANGUAGES } from '../utils/translations';

export const THEMES = {
  cyber: {
    id: 'cyber',
    name: '404 System Cyan',
    tag: '404 // SYSTEM ONLINE',
    primary: '#00f0ff',
    secondary: '#3b82f6',
    accent: '#7000ff',
    bg: '#05070d',
    cardBg: 'rgba(10, 18, 36, 0.75)',
    cardBorder: 'rgba(0, 240, 255, 0.25)',
    glow: 'rgba(0, 240, 255, 0.4)',
    codeBadge: '404_DEVELOPER // ONLINE'
  },
  ai: {
    id: 'ai',
    name: 'Quantum Purple',
    tag: '404 // NEURAL SYNC',
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#6366f1',
    bg: '#0d0714',
    cardBg: 'rgba(22, 12, 38, 0.75)',
    cardBorder: 'rgba(168, 85, 247, 0.25)',
    glow: 'rgba(168, 85, 247, 0.4)',
    codeBadge: 'NEURAL_404 // FOUND'
  },
  developer: {
    id: 'developer',
    name: 'Matrix Emerald',
    tag: '404 // MATRIX MODE',
    primary: '#10b981',
    secondary: '#00ff66',
    accent: '#059669',
    bg: '#041009',
    cardBg: 'rgba(8, 28, 17, 0.75)',
    cardBorder: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.4)',
    codeBadge: 'TERMINAL_404 // READY'
  },
  future: {
    id: 'future',
    name: 'Volcanic Error Red',
    tag: '404 // OVERDRIVE',
    primary: '#ef4444',
    secondary: '#f97316',
    accent: '#dc2626',
    bg: '#110505',
    cardBg: 'rgba(38, 10, 10, 0.75)',
    cardBorder: 'rgba(239, 68, 68, 0.25)',
    glow: 'rgba(239, 68, 68, 0.4)',
    codeBadge: 'CRITICAL_ERROR // 404'
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState('cyber');
  const [autoCycle, setAutoCycle] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lang, setLang] = useState('en');

  const theme = THEMES[themeId] || THEMES.cyber;

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Set document direction for Urdu/Arabic (RTL)
  useEffect(() => {
    document.documentElement.dir = currentLangObj.dir || 'ltr';
    document.documentElement.lang = lang;
  }, [lang, currentLangObj]);

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--bg-color', theme.bg);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--card-border', theme.cardBorder);
    root.style.setProperty('--glow-color', theme.glow);
  }, [themeId]);

  const switchTheme = (newId) => {
    if (THEMES[newId] && newId !== themeId) {
      soundFx.playThemeSwitch();
      setThemeId(newId);
    }
  };

  const toggleSound = () => {
    const state = soundFx.toggleSound();
    setSoundEnabled(state);
  };

  const changeLanguage = (newLang) => {
    soundFx.playClick();
    setLang(newLang);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        switchTheme,
        autoCycle,
        setAutoCycle,
        soundEnabled,
        toggleSound,
        lang,
        setLang: changeLanguage,
        t,
        currentLangObj,
        allThemes: THEMES,
        languages: LANGUAGES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
