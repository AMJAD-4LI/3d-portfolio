import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { ALI_SKILLS, TECH_ICONS } from './TechIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

export const Skills = () => {
  const { theme, t } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

  const filteredSkills = activeFilter === 'All'
    ? ALI_SKILLS
    : ALI_SKILLS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="skills"
      style={{
        padding: '90px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge" style={{ margin: '0 auto 16px' }}>
            <Cpu size={14} />
            <span>{t.skills?.badge || '02 // TECH STACK'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            {t.skills?.title || 'Technical Stack'}
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '540px', margin: '12px auto 0', fontSize: '0.95rem' }}>
            {t.skills?.sub || 'Official tools and technologies mastered for web development.'}
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '48px'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor-text={cat}
                style={{
                  background: isActive ? theme.primary : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#05070d' : '#9ca3af',
                  border: `1px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.08)'}`,
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? `0 0 18px ${theme.glow}` : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Clean Official Technology Icons Only Grid */}
        <motion.div
          layout
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '36px 32px',
            maxWidth: '680px',
            margin: '0 auto',
            padding: '20px 0'
          }}
        >
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => {
              const IconComp = TECH_ICONS[skill.key];

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  whileHover={{
                    scale: 1.28,
                    rotate: 6,
                    filter: `drop-shadow(0 0 22px ${theme.primary}) drop-shadow(0 0 12px rgba(255,255,255,0.8))`
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => soundFx.playHover()}
                  data-cursor-text={skill.name}
                  title={skill.name}
                  style={{
                    flex: '0 0 calc(25% - 24px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'filter 0.3s ease'
                  }}
                >
                  {IconComp ? (
                    <IconComp
                      width="58"
                      height="58"
                      style={{
                        width: '58px',
                        height: '58px',
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                      }}
                    />
                  ) : null}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

