import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Hash, LogOut, User, Radio, ArrowRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lobby = ({ user, onJoinRoom, onLogout }) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/chat/room');
      if (res.data && res.data.id) {
        onJoinRoom(res.data.id);
        navigate(`/chat/${res.data.id}`);
      }
    } catch (err) {
      console.error('Room creation error:', err);
      alert('Could not connect to backend. Make sure the server is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      onJoinRoom(roomId.trim());
      navigate(`/chat/${roomId.trim()}`);
    } else {
      alert('Please enter a valid room code.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-0)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
          animation: 'float-orb 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
      </div>

      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 68,
        borderBottom: '1px solid var(--border-1)',
        background: 'rgba(10,10,15,0.7)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--cyan-dim)',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Radio size={15} color="var(--cyan)" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)', letterSpacing: '-0.02em' }}>cXat</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface-1)',
              border: '1px solid var(--border-1)',
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-1)'}
          >
            <div style={{
              width: 26, height: 26,
              borderRadius: '50%',
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(34,211,238,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--cyan)',
            }}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-2)' }}>
              {user?.username || 'User'}
            </span>
          </button>

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: '1px solid var(--border-1)',
              color: 'var(--text-3)',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--red)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-3)';
              e.currentTarget.style.borderColor = 'var(--border-1)';
            }}
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <main style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: 580 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-1)',
              marginBottom: 8,
            }}>
              Welcome back, {user?.username || 'User'}
            </h1>
            <p style={{ color: 'var(--text-3)', fontSize: '0.95rem' }}>
              Create a new room or join an existing one with a room code.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border-2)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px 28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  background: 'var(--cyan-dim)',
                  border: '1px solid rgba(34,211,238,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cyan)',
                  flexShrink: 0,
                }}>
                  <Plus size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 5 }}>
                    Create a new room
                  </h2>
                  <p style={{ fontSize: '0.87rem', color: 'var(--text-3)', lineHeight: 1.55 }}>
                    Start a fresh private channel. You'll get a 4-digit room code to share with others.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: '0 0 28px rgba(34,211,238,0.15)' }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCreateRoom}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: loading ? 'var(--surface-2)' : 'var(--cyan)',
                  color: loading ? 'var(--text-3)' : '#0a0a0f',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all var(--transition)',
                }}
              >
                {loading ? (
                  <>
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Creating room...
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Create room
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border-1)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px 28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  background: 'var(--blue-dim)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--blue)',
                  flexShrink: 0,
                }}>
                  <Hash size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 5 }}>
                    Join a room
                  </h2>
                  <p style={{ fontSize: '0.87rem', color: 'var(--text-3)', lineHeight: 1.55 }}>
                    Enter the 4-digit room code someone shared with you to join their channel.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  placeholder="Enter room code"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                  style={{
                    flex: 1,
                    padding: '13px 16px',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-1)',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    letterSpacing: '0.08em',
                    transition: 'border-color var(--transition)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--border-3)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-2)'}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinRoom}
                  style={{
                    padding: '13px 20px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-2)',
                    color: 'var(--text-1)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all var(--transition)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Join <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              onClick={() => navigate('/profile')}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border-1)',
                borderRadius: 'var(--radius-xl)',
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
              whileHover={{ borderColor: 'var(--border-2)', y: -2 }}
            >
              <div style={{
                width: 40, height: 40,
                borderRadius: 10,
                background: 'var(--green-dim)',
                border: '1px solid rgba(16,185,129,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--green)',
                flexShrink: 0,
              }}>
                <User size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-1)' }}>Your profile</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: 2 }}>Update username, bio, and settings</div>
              </div>
              <ArrowRight size={16} color="var(--text-4)" />
            </motion.div>
          </div>
        </div>
      </main>

      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '16px 40px',
        borderTop: '1px solid var(--border-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-4)' }}>Connected to server</span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-4)', fontFamily: 'monospace' }}>ws://localhost:8080</span>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Lobby;
