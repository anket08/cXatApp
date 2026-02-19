import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Save, Lock, FileText, CheckCircle, Radio } from 'lucide-react';

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'Traveler', id: '000', bio: '', gender: 'Unspecified' });
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    gender: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        username: parsed.username || '',
        bio: parsed.bio || '',
        gender: parsed.gender || 'm',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('saving');

    setTimeout(() => {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setSaveStatus('error');
        alert('Passwords do not match!');
        setSaveStatus(null);
        return;
      }

      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setSaveStatus('success');

      setTimeout(() => setSaveStatus(null), 2500);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-0)',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
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
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 68,
        borderBottom: '1px solid var(--border-1)',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

        <button
          onClick={() => navigate('/lobby')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--surface-1)',
            border: '1px solid var(--border-1)',
            color: 'var(--text-2)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.83rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-1)'}
        >
          <ChevronLeft size={15} /> Back to lobby
        </button>
      </header>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 48,
            padding: '28px 28px',
            background: 'var(--bg-1)',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div style={{
              width: 72, height: 72,
              borderRadius: 20,
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(34,211,238,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--cyan)',
              flexShrink: 0,
            }}>
              {user.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: 4 }}>
                {user.username}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-1)',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: '0.72rem',
                  color: 'var(--text-3)',
                  fontFamily: 'monospace',
                }}>
                  {user.id}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>Active</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Section title="Profile" icon={<User size={16} />}>
              <Field label="Username">
                <InputRow icon={<User size={15} />}>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={inputSt}
                  />
                </InputRow>
              </Field>

              <Field label="Bio">
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-3)', pointerEvents: 'none' }}>
                    <FileText size={15} />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="A short bio..."
                    style={{
                      ...inputSt,
                      padding: '12px 14px 12px 42px',
                      resize: 'none',
                      fontFamily: 'inherit',
                      lineHeight: 1.6,
                    }}
                  />
                </div>
              </Field>

              <Field label="Identity">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ ...inputSt, cursor: 'pointer' }}
                >
                  <option value="m" style={{ background: '#0f0f18' }}>Male</option>
                  <option value="f" style={{ background: '#0f0f18' }}>Female</option>
                  <option value="n" style={{ background: '#0f0f18' }}>Non-binary</option>
                  <option value="x" style={{ background: '#0f0f18' }}>Prefer not to say</option>
                </select>
              </Field>
            </Section>

            <Section title="Security" icon={<Lock size={16} />}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="New password">
                  <InputRow icon={<Lock size={15} />}>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      style={inputSt}
                    />
                  </InputRow>
                </Field>
                <Field label="Confirm password">
                  <InputRow icon={<Lock size={15} />}>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      style={inputSt}
                    />
                  </InputRow>
                </Field>
              </div>
            </Section>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(34,211,238,0.12)' }}
                whileTap={{ scale: 0.99 }}
                disabled={saveStatus === 'saving'}
                style={{
                  padding: '13px 32px',
                  background: saveStatus === 'success' ? 'var(--green)' : 'var(--cyan)',
                  color: '#0a0a0f',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all var(--transition)',
                  opacity: saveStatus === 'saving' ? 0.7 : 1,
                }}
              >
                {saveStatus === 'success' ? (
                  <><CheckCircle size={16} /> Saved</>
                ) : saveStatus === 'saving' ? (
                  'Saving...'
                ) : (
                  <><Save size={16} /> Save changes</>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div style={{
    background: 'var(--bg-1)',
    border: '1px solid var(--border-1)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '18px 24px',
      borderBottom: '1px solid var(--border-1)',
      color: 'var(--text-2)',
    }}>
      {icon}
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-2)' }}>{title}</span>
    </div>
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {children}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </label>
    {children}
  </div>
);

const InputRow = ({ icon, children }) => (
  <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }}>
      {icon}
    </div>
    {children}
  </div>
);

const inputSt = {
  width: '100%',
  padding: '12px 14px 12px 42px',
  background: 'var(--surface-1)',
  border: '1px solid var(--border-2)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-1)',
  fontSize: '0.9rem',
  transition: 'border-color 0.2s',
};

export default ProfileDashboard;
