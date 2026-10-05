import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './SocialIcons';
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectModal = ({ project, onClose }) => {
  const { theme, t } = useTheme();

  if (!project) return null;

  const triggerConfetti = () => {
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(14px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={() => {
        soundFx.playClick();
        onClose();
      }}
    >
      <div
        className="neo-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '28px',
          padding: '36px',
          position: 'relative',
          border: `2px solid ${theme.primary}`,
          boxShadow: `0 0 50px ${theme.glow}`
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2.5rem' }}>{project.icon}</span>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800 }}>{project.title}</h2>
            <div className="mono" style={{ color: theme.primary, fontSize: '0.85rem' }}>{project.category}</div>
          </div>
        </div>

        {/* Graphic Banner / Project Image */}
        <div
          style={{
            width: '100%',
            height: '240px',
            borderRadius: '18px',
            background: `linear-gradient(135deg, ${project.color}35, ${theme.bg})`,
            border: `1px solid ${project.color}60`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: `inset 0 0 30px ${project.color}40`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '8px' }}>{project.icon}</div>
              <div className="mono" style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                {project.title} // VERIFIED PROJECT
              </div>
              <div className="mono" style={{ fontSize: '0.75rem', color: theme.primary }}>
                404 // REAL CODEBASE DEPLOYED
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
          {project.fullDescription}
        </p>

        {/* Key Features */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color={theme.primary} />
            <span>Key Features & Details</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {project.features.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '0.9rem' }}>
                <CheckCircle2 size={14} color={theme.primary} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ marginBottom: '32px' }}>
          <h4 className="mono" style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '12px' }}>
            TECHNOLOGY STACK USED:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.8rem',
                  color: '#ffffff'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerConfetti}
              className="neo-button"
              style={{ padding: '12px 28px' }}
            >
              <ExternalLink size={16} />
              <span>{t.projects?.viewLive || 'VIEW LIVE DEMO'}</span>
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="glass-button glass-button-secondary"
              style={{ padding: '12px 24px' }}
            >
              <GithubIcon size={16} />
              <span>{t.projects?.viewGithub || 'VIEW GITHUB REPO'}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
