import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Database, Share2, Layers, ArrowRight, Radio } from 'lucide-react';

const features = [
  {
    icon: <Zap size={20} />,
    title: 'Real-time Messaging',
    desc: 'WebSocket-powered communication delivers messages instantly with zero perceptible delay.',
    color: '#22d3ee',
  },
  {
    icon: <Layers size={20} />,
    title: 'Spring Boot',
    desc: 'Production-grade Java backend with robust layered architecture and enterprise stability.',
    color: '#10b981',
  },
  {
    icon: <Database size={20} />,
    title: 'MongoDB',
    desc: 'Scalable NoSQL persistence layer with flexible document storage for fast message retrieval.',
    color: '#3b82f6',
  },
  {
    icon: <Share2 size={20} />,
    title: 'STOMP Protocol',
    desc: 'Industry-standard messaging over WebSocket for reliable bidirectional communication.',
    color: '#f59e0b',
  },
];

const mockMessages = [
  { user: 'alex', msg: 'Just created this room. You there?', side: 'left' },
  { user: 'you', msg: 'Yeah, just joined. This is fast!', side: 'right' },
  { user: 'alex', msg: 'WebSockets — instant delivery', side: 'left' },
  { user: 'you', msg: 'Love the clean UI', side: 'right' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnterSystem = () => {
    sessionStorage.setItem('has_visited_landing', 'true');
    navigate('/login');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-0)',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          top: '-20%',
          right: '-15%',
          animation: 'float-orb 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-12%',
          animation: 'float-orb 25s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 0',
          borderBottom: '1px solid var(--border-1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(34,211,238,0.2)',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Radio size={16} color="var(--cyan)" />
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>cXat</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnterSystem}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              padding: '9px 22px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all var(--transition)',
            }}
          >
            Sign in <ArrowRight size={14} />
          </motion.button>
        </nav>

        <section style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 0 60px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(34,211,238,0.18)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 44,
            }}>
              <div style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: 'var(--green)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Live — All systems operational
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: 'var(--text-1)',
              marginBottom: 28,
            }}>
              Chat that
              <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan) 0%, var(--blue) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                just works.
              </span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-2)',
              maxWidth: 500,
              margin: '0 auto 52px',
              lineHeight: 1.7,
            }}>
              Instant, private chat rooms powered by real-time WebSocket messaging.
              Create a room and share the code — that's it.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(34,211,238,0.22)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterSystem}
                style={{
                  background: 'var(--cyan)',
                  color: '#0a0a0f',
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                  border: 'none',
                }}
              >
                Get started <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, borderColor: 'var(--border-3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterSystem}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-2)',
                  color: 'var(--text-2)',
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                }}
              >
                See demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              marginTop: 80,
              width: '100%',
              maxWidth: 760,
              background: 'var(--bg-1)',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-xl)',
              padding: 3,
              boxShadow: '0 48px 96px rgba(0,0,0,0.55)',
            }}
          >
            <div style={{ background: 'var(--bg-2)', borderRadius: 22, overflow: 'hidden' }}>
              <div style={{
                background: 'var(--bg-1)',
                borderBottom: '1px solid var(--border-1)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
                <span style={{ marginLeft: 14, fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'monospace' }}>
                  channel #4827
                </span>
              </div>
              <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {mockMessages.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: item.side === 'right' ? 'flex-end' : 'flex-start',
                    animation: 'fade-in 0.4s ease forwards',
                    animationDelay: `${i * 0.12 + 0.6}s`,
                    opacity: 0,
                  }}>
                    <div style={{
                      maxWidth: '68%',
                      background: item.side === 'right'
                        ? 'rgba(34,211,238,0.10)'
                        : 'var(--surface-1)',
                      border: `1px solid ${item.side === 'right' ? 'rgba(34,211,238,0.18)' : 'var(--border-1)'}`,
                      borderRadius: item.side === 'right'
                        ? '16px 4px 16px 16px'
                        : '4px 16px 16px 16px',
                      padding: '10px 16px',
                    }}>
                      {item.side === 'left' && (
                        <div style={{ fontSize: '0.65rem', color: 'var(--cyan)', fontWeight: 700, marginBottom: 5, letterSpacing: '0.06em' }}>
                          {item.user}
                        </div>
                      )}
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-1)' }}>{item.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section style={{ padding: '60px 0 120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-1)',
              marginBottom: 12,
            }}>
              Built on solid foundations
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '1rem', maxWidth: 420, margin: '0 auto' }}>
              Every layer of the stack chosen for reliability and performance.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border-1)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 24px',
                  transition: 'all var(--transition)',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 42, height: 42,
                  borderRadius: 10,
                  background: f.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color,
                  marginBottom: 18,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer style={{
          borderTop: '1px solid var(--border-1)',
          padding: '28px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Radio size={13} color="var(--text-4)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>cXat © 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>All systems operational</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
