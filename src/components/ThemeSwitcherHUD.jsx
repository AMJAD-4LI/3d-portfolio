import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ThemeSwitcherHUD = () => {
  const { theme, themeId, switchTheme, autoCycle, setAutoCycle, soundEnabled, toggleSound, allThemes } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}
    >
      {/* Active Theme Info Tag */}
      <div
        className="glass-panel"
        style={{
          padding: '8px 14px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          boxShadow: `0 0 15px ${theme.glow}`
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: theme.primary,
            boxShadow: `0 0 10px ${theme.primary}`
          }}
          className="animate-pulse"
        />
        <span style={{ color: '#ffffff', fontWeight: 600 }}>{theme.tag}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <span style={{ color: theme.primary }}>{theme.codeBadge}</span>
      </div>

      {/* Control Buttons Panel */}
      <div
        className="glass-panel"
        style={{
          padding: '8px 12px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {/* Theme Selectors */}
        {Object.keys(allThemes).map((key) => {
          const item = allThemes[key];
          const isActive = key === themeId;
          return (
            <button
              key={key}
              onClick={() => switchTheme(key)}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor-text={item.name}
              title={item.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: isActive ? `2px solid ${item.primary}` : '1px solid rgba(255,255,255,0.15)',
                backgroundColor: item.bg,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isActive ? `0 0 15px ${item.glow}` : 'none',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: item.primary
                }}
              />
            </button>
          );
        })}

        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Auto Cycle Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            setAutoCycle(!autoCycle);
          }}
          onMouseEnter={() => soundFx.playHover()}
          title={autoCycle ? 'Auto-cycling themes ON' : 'Auto-cycling themes OFF'}
          data-cursor-text={autoCycle ? 'AUTO: ON' : 'AUTO: OFF'}
          style={{
            background: autoCycle ? `${theme.primary}25` : 'transparent',
            border: `1px solid ${autoCycle ? theme.primary : 'rgba(255,255,255,0.15)'}`,
            color: autoCycle ? theme.primary : '#a1a1aa',
            padding: '6px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <RefreshCw size={14} className={autoCycle ? 'animate-spin-slow' : ''} />
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={() => toggleSound()}
          onMouseEnter={() => soundFx.playHover()}
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          data-cursor-text={soundEnabled ? 'SOUND: ON' : 'MUTED'}
          style={{
            background: soundEnabled ? `${theme.primary}25` : 'transparent',
            border: `1px solid ${soundEnabled ? theme.primary : 'rgba(255,255,255,0.15)'}`,
            color: soundEnabled ? theme.primary : '#a1a1aa',
            padding: '6px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
    </div>
  );
};
