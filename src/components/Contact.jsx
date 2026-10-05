import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { GithubIcon, FacebookIcon, TiktokIcon, WhatsappIcon } from './SocialIcons';
import { ContactGlobe3D } from './3D/ContactGlobe3D';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Copy, Check, Sparkles, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const { theme, t } = useTheme();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const emailAddress = 'aliitx502@gmail.com';

  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playSuccess();
    
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-badge" style={{ margin: '0 auto 16px' }}>
            <Mail size={14} />
            <span>{t.contact?.badge || '05 // CONTACT & SOCIAL CHANNELS'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800
            }}
          >
            {t.contact?.title || "Let's Connect & Build Together"}
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '12px auto 0' }}>
            {t.contact?.sub || 'Reach out for freelance web development inquiries.'}
          </p>
        </div>

        {/* 3D Interactive Quantum Globe Preview */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <ContactGlobe3D />
        </div>

        {/* Grid Layout: Contact Details & Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Direct Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neo-card"
            style={{ padding: '36px', borderRadius: '24px' }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              Authentic Contact Channels
            </h3>

            {/* Email Copy Card */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${theme.primary}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color={theme.primary} />
                <div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>EMAIL ADDRESS</div>
                  <div className="mono" style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600 }}>
                    {emailAddress}
                  </div>
                </div>
              </div>

              <button
                onClick={copyEmail}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor-text={copied ? 'COPIED!' : 'COPY'}
                style={{
                  background: copied ? '#10b981' : `${theme.primary}20`,
                  border: `1px solid ${copied ? '#10b981' : theme.primary}`,
                  color: copied ? '#05070d' : theme.primary,
                  padding: '8px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? (t.contact?.copied || 'COPIED!') : (t.contact?.copyEmail || 'COPY')}</span>
              </button>
            </div>

            {/* WhatsApp Link Card */}
            <a
              href="https://wa.me/923211739473"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid #25D36640',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: '#ffffff',
                marginBottom: '28px'
              }}
            >
              <WhatsappIcon size={24} color="#25D366" />
              <div>
                <div className="mono" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>WHATSAPP PHONE</div>
                <div className="mono" style={{ fontSize: '0.95rem', color: '#25D366', fontWeight: 600 }}>
                  03211739473
                </div>
              </div>
            </a>

            {/* Social Network Channels */}
            <div>
              <div className="mono" style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '14px' }}>
                SOCIAL PROFILES:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  { name: 'GitHub', component: <GithubIcon size={18} />, link: 'https://github.com/AMJAD-4LI' },
                  { name: 'TikTok', component: <TiktokIcon size={18} />, link: 'https://www.tiktok.com/@ali.x.coder' },
                  { name: 'Facebook', component: <FacebookIcon size={18} />, link: 'https://www.facebook.com/share/1MbrfQFAMf/' },
                  { name: 'WhatsApp', component: <WhatsappIcon size={18} />, link: 'https://wa.me/923211739473' }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    data-cursor-text={s.name}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = theme.primary;
                      e.currentTarget.style.color = theme.primary;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    {s.component}
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neo-card"
            style={{ padding: '36px', borderRadius: '24px' }}
          >
            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#10b981',
                    color: '#05070d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px #10b981'
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 800 }}>
                  {t.contact?.success || 'Message Transmitted Successfully!'}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {t.contact?.sendMessage || 'Send Message'}
                </h3>

                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
                    {t.contact?.nameLabel || 'YOUR NAME'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>

                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
                    {t.contact?.emailLabel || 'YOUR EMAIL'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>

                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
                    {t.contact?.msgLabel || 'PROJECT DETAILS'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your web development requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundFx.playHover()}
                  className="neo-button"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                >
                  <Send size={18} />
                  <span>{t.contact?.transmit || 'TRANSMIT MESSAGE'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
