import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { motion } from 'framer-motion';
import { User, GraduationCap, BookOpen, Sparkles, Terminal, Code } from 'lucide-react';
import { ComputerSetup3D } from './3D/ComputerSetup3D';

export const About = () => {
  const { theme, t } = useTheme();

  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-badge" style={{ margin: '0 auto 16px' }}>
            <User size={14} />
            <span>{t.about?.badge || '01 // REAL PROFILE & BIOGRAPHY'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800
            }}
          >
            {t.about?.title || 'About Ali — 17 Year Old Web Developer'}
          </h2>
        </div>

        {/* Grid Layout: 3D Computer Workstation Setup & Real Bio */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Column 1: Interactive 3D Computer Setup & Profile Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {/* Interactive 3D Computer Monitor displaying profile.png inside */}
            <ComputerSetup3D />

            {/* Clean Profile Badge below 3D Computer Workstation */}
            <div
              className="neo-card"
              style={{
                marginTop: '24px',
                width: '100%',
                maxWidth: '440px',
                padding: '20px 24px',
                borderRadius: '20px',
                textAlign: 'center',
                border: `1.5px solid ${theme.primary}50`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 20px ${theme.glow}`
              }}
            >
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                Ali
              </h3>
              <div className="mono" style={{ color: theme.primary, fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
                Website Developer & Freelancer (Age 17)
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.78rem',
                  color: '#9ca3af',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Terminal size={14} color={theme.primary} />
                <span>KOTSUKTAN VERTEX GRADUATE // 12TH CLASS</span>
              </div>
            </div>
          </motion.div>

          {/* Real Bio Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="neo-card"
            style={{ padding: '36px', borderRadius: '28px' }}
          >
            <h3
              style={{
                fontSize: '1.45rem',
                color: theme.primary,
                marginBottom: '16px',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.5
              }}
            >
              "{t.about?.bio || 'I am Ali, a 17-year-old Website Developer & Freelancer currently studying in the 12th Class. I learned Website Development from Kotsuktan Vertex IT Academy.'}"
            </h3>

            <p style={{ color: '#9ca3af', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '24px' }}>
              {t.about?.journeyDetail || 'I have not worked a formal job because my goal is to become a Freelancer, and I am currently continuing my studies.'}
            </p>

            {/* Authentic Academic Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ padding: '10px', borderRadius: '12px', background: `${theme.primary}20`, color: theme.primary }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700 }}>12th Class Student</h4>
                  <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Currently pursuing 12th Grade high school education.</p>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ padding: '10px', borderRadius: '12px', background: `${theme.secondary}20`, color: theme.secondary }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700 }}>Kotsuktan Vertex IT Academy</h4>
                  <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Learned Website Development & Web Engineering.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
