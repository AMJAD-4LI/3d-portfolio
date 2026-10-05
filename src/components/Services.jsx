import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audio';
import { motion } from 'framer-motion';
import { Wrench, Globe, Server, Code, Database, Cpu, Layers, Shield, ArrowUpRight } from 'lucide-react';

export const Services = () => {
  const { theme } = useTheme();

  const servicesList = [
    {
      title: 'Website Development',
      icon: '🌐',
      category: 'Frontend & UI',
      desc: 'Custom responsive websites crafted with clean HTML5, CSS3, JavaScript, React & Bootstrap.',
      features: ['SEO-Optimized Code', 'Responsive Mobile Design', 'Fast Page Load Times']
    },
    {
      title: 'Full Stack Development',
      icon: '⚡',
      category: 'End-to-End',
      desc: 'Complete web application engineering connecting modern frontends with powerful backend systems.',
      features: ['React & Laravel Stack', 'Database Integration', 'Scalable Architecture']
    },
    {
      title: 'Laravel Development',
      icon: '🔴',
      category: 'Backend PHP',
      desc: 'Robust Laravel web portals, Eloquent database models, MVC controllers & secure auth systems.',
      features: ['Eloquent ORM Schemas', 'Blade & Inertia.js', 'Role & Permission Controls']
    },
    {
      title: 'Python Development',
      icon: '🐍',
      category: 'Backend & Data',
      desc: 'High-performance Python backends, FastAPI services, automated web scrapers & data processors.',
      features: ['FastAPI & Flask APIs', 'Data Processing Scripts', 'Async IO Performance']
    },
    {
      title: 'React Development',
      icon: '⚛️',
      category: 'Single Page Apps',
      desc: 'Interactive React web apps with custom hooks, state management, dynamic components & 3D canvases.',
      features: ['Modern Component Specs', 'Context API State', 'Smooth Animations']
    },
    {
      title: 'API Development',
      icon: '🔌',
      category: 'REST Services',
      desc: 'Secure RESTful APIs with JSON payloads, JWT authentication, rate limiting & third-party integrations.',
      features: ['JWT Authentication', 'Swagger API Docs', 'Third-Party Webhooks']
    },
    {
      title: 'Database Architecture',
      icon: '🗄️',
      category: 'MySQL & Data',
      desc: 'Relational database design, query optimization, foreign keys, indexing & data security in MySQL.',
      features: ['Optimized SQL Queries', 'Schema Normalization', 'Data Encryption']
    },
    {
      title: 'Custom Web Apps',
      icon: '🚀',
      category: 'Tailored SaaS',
      desc: 'Bespoke web applications built specifically for your business goals, workflows, and growth.',
      features: ['Custom Features', 'Cross-Platform Testing', 'Ongoing Maintenance']
    }
  ];

  return (
    <section
      id="services"
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
            <Wrench size={14} />
            <span>04 // FREELANCE SERVICES</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800
            }}
          >
            Futuristic <span className="gradient-title">Development Services</span>
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '12px auto 0' }}>
            Tailored full stack web solutions engineered for maximum performance, security, and visual wow-factor.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {servicesList.map((svc, idx) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor-text="ORDER"
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Header Icon & Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                      border: `1px solid ${theme.primary}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      boxShadow: `0 0 15px ${theme.glow}`
                    }}
                  >
                    {svc.icon}
                  </div>

                  <span
                    className="mono"
                    style={{
                      fontSize: '0.7rem',
                      color: theme.primary,
                      padding: '4px 10px',
                      borderRadius: '10px',
                      background: `${theme.primary}15`,
                      border: `1px solid ${theme.primary}30`
                    }}
                  >
                    {svc.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                  {svc.title}
                </h3>

                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {svc.desc}
                </p>

                {/* Service Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {svc.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#d1d5db' }}>
                      <span style={{ color: theme.primary }}>▹</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Service CTA */}
              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
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
                <span>REQUEST SERVICE</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
