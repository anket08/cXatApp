import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Terminal, PawPrint, Shield, Zap, GitCommit, GitBranch, Lock, Database, CheckCheck, Clock, Layers } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Animated Line Height based on scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} style={{ background: '#0d1117', color: '#c9d1d9', minHeight: '300vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>

            {/* Navbar area */}
            <nav style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 100, background: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #30363d' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.5rem', color: '#fff' }}>
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
                    cXat
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: 'none', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}>Sign in</button>
                    <button onClick={() => navigate('/login')} style={{ background: '#fff', color: '#0d1117', border: '1px solid rgba(27,31,36,0.15)', borderRadius: '6px', padding: '5px 16px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}>Sign up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header style={{ position: 'relative', overflow: 'hidden', padding: '180px 5% 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Background glow abstract */}
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse at top, rgba(112,0,255,0.15), transparent 70%)', pointerEvents: 'none' }} />

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ border: '1px solid #30363d', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    <div style={{ width: '8px', height: '8px', background: '#3fb950', borderRadius: '50%', boxShadow: '0 0 10px #3fb950' }}></div>
                    Fast as Hell <ChevronRight size={14} />
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: '800', lineHeight: 1.1, color: '#fff', textAlign: 'center', maxWidth: '900px', letterSpacing: '-0.04em' }}>
                    Let's connect from <span style={{ color: '#79c0ff' }}>cXat.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ color: '#8b949e', fontSize: '1.5rem', textAlign: 'center', maxWidth: '700px', marginTop: '24px', lineHeight: 1.5, fontWeight: '400' }}>
                    Fast, agile messaging inspired by the speed of the cat family.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
                    <div style={{ background: '#fff', borderRadius: '6px', padding: '4px', display: 'flex', boxShadow: '0 8px 24px rgba(112,0,255,0.2)' }}>
                        <input type="email" placeholder="Email address" style={{ border: 'none', background: 'transparent', padding: '12px 16px', color: '#000', outline: 'none', fontSize: '1.1rem', minWidth: '280px' }} />
                        <button onClick={() => navigate('/register')} style={{ background: '#7000ff', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 24px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(112,0,255,0.5)' }}>
                            Sign up for cXat
                        </button>
                    </div>
                </motion.div>

                {/* Visual Code Example / Interface Graphic */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} style={{ marginTop: '80px', width: '100%', maxWidth: '1000px', background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
                    <div style={{ background: '#0d1117', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid #30363d' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                        <div style={{ marginLeft: '16px', color: '#8b949e', fontSize: '0.8rem', fontFamily: 'monospace' }}>terminal - cXat-secure</div>
                    </div>
                    <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.6, overflowX: 'auto' }}>
                        <div style={{ color: '#79c0ff' }}>> Connecting to secure relay...</div>
                        <div style={{ color: '#3fb950' }}>[OK] Handshake established (AES-256)</div>
                        <div style={{ color: '#d2a8ff' }}>[SYS] Allocating private channel '349X'</div>
                        <div>Waiting for peer connection...</div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.5 }} style={{ color: '#ff7b72', marginTop: '12px' }}>
                            <span style={{ color: '#79c0ff' }}>Operator:</span> "The payload has been delivered."
                        </motion.div>
                    </div>
                </motion.div>
            </header>

            {/* Content with Timeline */}
            <div style={{ position: 'relative', display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

                {/* Fixed Timeline Column */}
                <div style={{ position: 'relative', width: '100px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    {/* The Rail */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', background: '#30363d' }}>
                        {/* The Glowing progress line */}
                        <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: lineHeight, background: 'linear-gradient(to bottom, transparent, #79c0ff, #d2a8ff)', boxShadow: '0 0 10px #79c0ff, 0 0 20px #d2a8ff' }} />
                    </div>
                </div>

                {/* Scrollytelling Sections */}
                <div style={{ flex: 1, paddingBottom: '20vh' }}>
                    {/* Section 1: BCrypt */}
                    <Section
                        icon={<Lock size={24} color="#3fb950" />}
                        title="Impenetrable Authentication."
                        subtitle="Zero-knowledge security architecture"
                        text="Credentials are never stored in plaintext. Utilizing enterprise-grade BCrypt hashing algorithms, your identity remains mathematically secure even in the event of a total database compromise."
                        visual={<CodeBox title="encodePassword()" color="#3fb950" content={
                            <>
                                <span style={{ color: '#ff7b72' }}>public</span> User <span style={{ color: '#d2a8ff' }}>register</span>(User user) &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}>// Hash password before saving to MongoDB</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;user.<span style={{ color: '#d2a8ff' }}>setPassword</span>(<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;passwordEncoder.<span style={{ color: '#d2a8ff' }}>encode</span>(user.<span style={{ color: '#d2a8ff' }}>getPassword</span>())<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;);<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>return</span> userRepository.<span style={{ color: '#d2a8ff' }}>save</span>(user);<br />
                                &#125;
                            </>
                        } />}
                    />

                    {/* Section 2: WebSocket */}
                    <Section
                        icon={<Zap size={24} color="#79c0ff" />}
                        title="Real-time performance at scale."
                        subtitle="Accelerate your communication workflows"
                        text="cXat's WebSocket infrastructure empowers teams to connect instantly with zero polling overhead. Experience uncompromised speed via bidirectional STOMP protocol streams."
                        visual={<CodeBox title="socket.connect()" color="#79c0ff" content={
                            <>
                                <span style={{ color: '#ff7b72' }}>const</span> socket <span style={{ color: '#79c0ff' }}>=</span> <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>SockJS</span>(<span style={{ color: '#a5d6ff' }}>'/ws'</span>);<br />
                                <span style={{ color: '#ff7b72' }}>const</span> client <span style={{ color: '#79c0ff' }}>=</span> Stomp.<span style={{ color: '#d2a8ff' }}>over</span>(socket);<br />
                                <br />
                                client.<span style={{ color: '#d2a8ff' }}>connect</span>(&#123;&#125;, () <span style={{ color: '#ff7b72' }}>={'>'}</span> &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;client.<span style={{ color: '#d2a8ff' }}>subscribe</span>(<span style={{ color: '#a5d6ff' }}>\`/topic/messages/&#36;&#123;roomId&#125;\`</span>, (msg) <span style={{ color: '#ff7b72' }}>={'>'}</span> &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#d2a8ff' }}>setMessages</span>(prev <span style={{ color: '#ff7b72' }}>={'>'}</span> [...prev, <span style={{ color: '#79c0ff' }}>JSON</span>.<span style={{ color: '#d2a8ff' }}>parse</span>(msg.body)]);<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                                &#125;);
                            </>
                        } />}
                    />

                    {/* Section 3: Redis */}
                    <Section
                        icon={<Database size={24} color="#ff7b72" />}
                        title="Synchronized across clients."
                        subtitle="Distributed caching layer"
                        text="Our high-throughput Redis caching cluster ensures that whether you're joining late or switching devices, your active room state and online status are instantly retrieved in sub-milliseconds."
                        visual={<CodeBox title="Redis Sync" color="#ff7b72" content={
                            <>
                                <span style={{ color: '#8b949e' }}>// Cache-Aside Pattern Implementation</span><br />
                                List&lt;Message&gt; cached <span style={{ color: '#79c0ff' }}>=</span> redisService.<span style={{ color: '#d2a8ff' }}>getCached</span>(roomId);<br />
                                <span style={{ color: '#ff7b72' }}>if</span> (cached <span style={{ color: '#79c0ff' }}>!=</span> <span style={{ color: '#79c0ff' }}>null</span>) <span style={{ color: '#ff7b72' }}>return</span> cached;<br />
                                <br />
                                List&lt;Message&gt; messages <span style={{ color: '#79c0ff' }}>=</span> mongoRepo.<span style={{ color: '#d2a8ff' }}>find</span>(roomId);<br />
                                redisService.<span style={{ color: '#d2a8ff' }}>cacheMessages</span>(roomId, messages);<br />
                                <span style={{ color: '#ff7b72' }}>return</span> messages;
                            </>
                        } />}
                    />

                    {/* Section 4: Read Receipts */}
                    <Section
                        icon={<CheckCheck size={24} color="#79c0ff" />}
                        title="Absolute delivery confirmation."
                        subtitle="Read receipt telemetry"
                        text="Never wonder if a payload was received. cXat emits read statuses across WebSockets instantly updating your UI with double blue ticks the moment the recipient connects."
                        visual={<CodeBox title="ReadReceipt Event" color="#79c0ff" content={
                            <>
                                <span style={{ color: '#8b949e' }}>/* Automatically emit read status on view */</span><br />
                                <span style={{ color: '#ff7b72' }}>const</span> unread <span style={{ color: '#79c0ff' }}>=</span> res.data.<span style={{ color: '#d2a8ff' }}>some</span>(m <span style={{ color: '#ff7b72' }}>={'>'}</span> <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#79c0ff' }}>!</span>m.read <span style={{ color: '#79c0ff' }}>&amp;&amp;</span> m.senderId <span style={{ color: '#79c0ff' }}>!==</span> user.username<br />
                                );<br />
                                <br />
                                <span style={{ color: '#ff7b72' }}>if</span> (unread) &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;client.<span style={{ color: '#d2a8ff' }}>send</span>(<span style={{ color: '#a5d6ff' }}>"/app/read"</span>, &#123;&#125;, <span style={{ color: '#79c0ff' }}>JSON</span>.<span style={{ color: '#d2a8ff' }}>stringify</span>(&#123; roomId &#125;));<br />
                                &#125;
                            </>
                        } />}
                    />

                    {/* Section 5: Global Time */}
                    <Section
                        icon={<Clock size={24} color="#f0883e" />}
                        title="Universally synchronized."
                        subtitle="UTC standard timeframes"
                        text="Collaborate globally without timezone confusion. Every transmission is strictly stamped in UTC at the database level, ensuring perfect chronological orchestration for all clients."
                        visual={<CodeBox title="Message Entity" color="#f0883e" content={
                            <>
                                <span style={{ color: '#d2a8ff' }}>@Document</span>(collection <span style={{ color: '#79c0ff' }}>=</span> <span style={{ color: '#a5d6ff' }}>"messages"</span>)<br />
                                <span style={{ color: '#ff7b72' }}>public class</span> Message &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>private</span> String content;<br />
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}>// Forced UTC timestamping</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>private</span> String createdAt <span style={{ color: '#79c0ff' }}>=</span> <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LocalDateTime.<span style={{ color: '#d2a8ff' }}>now</span>(ZoneOffset.UTC).<span style={{ color: '#d2a8ff' }}>toString</span>();<br />
                                &#125;
                            </>
                        } />}
                    />

                    {/* Section 6: Kafka */}
                    <Section
                        icon={<Layers size={24} color="#d2a8ff" />}
                        title="Decoupled event streaming."
                        subtitle="Apache Kafka integration"
                        text="Built to handle massive bursts of traffic. Complex asynchronous tasks are strictly decoupled into micro-events allowing your primary sockets to remain unblocked and fluid."
                        visual={<CodeBox title="Transmission Broker" color="#d2a8ff" content={
                            <>
                                <span style={{ color: '#d2a8ff' }}>@KafkaListener</span>(topics <span style={{ color: '#79c0ff' }}>=</span> <span style={{ color: '#a5d6ff' }}>"chat-events"</span>)<br />
                                <span style={{ color: '#ff7b72' }}>public void</span> <span style={{ color: '#d2a8ff' }}>consume</span>(String message) &#123;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}>// Process heavy background persistence</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}>// asynchronously off the main thread</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;eventProcessor.<span style={{ color: '#d2a8ff' }}>handle</span>(message);<br />
                                &#125;
                            </>
                        } />}
                    />
                </div>
            </div>

            {/* Footer CTA */}
            <div style={{ padding: '100px 20px', textAlign: 'center', background: '#010409', borderTop: '1px solid #30363d' }}>
                <br />
                <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#fff', marginBottom: '24px' }}>Ready to encrypt your talks?</h2>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/login')} style={{ background: '#fff', color: '#0d1117', border: 'none', borderRadius: '6px', padding: '16px 32px', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                        Enter cXat
                    </button>
                    <button onClick={() => window.open('https://github.com', '_blank')} style={{ background: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: '6px', padding: '16px 32px', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        View Source on GitHub
                    </button>
                </div>
            </div>

        </div>
    );
};

const Section = ({ title, subtitle, text, icon, visual }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20%", once: true });

    return (
        <div ref={ref} style={{ padding: '80px 0', position: 'relative' }}>
            {/* Timeline Node Glow inside the section container relative to timeline */}
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }} style={{ position: 'absolute', top: '90px', left: '-68px', width: '36px', height: '36px', background: '#0d1117', border: '2px solid #30363d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                {icon}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ color: '#8b949e', fontSize: '1.25rem', fontWeight: '600' }}>{subtitle}</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', lineHeight: 1.2, maxWidth: '600px' }}>{title}</h2>
                <p style={{ color: '#c9d1d9', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '600px', marginBottom: '32px' }}>{text}</p>
                {visual}
            </motion.div>
        </div>
    );
};

const CodeBox = ({ title, content, color = "#79c0ff" }) => (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', maxWidth: '700px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={14} color={color} /> {title}
            </span>
        </div>
        <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, overflowX: 'auto', background: '#0d1117' }}>
            {content}
        </div>
    </div>
);

export default LandingPage;