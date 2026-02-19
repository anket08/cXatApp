import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import { Send, Hash, ChevronLeft, User as UserIcon, Wifi, WifiOff } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const Chat = ({ user, activeRoom: propActiveRoom, onLeaveRoom }) => {
  const { roomId: paramRoomId } = useParams();
  const navigate = useNavigate();
  const activeRoom = propActiveRoom || paramRoomId;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!activeRoom) return;
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    client.debug = null;
    stompClientRef.current = client;

    client.connect({}, () => {
      setIsConnected(true);
      subscriptionRef.current = client.subscribe(`/topic/messages/${activeRoom}`, (msg) => {
        const message = JSON.parse(msg.body);
        setMessages(prev => prev.some(m => m.id === message.id) ? prev : [...prev, message]);
      });
      fetchHistory(activeRoom);
    }, () => setIsConnected(false));

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      if (client && client.connected) client.disconnect();
    };
  }, [activeRoom]);

  const fetchHistory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/chat/messages/${id}`);
      if (Array.isArray(res.data)) setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !isConnected) return;
    const payload = { roomId: parseInt(activeRoom), senderId: user.id, content: input.trim() };
    stompClientRef.current.send('/app/chat', {}, JSON.stringify(payload));
    setInput('');
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 64,
        borderBottom: '1px solid var(--border-1)',
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/lobby')}
            style={{
              width: 34, height: 34,
              background: 'var(--surface-1)',
              border: '1px solid var(--border-1)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-1)'}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{
            width: 1,
            height: 24,
            background: 'var(--border-1)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30,
              borderRadius: 7,
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(34,211,238,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--cyan)',
            }}>
              <Hash size={15} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)' }}>
                Channel {activeRoom}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <div style={{
                  width: 5, height: 5,
                  borderRadius: '50%',
                  background: isConnected ? 'var(--green)' : 'var(--red)',
                  animation: isConnected ? 'pulse-dot 2.5s ease-in-out infinite' : 'none',
                }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontWeight: 500 }}>
                  {isConnected ? 'Connected' : 'Reconnecting...'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-2)' }}>
              {user?.username || 'User'}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-4)' }}>
              ID: {String(user?.id || '').slice(0, 8)}...
            </div>
          </div>
          <div style={{
            width: 34, height: 34,
            borderRadius: 8,
            background: 'var(--surface-2)',
            border: '1px solid var(--border-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-2)',
          }}>
            <UserIcon size={16} />
          </div>
          {isConnected
            ? <Wifi size={16} color="var(--green)" />
            : <WifiOff size={16} color="var(--red)" />}
        </div>
      </header>

      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 5%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        {messages.length === 0 && (
          <div style={{
            margin: 'auto',
            textAlign: 'center',
            color: 'var(--text-4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 52, height: 52,
              borderRadius: 14,
              background: 'var(--surface-1)',
              border: '1px solid var(--border-1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-4)',
            }}>
              <Hash size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-3)', marginBottom: 4 }}>
                Channel {activeRoom}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-4)' }}>
                No messages yet. Start the conversation.
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = String(msg.senderId) === String(user?.id);
          const prevMsg = messages[idx - 1];
          const showSender = !isMe && (!prevMsg || prevMsg.senderId !== msg.senderId);

          return (
            <div
              key={msg.id || idx}
              style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
                marginTop: showSender && !isMe ? 12 : 2,
                animation: 'fade-in 0.2s ease',
              }}
            >
              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                {showSender && !isMe && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontWeight: 600, marginBottom: 4, paddingLeft: 4 }}>
                    {msg.senderId}
                  </div>
                )}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: isMe ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  background: isMe ? 'rgba(34,211,238,0.12)' : 'var(--surface-1)',
                  border: `1px solid ${isMe ? 'rgba(34,211,238,0.18)' : 'var(--border-1)'}`,
                  fontSize: '0.92rem',
                  color: 'var(--text-1)',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
                {msg.createdAt && (
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-4)', marginTop: 3, paddingHorizontal: 4 }}>
                    {formatTime(msg.createdAt)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      <footer style={{
        padding: '16px 5%',
        background: 'rgba(10,10,15,0.6)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-1)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          background: 'var(--surface-1)',
          border: `1px solid ${input ? 'var(--border-3)' : 'var(--border-2)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '4px 4px 4px 16px',
          transition: 'border-color var(--transition)',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          <input
            type="text"
            placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={!isConnected}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: 'var(--text-1)',
              fontSize: '0.92rem',
              padding: '10px 0',
              opacity: isConnected ? 1 : 0.5,
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !isConnected}
            style={{
              width: 40, height: 40,
              borderRadius: 10,
              background: input.trim() && isConnected ? 'var(--cyan)' : 'var(--surface-2)',
              border: 'none',
              color: input.trim() && isConnected ? '#0a0a0f' : 'var(--text-4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && isConnected ? 'pointer' : 'not-allowed',
              transition: 'all var(--transition)',
              flexShrink: 0,
            }}
          >
            <Send size={17} />
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.68rem', color: 'var(--text-4)' }}>
          Press Enter to send
        </div>
      </footer>
    </div>
  );
};

export default Chat;
