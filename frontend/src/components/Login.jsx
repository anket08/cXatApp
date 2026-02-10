import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username,
                password
            });
            onLogin(response.data);
        } catch (err) {
            setError('Login failed. Please check credentials.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/auth/register', {
                username,
                password,
                email,
                role: 'USER'
            });
            setIsRegistering(false);
            setError('Registration successful! Please login.');
        } catch (err) {
            setError('Registration failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'} to NxChat</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={isRegistering ? handleRegister : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {isRegistering && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => { setIsRegistering(!isRegistering); setError(''); }} style={{ marginTop: '10px', background: 'transparent', border: '1px solid #444' }}>
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </div>
    );
};

export default Login;
