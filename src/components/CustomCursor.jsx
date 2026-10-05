import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });

      // Check hover element attributes
      const target = e.target;
      const hoverable = target.closest('a, button, input, textarea, [data-cursor]');
      
      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const render = () => {
      // Smooth lerp for outer ring
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX - 20}px, ${currentY - 20}px, 0) scale(${
          isClicking ? 0.7 : isHovered ? 1.6 : 1
        })`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isClicking]);

  // Hide cursor on touch devices / mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: theme.primary,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          boxShadow: `0 0 10px ${theme.glow}`,
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease'
        }}
      />

      {/* Outer Spring Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: `1.5px solid ${theme.primary}`,
          backgroundColor: isHovered ? `${theme.primary}15` : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.4s ease, background-color 0.4s ease',
          boxShadow: isHovered ? `0 0 20px ${theme.glow}` : 'none'
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '8px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: theme.primary,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
