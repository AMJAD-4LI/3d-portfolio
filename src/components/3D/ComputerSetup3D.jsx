import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Terminal, Cpu, Sparkles, ShieldAlert } from 'lucide-react';
import { TECH_ICONS } from '../TechIcons';

export const ComputerSetup3D = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move handler for smooth 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rotateX = -(mouseY / (height / 2)) * 14;
    const rotateY = (mouseX / (width / 2)) * 18;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        perspective: '1200px',
        padding: '30px 10px'
      }}
    >
      {/* Floating Developer Elements (Particles & Tech Pills) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-15px',
          left: '-20px',
          zIndex: 25,
          background: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          border: `1.5px solid ${theme.primary}`,
          padding: '6px 14px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: `0 0 20px ${theme.glow}`
        }}
      >
        <Code size={14} color={theme.primary} />
        <span className="mono" style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>
          &lt;/ALI_DEV&gt;
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '-25px',
          zIndex: 25,
          background: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #61dafb',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 0 20px rgba(97, 218, 251, 0.4)'
        }}
      >
        {TECH_ICONS.React ? <TECH_ICONS.React width="18" height="18" /> : null}
        <span className="mono" style={{ fontSize: '0.75rem', color: '#61dafb', fontWeight: 700 }}>
          React 3D
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '-30px',
          zIndex: 25,
          background: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #3776ab',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 0 20px rgba(55, 118, 171, 0.4)'
        }}
      >
        {TECH_ICONS.Python ? <TECH_ICONS.Python width="18" height="18" /> : null}
        <span className="mono" style={{ fontSize: '0.75rem', color: '#3776ab', fontWeight: 700 }}>
          Python
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '-20px',
          zIndex: 25,
          background: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #777bb4',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 0 20px rgba(119, 123, 180, 0.4)'
        }}
      >
        {TECH_ICONS.PHP ? <TECH_ICONS.PHP width="18" height="18" /> : null}
        <span className="mono" style={{ fontSize: '0.75rem', color: '#777bb4', fontWeight: 700 }}>
          PHP Web
        </span>
      </motion.div>

      {/* Main 3D Computer Workspace Assembly */}
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Computer Monitor Outer Bezel Casing */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10.5',
            background: 'linear-gradient(145deg, #1f293d, #0b0f19)',
            borderRadius: '22px',
            padding: '16px 18px 22px',
            boxShadow: `
              0 30px 60px rgba(0, 0, 0, 0.9),
              0 0 40px ${theme.glow},
              inset 0 2px 4px rgba(255, 255, 255, 0.15),
              inset 0 -2px 6px rgba(0, 0, 0, 0.8)
            `,
            border: `1.5px solid ${theme.primary}60`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Webcam Notch & Power Sensor Bar */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#0d111a',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            />
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: theme.primary,
                boxShadow: `0 0 8px ${theme.primary}`
              }}
              className="animate-pulse"
            />
          </div>

          {/* Screen Inner Bezel Container */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#04060b',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Screen Top Status Bar */}
            <div
              style={{
                height: '28px',
                background: 'rgba(15, 23, 42, 0.85)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                zIndex: 3
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div className="mono" style={{ color: theme.primary, fontWeight: 700 }}>
                ALI // DEV_WORKSTATION_3D
              </div>
              <div className="mono" style={{ color: '#10b981', fontSize: '0.65rem' }}>
                ● ONLINE
              </div>
            </div>

            {/* Display Screen Canvas showing profile.png naturally inside */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                width: '100%',
                overflow: 'hidden'
              }}
            >
              <img
                src="/profile.png"
                alt="Ali — Developer Workstation"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  filter: 'contrast(1.05) brightness(1.02)'
                }}
              />

              {/* Glass Screen Reflection Layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)',
                  pointerEvents: 'none'
                }}
              />

              {/* CRT Scanline & Grid Effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.18) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none'
                }}
              />

              {/* Screen Corner Futuristic HUD Overlay */}
              <div
                className="mono"
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '10px',
                  fontSize: '0.65rem',
                  color: '#ffffff',
                  background: 'rgba(5, 7, 13, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.primary}50`
                }}
              >
                SYS // VERIFIED_DEV
              </div>

              <div
                className="mono"
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '10px',
                  fontSize: '0.65rem',
                  color: theme.primary,
                  background: 'rgba(5, 7, 13, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.primary}50`
                }}
              >
                404 // REAL PROFILE
              </div>
            </div>
          </div>

          {/* Bottom Monitor Frame Logo Badge */}
          <div
            className="mono"
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.62rem',
              color: theme.primary,
              letterSpacing: '0.15em',
              fontWeight: 800
            }}
          >
            ALI 404 DEV
          </div>
        </div>

        {/* 3D Stand Neck */}
        <div
          style={{
            width: '60px',
            height: '35px',
            background: 'linear-gradient(180deg, #111625, #080b12)',
            borderLeft: '1.5px solid rgba(255,255,255,0.1)',
            borderRight: '1.5px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
            transform: 'translateZ(-10px)'
          }}
        />

        {/* 3D Stand Pedestal Base */}
        <div
          style={{
            width: '200px',
            height: '14px',
            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
            borderRadius: '10px 10px 4px 4px',
            border: `1px solid ${theme.primary}40`,
            boxShadow: `
              0 10px 25px rgba(0, 0, 0, 0.8),
              0 0 25px ${theme.glow}
            `,
            position: 'relative'
          }}
        >
          {/* Base Glow Underlight */}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '10%',
              right: '10%',
              height: '4px',
              background: theme.primary,
              filter: `blur(6px)`,
              opacity: 0.8
            }}
          />
        </div>

        {/* 3D Backlit Mechanical Keyboard Surface */}
        <div
          style={{
            marginTop: '12px',
            width: '320px',
            height: '32px',
            background: 'linear-gradient(145deg, #111827, #030712)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: 'rotateX(55deg) translateZ(10px)',
            boxShadow: `0 15px 30px rgba(0,0,0,0.9), 0 0 20px ${theme.glow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}
        >
          <div
            style={{
              width: '90%',
              height: '70%',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '4px',
              border: `1px solid ${theme.primary}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: '14px',
                  height: '10px',
                  borderRadius: '2px',
                  background: i % 3 === 0 ? `${theme.primary}40` : 'rgba(255,255,255,0.08)',
                  boxShadow: i % 3 === 0 ? `0 0 6px ${theme.primary}` : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
