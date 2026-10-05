import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { HeroModel3D } from './3D/HeroModel3D';
import { motion } from 'framer-motion';
import { Terminal, Code, Sparkles, MapPin, GraduationCap, ShieldAlert, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const { theme, t } = useTheme();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (y / rect.height) * -18, y: (x / rect.width) * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Fly in from Left (-90px) */}
        <motion.div
          initial={{ opacity: 0, x: -90, rotateY: -8 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 404 Badge Header */}
          <div className="section-badge">
            <ShieldAlert size={14} className="animate-spin-slow" color="#ef4444" />
            <span>{t.hero?.systemBadge || '404 // DEVELOPER FOUND'}</span>
          </div>

          {/* Profile Image & Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
            <div
              style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                padding: '3px',
                background: `linear-gradient(135deg, ${theme.primary}, #ef4444, ${theme.secondary})`,
                boxShadow: `0 0 25px ${theme.glow}`
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
              />
            </div>

            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                  lineHeight: 1.05,
                  fontWeight: 900
                }}
              >
                {t.hero?.title || "I'M ALI"}
              </h1>
              <div className="mono" style={{ color: theme.primary, fontSize: '0.9rem', fontWeight: 700 }}>
                {t.hero?.age || 'Age: 17'} | {t.hero?.status || 'Freelancer & Student'}
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <h2
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            {t.hero?.subtitle || 'WEBSITE DEVELOPER & FREELANCER'}
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#9ca3af',
              maxWidth: '540px',
              marginBottom: '28px',
              lineHeight: 1.7
            }}
          >
            {t.hero?.tagline || 'Currently studying in 12th Class & building modern web applications. Certified learner at Kotsuktan Vertex IT Academy.'}
          </p>

          {/* Metadata Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '32px'
            }}
          >
            <div
              className="neo-card"
              style={{
                padding: '8px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem'
              }}
            >
              <GraduationCap size={16} color={theme.primary} />
              <span>Institute: <strong>Kotsuktan Vertex IT Academy</strong></span>
            </div>

            <div
              className="neo-card"
              style={{
                padding: '8px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem'
              }}
            >
              <Code size={16} color="#ef4444" />
              <span>Status: <strong>12th Class Student</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a
              href="#projects"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="neo-button"
              data-cursor-text="PROJECTS"
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              <span>{t.hero?.explore || 'EXPLORE 3D PROJECTS'}</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-button glass-button-secondary"
              data-cursor-text="CONTACT"
              style={{ padding: '14px 24px', fontSize: '0.95rem' }}
            >
              <span>{t.hero?.contactBtn || 'CONTACT ME'}</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Fly in from Right (90px) */}
        <motion.div
          initial={{ opacity: 0, x: 90, rotateY: 8 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          {/* Interactive 3D Model */}
          <div style={{ marginBottom: '-30px', position: 'relative', zIndex: 2 }}>
            <HeroModel3D />
          </div>

          <div
            className="neo-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              padding: '24px',
              borderRadius: '24px',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.1s ease-out',
              border: `1.5px solid ${theme.primary}`,
              boxShadow: `0 20px 50px ${theme.glow}`
            }}
          >
            {/* Window Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <div className="mono" style={{ fontSize: '0.75rem', color: theme.primary }}>
                404_developer_profile.json
              </div>
            </div>

            {/* Real Code Snippet */}
            <pre
              className="mono"
              style={{
                fontSize: '0.82rem',
                color: '#e5e7eb',
                lineHeight: 1.6,
                overflowX: 'auto',
                whiteSpace: 'pre-wrap'
              }}
            >
              &#123;
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"name"</span>: <span style={{ color: '#f59e0b' }}>"Ali"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"age"</span>: <span style={{ color: '#10b981' }}>17</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"profession"</span>: <span style={{ color: '#f59e0b' }}>"Website Developer / Freelancer"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"education"</span>: <span style={{ color: '#f59e0b' }}>"12th Class Student"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"institute"</span>: <span style={{ color: '#f59e0b' }}>"Kotsuktan Vertex IT Academy"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"formal_job_history"</span>: <span style={{ color: '#ef4444' }}>null</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: theme.primary }}>"status"</span>: <span style={{ color: '#00f0ff' }}>"404 // FREELANCER_READY"</span>
              <br />
              &#125;
            </pre>

            {/* Terminal Live Status */}
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px dashed rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div className="mono" style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} />
                <span>404 // OPERATIONAL</span>
              </div>
              <span className="mono" style={{ fontSize: '0.75rem', color: theme.primary }}>
                KOTSUKTAN GRADUATE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
