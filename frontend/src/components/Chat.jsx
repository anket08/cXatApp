import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

const Chat = ({ user, onLogout }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recipient, setRecipient] = useState('');
    const [currentChatInfo, setCurrentChatInfo] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/user/${user.id}/queue/messages`, (message) => {
                const received = JSON.parse(message.body);
                setMessages((prev) => [...prev, received]);
            });
        });

        setStompClient(client);

        return () => {
            if (client) client.disconnect();
        };
    }, [user.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startChat = async () => {
        if (!recipient) return;
        setCurrentChatInfo(recipient);
        try {
            // Fetch history
            // Ideally we resolve recipient username to ID. 
            // For this demo, assuming recipient input IS the ID or logic handled.
            // Backend expects ID string.
            const res = await axios.get(`http://localhost:8080/messages/${user.id}/${recipient}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    const sendMessage = () => {
        if (stompClient && input && currentChatInfo) {
            const message = {
                senderId: user.id.toString(),
                recipientId: currentChatInfo,
                content: input,
                timestamp: new Date()
            };

            stompClient.send("/app/chat", {}, JSON.stringify(message));
            setMessages((prev) => [...prev, message]);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <h3>User: {user.username}</h3>
                <button onClick={onLogout}>Logout</button>
                <div style={{ marginTop: '2em' }}>
                    <h4>Start Chat</h4>
                    <input
                        type="text"
                        placeholder="Recipient ID"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                    <button onClick={startChat} style={{ marginTop: '0.5em', width: '100%' }}>Open Chat</button>
                </div>
            </div>

            <div className="chat-area">
                {currentChatInfo ? (
                    <>
                        <div className="messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.senderId == user.id ? 'sent' : 'received'}`}>
                                    <div style={{ fontSize: '0.7em', opacity: 0.7 }}>
                                        {msg.senderId == user.id ? 'You' : `User ${msg.senderId}`}
                                    </div>
                                    {msg.content}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="input-area">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <p>Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
