import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Atom } from 'react-loading-indicators';
import { User, Lock, Mail, ArrowRight, ChevronLeft, Radio } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const minLoadTime = (startTime) => {
    const elapsed = Date.now() - startTime;
    const minTime = 2500;
    return new Promise(resolve => setTimeout(resolve, Math.max(0, minTime - elapsed)));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: formData.username,
        password: formData.password,
      });
      await minLoadTime(startTime);
      if (response.data === 'Login successful') {
        try {
          const userResponse = await axios.get(`http://localhost:8080/auth/user/${formData.username}`);
          onLogin(userResponse.data);
        } catch {
          onLogin({ username: formData.username, id: Date.now() });
        }
      } else {
        setError(response.data);
      }
    } catch {
      await minLoadTime(startTime);
      setError('Connection failed. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();
    try {
      const res = await axios.post('http://localhost:8080/auth/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: 'USER',
      });
      await minLoadTime(startTime);
      onLogin(res.data);
    } catch {
      await minLoadTime(startTime);
      setError('Registration failed. Username or email may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}>
        <Atom color="var(--cyan)" size="medium" />
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            color: 'var(--text-3)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Authenticating...
        </motion.p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
          top: '-15%',
          left: '60%',
          animation: 'float-orb 22s ease-in-out infinite',
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

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 400, padding: '0 24px' }}>
        <motion.button
          whileHover={{ x: -2 }}
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: 'var(--text-3)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 40,
            letterSpacing: '0.02em',
            transition: 'color var(--transition)',
          }}
        >
          <ChevronLeft size={15} /> Back
        </motion.button>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
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
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: 6 }}>
            {isRegistering ? 'Create account' : 'Welcome back'}
          </h1>
          <p style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>
            {isRegistering
              ? 'Fill in your details to get started.'
              : 'Sign in to continue to your account.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                background: 'var(--red-dim)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: 'var(--red)',
                padding: '11px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegistering ? 'register' : 'login'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {isRegistering && (
                <FieldWrapper icon={<Mail size={16} />}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </FieldWrapper>
              )}
              <FieldWrapper icon={<User size={16} />}>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </FieldWrapper>
              <FieldWrapper icon={<Lock size={16} />}>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </FieldWrapper>
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01, boxShadow: '0 0 24px rgba(34,211,238,0.18)' }}
            whileTap={{ scale: 0.99 }}
            style={{
              width: '100%',
              marginTop: 20,
              padding: '14px',
              background: 'var(--cyan)',
              color: '#0a0a0f',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all var(--transition)',
            }}
          >
            {isRegistering ? 'Create account' : 'Sign in'} <ArrowRight size={16} />
          </motion.button>
        </form>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-3)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'color var(--transition)',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
          >
            {isRegistering
              ? 'Already have an account? Sign in'
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

const FieldWrapper = ({ icon, children }) => (
  <div style={{ position: 'relative' }}>
    <div style={{
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-3)',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {icon}
    </div>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '13px 14px 13px 44px',
  background: 'var(--surface-1)',
  border: '1px solid var(--border-2)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-1)',
  fontSize: '0.9rem',
  transition: 'border-color 0.2s',
};

export default Login;
