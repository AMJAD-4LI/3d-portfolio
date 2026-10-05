import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ExternalLink, Eye, Sparkles } from 'lucide-react';

export const Projects = () => {
  const { theme, t } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsList = [
    {
      id: 'tikpro',
      title: 'TikPro — TikTok Downloader',
      category: 'Desktop & Web Tool',
      icon: '🎵',
      color: '#00f0ff',
      image: '/tikpro.png',
      shortDesc: 'A modern TikTok video downloader designed to provide a simple and fast way to download TikTok content with a clean user experience.',
      fullDescription: 'TikPro is a modern TikTok video downloader designed to provide a simple and fast way to download TikTok content. The application focuses on a clean user experience, smooth downloading and a professional interface.',
      features: [
        'Fast & Smooth TikTok Video Downloading',
        'Clean & Professional Interface',
        'yt-dlp & FFmpeg Media Processing',
        'SQLite & Cryptography Data Protection',
        'REST API & JSON Communication',
        'PyInstaller Packaged Application'
      ],
      tech: ['Python', 'PyQt6', 'yt-dlp', 'FFmpeg', 'REST API', 'JSON', 'SQLite', 'Cryptography', 'PyInstaller'],
      github: 'https://github.com/AMJAD-4LI',
      liveDemo: 'https://tikpro-ten.vercel.app/'
    },
    {
      id: 'aidpak-web',
      title: 'AidPak — First Aid Emergency Information System',
      category: 'Web Application',
      icon: '🚑',
      color: '#10b981',
      image: '/aidpak.png',
      shortDesc: 'AidPak is a responsive First Aid Emergency Information System that provides clear, step-by-step first aid guidance for different emergencies, with a complete admin panel for managing emergency information and categories.',
      fullDescription: 'AidPak is a responsive First Aid Emergency Information System that provides clear, step-by-step first aid guidance for different emergencies, with a complete admin panel for managing emergency information and categories.',
      features: [
        'Emergency information and first-aid instructions',
        'Category browsing',
        'Emergency search',
        'Detailed emergency pages',
        'Admin authentication',
        'Admin dashboard',
        'Add, edit and delete emergencies',
        'Category management',
        'Responsive design'
      ],
      tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'PHP', 'MySQL', 'XAMPP'],
      github: 'https://github.com/AMJAD-4LI/AidPak-Web',
      liveDemo: null
    },
    {
      id: 'ali-portfolio',
      title: 'Ali Portfolio',
      category: 'Portfolio Web App',
      icon: '⚡',
      color: '#7000ff',
      image: '/portfolio.png',
      shortDesc: 'Official personal developer portfolio showcasing web engineering projects and skills.',
      fullDescription: 'Personal developer portfolio created by Ali to present authentic web development projects, technical stack mastery, and contact channels.',
      features: ['3D WebGL visuals & theme engine', 'Multi-language support', 'Fast Vercel cloud hosting', 'Responsive mobile layout'],
      tech: ['React', 'JavaScript', 'Three.js', 'CSS', 'HTML', 'GitHub'],
      github: 'https://github.com/AMJAD-4LI',
      liveDemo: 'https://amjad-ali-portfolio.vercel.app/'
    }
  ];

  return (
    <section
      id="projects"
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
            <Rocket size={14} />
            <span>{t.projects?.badge || '03 // FEATURED PROJECTS'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800
            }}
          >
            {t.projects?.title || 'Featured Web Projects'}
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '12px auto 0' }}>
            {t.projects?.sub || 'Actual web applications and code repositories built by Ali.'}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            perspective: '1000px'
          }}
        >
          {projectsList.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
                boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${proj.color}50`
              }}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor-text="PREVIEW"
              onClick={() => {
                soundFx.playClick();
                setSelectedProject(proj);
              }}
              className="neo-card"
              style={{
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: `1.5px solid ${proj.color}50`,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div>
                {/* Card Thumbnail / Graphic Header */}
                <div
                  style={{
                    height: '190px',
                    borderRadius: '18px',
                    background: `linear-gradient(135deg, ${proj.color}25, rgba(0,0,0,0.8))`,
                    border: `1px solid ${proj.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                    marginBottom: '20px',
                    boxShadow: `inset 0 0 25px ${proj.color}30`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {proj.image ? (
                    <motion.img
                      src={proj.image}
                      alt={proj.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <span>{proj.icon}</span>
                  )}
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      fontSize: '0.7rem',
                      color: '#ffffff',
                      background: 'rgba(5,7,13,0.85)',
                      backdropFilter: 'blur(6px)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      border: `1px solid ${proj.color}60`
                    }}
                  >
                    VERIFIED PROJECT
                  </span>
                </div>

                {/* Title & Category */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginBottom: '10px'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>{proj.title}</h3>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.7rem',
                      color: proj.color,
                      padding: '3px 10px',
                      borderRadius: '10px',
                      background: `${proj.color}15`,
                      border: `1px solid ${proj.color}30`,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {proj.category}
                  </span>
                </div>

                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {proj.shortDesc}
                </p>
              </div>

              {/* Tech Pills & Action Buttons */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        fontSize: '0.73rem',
                        color: '#d1d5db',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="neo-button"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '11px',
                      fontSize: '0.85rem',
                      background: `linear-gradient(135deg, ${proj.color}, ${theme.secondary})`,
                      color: '#05070d',
                      border: 'none',
                      boxShadow: `0 0 15px ${proj.color}60`
                    }}
                  >
                    <Eye size={16} />
                    <span>EXPLORE PROJECT</span>
                  </button>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                      }}
                      className="glass-button"
                      style={{
                        padding: '11px 14px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${proj.color}60`,
                        color: proj.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Open GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}

                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                      }}
                      className="glass-button"
                      style={{
                        padding: '11px 14px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${proj.color}60`,
                        color: proj.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Open Live App"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

