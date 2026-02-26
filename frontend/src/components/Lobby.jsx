import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Link, Zap, User, Crosshair, Settings, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Lobby = ({ user, onJoinRoom, onLogout }) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(false);

    const [recentRooms, setRecentRooms] = useState(() => {
        const saved = localStorage.getItem('cxat_recent_rooms');
        return saved ? JSON.parse(saved) : [];
    });

    const addRecentRoom = (id) => {
        if (!id) return;
        setRecentRooms(prev => {
            const updated = [id, ...prev.filter(r => r !== id)].slice(0, 10);
            localStorage.setItem('cxat_recent_rooms', JSON.stringify(updated));
            return updated;
        });
    };

    const handleCreateRoom = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/chat/room');
            if (res.data && res.data.id) {
                addRecentRoom(res.data.id);
                onJoinRoom(res.data.id);
                navigate(`/chat/${res.data.id}`);
            }
        } catch (err) {
            console.error("Terminal Error:", err);
            alert("Connection Failed. Check if server is running on port 8080.");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinRoom = async () => {
        if (!roomId.trim()) {
            alert("Please enter a valid Frequency ID");
            return;
        }
        try {
            const res = await axios.get(`http://localhost:8080/chat/room/${roomId.trim()}/exists`);
            if (res.data === true) {
                addRecentRoom(roomId.trim());
                onJoinRoom(roomId.trim());
                navigate(`/chat/${roomId.trim()}`);
            } else {
                alert("Room does not exist");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Background elements (Navbar is handled globally in App.jsx) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'var(--bg-base)' }}></div>

            <div style={{ display: 'flex', flex: 1, width: '100%', zIndex: 10 }}>
                {/* Sidebar */}
                <aside className="glass-panel" style={{ width: '280px', margin: '0 0 2rem 2rem', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', position: 'sticky', top: '100px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} color="var(--accent-primary)" /> Recent Channels</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', paddingRight: '8px', scrollbarWidth: 'thin' }}>
                        {recentRooms.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>No recent activity.</p>
                        ) : (
                            recentRooms.map(id => (
                                <button
                                    key={id}
                                    onClick={() => { addRecentRoom(id); onJoinRoom(id); navigate(`/chat/${id}`); }}
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '14px 16px', borderRadius: '12px', color: 'var(--text-main)', textAlign: 'left', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,242,255,0.3)'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
                                >
                                    <span style={{ fontSize: '0.95rem' }}># {id}</span>
                                    <ChevronRight size={16} color="var(--text-muted)" />
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 5% 4rem 5%' }}>

                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Command Center</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Select an operation to begin secure communication.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1100px' }}>

                        {/* Create Room Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'all 0.3s ease' }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(0,242,255,0.3)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-glass)'; }}
                        >
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,242,255,0.1), rgba(0,242,255,0.05))', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(0,242,255,0.2)' }}>
                                <Plus size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>New Channel</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
                                Initialize a new end-to-end encrypted communication channel. Secure coordinates will be generated automatically.
                            </p>
                            <button onClick={handleCreateRoom} disabled={loading} style={{ width: '100%', padding: '16px', background: 'var(--accent-primary)', color: '#000', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,242,255,0.4)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
                            >
                                {loading ? 'INITIALIZING...' : <>CREATE <Crosshair size={18} /></>}
                            </button>
                        </motion.div>

                        {/* Join Room Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'all 0.3s ease' }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(112,0,255,0.3)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(112,0,255,0.2)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-glass)'; }}
                        >
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(112,0,255,0.1), rgba(112,0,255,0.05))', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(112,0,255,0.2)' }}>
                                <Link size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>Join Channel</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                Enter existing channel coordinates to intercept transmissions and join the secure network.
                            </p>
                            <input
                                placeholder="Enter Room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '14px', padding: '16px', color: '#fff', textAlign: 'center', fontSize: '1rem', letterSpacing: '2px', outline: 'none', marginBottom: '12px', transition: 'all 0.3s ease' }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent-secondary)'}
                                onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                            <button onClick={handleJoinRoom} style={{ width: '100%', padding: '16px', background: 'rgba(112,0,255,0.15)', color: 'var(--accent-secondary)', border: '1px solid rgba(112,0,255,0.3)', borderRadius: '14px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-secondary)'; e.currentTarget.style.color = '#fff'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(112,0,255,0.15)'; e.currentTarget.style.color = 'var(--accent-secondary)'; }}
                            >
                                CONNECT
                            </button>
                        </motion.div>

                        {/* Profile Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} onClick={() => navigate('/profile')} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}
                        >
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}>
                                <User size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>Operator Profile</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
                                Access your identity logs, communication stats, and personalize your configuration settings.
                            </p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: '700' }}>
                                CONFIGURE <Settings size={16} />
                            </div>
                        </motion.div>

                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={14} color="var(--success)" /> AES-256 ACTIVE</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={14} color="var(--accent-primary)" /> SYSTEM NOMINAL</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>v2.0.0</div>
            </footer>
        </div>
    );
};

export default Lobby;