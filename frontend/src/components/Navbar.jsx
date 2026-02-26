import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, PawPrint } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const hiddenRoutes = ['/', '/login'];
    const isChat = location.pathname.startsWith('/chat');

    // Hide navbar on landing, login, and chat (chat has its own header)
    if (hiddenRoutes.includes(location.pathname) || isChat || !user) {
        return null;
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="global-navbar"
        >
            <div className="navbar-container">
                <div className="nav-brand" onClick={() => navigate('/lobby')}>
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                            rotate: [0, -10, 10, -10, 10, 0],
                            scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                        style={{ background: '#d97736', color: '#000', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PawPrint size={20} />
                    </motion.div>
                    <span className="nav-title">cXat</span>
                </div>

                <div className="nav-actions">
                    <button className="nav-profile-btn" onClick={() => navigate('/profile')}>
                        <div className="nav-avatar">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="nav-username">{user.username}</span>
                    </button>
                    <button className="nav-logout-btn" onClick={onLogout}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
