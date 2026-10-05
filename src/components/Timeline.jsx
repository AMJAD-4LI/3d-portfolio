import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Compass, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Timeline = () => {
  const { theme, t } = useTheme();

  const journeySteps = [
    {
      year: 'CURRENTLY STUDYING',
      title: '12th Class Student',
      type: 'ACADEMIC EDUCATION',
      location: 'Pakistan',
      desc: 'Currently completing 12th Grade high school education while building web applications & building a freelancing career.',
      highlights: ['Academic Studies', 'Web Application Development', 'Freelancer Career Path'],
      icon: GraduationCap,
      color: theme.primary
    },
    {
      year: 'WEB DEVELOPMENT GRADUATE',
      title: 'Kotsuktan Vertex IT Academy',
      type: 'IT ACADEMY GRADUATE',
      location: 'Pakistan',
      desc: 'Successfully completed Website Development training at Kotsuktan Vertex IT Academy, mastering frontend and backend web engineering.',
      highlights: ['Website Development Course', 'HTML, CSS, JS, PHP & MySQL', 'Git & Version Control'],
      icon: BookOpen,
      color: theme.secondary
    },
    {
      year: 'FREELANCE FOCUS',
      title: 'Independent Freelancer',
      type: 'FREELANCE GOAL',
      location: 'Global Remote',
      desc: 'Focused on delivering high-quality freelance website development services for clients while expanding technical skills.',
      highlights: ['Custom Web Development', 'Clean & Responsive Code', '100% Client Commitment'],
      icon: Compass,
      color: theme.accent
    }
  ];

  return (
    <section
      id="journey"
      style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="section-badge" style={{ margin: '0 auto 16px' }}>
            <Compass size={14} />
            <span>{t.journey?.badge || '04 // EDUCATION & ACADEMIC PATH'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800
            }}
          >
            {t.journey?.title || 'Learning & Student Journey'}
          </h2>
        </div>

        {/* Timeline Path */}
        <div style={{ position: 'relative' }}>
          {/* Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '3px',
              background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
              transform: 'translateX(-50%)',
              boxShadow: `0 0 15px ${theme.glow}`,
              zIndex: 1
            }}
            className="timeline-line"
          />

          {journeySteps.map((step, idx) => {
            const IconComp = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '50px',
                  position: 'relative',
                  zIndex: 2,
                  flexDirection: isEven ? 'row' : 'row-reverse'
                }}
                className="timeline-item"
              >
                {/* Card Side */}
                <div style={{ width: '45%' }} className="timeline-content">
                  <div
                    className="neo-card"
                    onMouseEnter={() => soundFx.playHover()}
                    data-cursor-text={step.year}
                    style={{
                      padding: '28px',
                      borderRadius: '20px',
                      borderLeft: `4px solid ${step.color}`
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: '0.8rem',
                          color: step.color,
                          fontWeight: 700
                        }}
                      >
                        {step.year}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                      {step.title}
                    </h3>

                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {step.desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {step.highlights.map((hl) => (
                        <span
                          key={hl}
                          className="mono"
                          style={{
                            fontSize: '0.72rem',
                            color: '#e5e7eb',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Node Circle */}
                <div
                  style={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#05070d',
                      border: `3px solid ${step.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.color,
                      boxShadow: `0 0 20px ${step.color}`
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                </div>

                <div style={{ width: '45%' }} className="timeline-spacer" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: '20px' !important; }
          .timeline-item { flex-direction: column !important; align-items: flex-start !important; }
          .timeline-content { width: 100% !important; padding-left: 45px !important; }
          .timeline-spacer { display: none !important; }
        }
      `}</style>
    </section>
  );
};
