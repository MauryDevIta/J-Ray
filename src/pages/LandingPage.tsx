import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, type Variants } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

// --- 1. COMPONENTE TYPEWRITER ---
function Typewriter({ text, speed = 70, delay = 0, onComplete }: { text: string; speed?: number; delay?: number; onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const hasFinished = useRef(false);

    useEffect(() => {
        if (hasFinished.current) return;
        let i = 0;
        const startTimeout = setTimeout(() => {
            const timer = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    if (!hasFinished.current) {
                        hasFinished.current = true;
                        onComplete?.();
                    }
                }
            }, speed);
            return () => clearInterval(timer);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [text, speed, delay, onComplete]);

    useEffect(() => {
        const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 500);
        return () => clearInterval(cursorTimer);
    }, []);

    return (
        <span>
            {displayedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-indigo-500`}>_</span>
        </span>
    );
}

// --- 2. CONFIGURAZIONE ANIMAZIONI ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
};

// --- 3. TRADUZIONI ---
const translations = {
    it: {
        nav: {
            console: "CONSOLE",
            logout: "LOGOUT_",
            launch: "LANCIA_CONSOLE_"
        },
        hero: {
            init: "[ Inizializzazione_Protocollo_J-RAY ]",
            title: "DOMINA IL CAOS",
            subtitle: "DEI TUOI DATI.",
            desc: "Il visualizzatore JSON per chi non accetta il disordine.\nMappe neurali, layout istantanei, controllo totale.",
            cta: "LOGS_FILES ↓"
        },
        features: {
            title: "POTENZA PURA",
            subtitle: "SOTTO IL COFANO.",
            f1_title: "Parsing Real-Time",
            f1_desc: "Modifica il JSON e vedi il grafo mutare istantaneamente. Zero latenza.",
            f2_title: "Export 4K",
            f2_desc: "Esporta diagrammi ad alta risoluzione pronti per le tue presentazioni o documentazione.",
            f3_title: "Neural Layout",
            f3_desc: "Algoritmi di posizionamento intelligenti che districano anche i nodi più complessi.",
            f4_title: "Privacy First",
            f4_desc: "Tutto gira nel tuo browser. I tuoi dati non lasciano mai la tua macchina."
        },
        architecture: {
            title: "ARCHITETTURA",
            subtitle: "ZERO TRUST",
            card_1: "Client-Side Processing",
            desc_1: "Il motore di rendering gira via WebAssembly direttamente sulla tua CPU. Nessun dato viene inviato ai nostri server.",
            card_2: "Memoria Volatile",
            desc_2: "Chiudi la tab, i dati spariscono. Nessun database persistente per i tuoi file JSON.",
            card_3: "Crittografia End-to-End",
            desc_3: "Anche durante l'auth, le tue credenziali sono protette da protocolli bancari."
        },
        useCases: {
            dev_title: "Sviluppatori_",
            dev_msg: "Debugga API giganti.",
            dev_desc: "Visualizza la gerarchia delle risposte REST in tempo reale senza perdere il focus.",
            arch_title: "Architects_",
            arch_msg: "Mappa infrastrutture.",
            arch_desc: "Trasforma stati Terraform o config Kubernetes in schemi navigabili pronti all'uso.",
            ana_title: "Analysts_",
            ana_msg: "Trova correlazioni.",
            ana_desc: "Analizza dataset annidati e complessi. Usa la Neural Search per navigare nel mare dei dati."
        },
        demo: {
            title_1: "Generazione",
            title_2: "Istantanea.",
            desc: "Incolla il codice. J-RAY calcola il layout ottimale evitando sovrapposizioni.",
            step_1: "PARSING_INPUT_JSON...",
            step_2: "MAPPING_GRAPH_NODES..."
        },
        feedback: {
            title: "FEEDBACK",
            subtitle: "CHANNEL",
            desc: "Hai trovato un bug o hai un'idea? Invia un segnale diretto agli sviluppatori.",
            placeholder: "Inserisci il tuo messaggio...",
            btn: "INVIA_SEGNALE",
            success: "TRASMISSIONE RICEVUTA."
        },
        cta: {
            title_1: "PRONTO AL",
            title_2: "DECOLLO?",
            btn_auth: "TORNA_IN_CONSOLE_",
            btn_guest: "LANCIA_ORA_"
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    },
    en: {
        nav: {
            console: "CONSOLE",
            logout: "LOGOUT_",
            launch: "LAUNCH_CONSOLE_"
        },
        hero: {
            init: "[ Initiating_Protocol_J-RAY ]",
            title: "TAME THE CHAOS",
            subtitle: "OF YOUR DATA.",
            desc: "The JSON visualizer for those who refuse disorder.\nNeural maps, instant layouts, total control.",
            cta: "LOGS_FILES ↓"
        },
        features: {
            title: "PURE POWER",
            subtitle: "UNDER THE HOOD.",
            f1_title: "Real-Time Parsing",
            f1_desc: "Edit JSON and watch the graph mutate instantly. Zero latency.",
            f2_title: "4K Export",
            f2_desc: "Export high-resolution diagrams ready for your presentations or documentation.",
            f3_title: "Neural Layout",
            f3_desc: "Smart positioning algorithms that untangle even the most complex nodes.",
            f4_title: "Privacy First",
            f4_desc: "Everything runs in your browser. Your data never leaves your machine."
        },
        architecture: {
            title: "ARCHITECTURE",
            subtitle: "ZERO TRUST",
            card_1: "Client-Side Processing",
            desc_1: "The rendering engine runs via WebAssembly directly on your CPU. No data is sent to our servers.",
            card_2: "Volatile Memory",
            desc_2: "Close the tab, data vanishes. No persistent database for your JSON files.",
            card_3: "End-to-End Encryption",
            desc_3: "Even during auth, your credentials are protected by banking-grade protocols."
        },
        useCases: {
            dev_title: "Developers_",
            dev_msg: "Debug giant APIs.",
            dev_desc: "Visualize REST response hierarchies in real-time without losing focus.",
            arch_title: "Architects_",
            arch_msg: "Map infrastructure.",
            arch_desc: "Turn Terraform states or Kubernetes configs into navigable, ready-to-use schemas.",
            ana_title: "Analysts_",
            ana_msg: "Find correlations.",
            ana_desc: "Analyze nested and complex datasets. Use Neural Search to navigate the sea of data."
        },
        demo: {
            title_1: "Instant",
            title_2: "Generation.",
            desc: "Paste the code. J-RAY calculates the optimal layout avoiding overlaps.",
            step_1: "PARSING_INPUT_JSON...",
            step_2: "MAPPING_GRAPH_NODES..."
        },
        feedback: {
            title: "FEEDBACK",
            subtitle: "CHANNEL",
            desc: "Found a glitch or have an idea? Send a direct signal to the developers.",
            placeholder: "Enter your transmission...",
            btn: "SEND_SIGNAL",
            success: "TRANSMISSION RECEIVED."
        },
        cta: {
            title_1: "READY FOR",
            title_2: "TAKEOFF?",
            btn_auth: "BACK_TO_CONSOLE_",
            btn_guest: "LAUNCH_NOW_"
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    }
};

// --- 4. COMPONENTE PRINCIPALE ---
export default function LandingPage() {
    const [isHeroReady, setIsHeroReady] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [session, setSession] = useState<any>(null);
    const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [feedbackText, setFeedbackText] = useState('');

    const [honeyPot, setHoneyPot] = useState('');

    const { lang, setLang } = useLanguage();
    const navigate = useNavigate();
    const t = translations[lang];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        navigate('/');
    };

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (demoStep === 4) {
            timeout = setTimeout(() => { setDemoStep(0); }, 2500);
        } else {
            timeout = setTimeout(() => { setDemoStep((prev) => prev + 1); }, 800);
        }
        return () => clearTimeout(timeout);
    }, [demoStep]);

    const handleComplete = useCallback(() => setIsHeroReady(true), []);

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (honeyPot) return;

        const lastSent = localStorage.getItem('jray_last_feedback');
        if (lastSent) {
            const timeDiff = Date.now() - parseInt(lastSent);
            if (timeDiff < 60000) {
                alert("SYSTEM COOLDOWN: Attendi 60 secondi tra un segnale e l'altro.");
                return;
            }
        }

        if (!feedbackText.trim()) return;

        setFeedbackStatus('sending');

        try {
            const { error } = await supabase.from('feedback').insert({
                message: feedbackText,
                user_email: session?.user?.email || 'anonymous',
                metadata: {
                    lang: lang,
                    userAgent: navigator.userAgent,
                    screen: `${window.screen.width}x${window.screen.height}`
                }
            });

            if (error) throw error;

            localStorage.setItem('jray_last_feedback', Date.now().toString());
            setFeedbackStatus('sent');
            setFeedbackText('');
            setTimeout(() => setFeedbackStatus('idle'), 3000);
        } catch (error) {
            console.error('Error sending signal:', error);
            setFeedbackStatus('idle');
            alert("ERRORE DI TRASMISSIONE. Riprova.");
        }
    };

    return (
        <div className="min-h-screen cyber-bg text-white overflow-x-hidden selection:bg-indigo-500/30 font-sans">
            <motion.div className="progress-bar" style={{ scaleX }} />
            <div className="spotlight" />

            {/* --- NAVBAR --- */}
            <AnimatePresence>
                {isHeroReady && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/20"
                    >
                        <div className="text-xl md:text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            J-RAY
                        </div>
                        <div className="flex items-center gap-4 md:gap-8">

                            {/* 🍕 TASTO DONAZIONE UGUALE AL VISUALIZER 🍕 */}
                            <a
                                href="https://www.buymeacoffee.com/gentilemau6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5F5F]/10 border border-[#FF5F5F]/30 hover:bg-[#FF5F5F] text-[#FF5F5F] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,95,95,0)] hover:shadow-[0_0_20px_rgba(255,95,95,0.4)] hover:-translate-y-0.5"
                            >
                                <span className="text-sm group-hover:animate-bounce">🍕</span>
                                <span className="text-[10px] font-black uppercase tracking-tighter">
                                    {lang === 'it' ? 'Offrimi una pizza' : 'Support J-Ray'}
                                </span>
                            </a>

                            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                                <button
                                    onClick={() => setLang('it')}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'it' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    IT
                                </button>
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    EN
                                </button>
                            </div>

                            {session ? (
                                <>
                                    <Link to="/app" className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase">{t.nav.console}</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-full hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        {t.nav.logout}
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/app"
                                    className="px-6 py-2 md:px-8 md:py-3 bg-white text-black text-[10px] md:text-xs font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    {t.nav.launch}
                                </Link>
                            )}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section className="h-screen flex flex-col items-center justify-center relative z-20 px-6 text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="font-mono text-indigo-500 text-[10px] tracking-[0.6em] mb-4 uppercase">
                    {t.hero.init}
                </motion.div>

                <h1 className="text-6xl md:text-9xl font-black tracking-tighter italic uppercase leading-none min-h-[1.1em]">
                    <Typewriter key={lang} text={t.hero.title} speed={60} onComplete={handleComplete} />
                </h1>

                <AnimatePresence>
                    {isHeroReady && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 text-glow">
                                {t.hero.subtitle}
                            </h2>
                            <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-medium leading-relaxed whitespace-pre-line">
                                {t.hero.desc}
                            </p>
                            <div className="flex gap-4 justify-center pt-6">
                                <button
                                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-10 py-5 border border-white/10 rounded-2xl font-black hover:bg-white/5 transition-all text-zinc-500 italic shadow-xl"
                                >
                                    {t.hero.cta}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section id="features" className="py-20 px-6 relative z-20 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter">
                            {t.features.title} <span className="text-indigo-500">{t.features.subtitle}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: t.features.f1_title, desc: t.features.f1_desc, icon: "⚡" },
                            { title: t.features.f2_title, desc: t.features.f2_desc, icon: "📸" },
                            { title: t.features.f3_title, desc: t.features.f3_desc, icon: "🧠" },
                            { title: t.features.f4_title, desc: t.features.f4_desc, icon: "🛡️" },
                        ].map((f, i) => (
                            <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-crosshair">
                                <div className="text-4xl mb-6">{f.icon}</div>
                                <h3 className="text-xl font-bold italic mb-2 text-zinc-200">{f.title}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed font-mono">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* --- ARCHITECTURE SECTION --- */}
            <section className="py-20 px-6 relative z-20 max-w-7xl mx-auto border-t border-white/5">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
                            {t.architecture.title} <span className="text-indigo-500 block">{t.architecture.subtitle}</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: t.architecture.card_1, desc: t.architecture.desc_1 },
                                { title: t.architecture.card_2, desc: t.architecture.desc_2 },
                                { title: t.architecture.card_3, desc: t.architecture.desc_3 },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-1 h-12 bg-indigo-500 rounded-full flex-shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white uppercase tracking-wide">{item.title}</h4>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Visualizzazione Astratta Architettura */}
                    <div className="relative aspect-square md:aspect-video bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl absolute animate-pulse" />
                        <div className="text-center z-10 font-mono text-xs text-indigo-400">
                            <div className="mb-2">[ BROWSER_SANDBOX ]</div>
                            <div className="p-4 border border-indigo-500 rounded bg-black/50 backdrop-blur">
                                J-RAY_ENGINE.WASM
                            </div>
                            <div className="h-8 w-[1px] bg-indigo-500 mx-auto my-1" />
                            <div className="text-white font-bold">YOUR_DATA.JSON</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- USE CASES SECTION --- */}
            <section className="py-32 px-6 relative z-20 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                >
                    <div className="p-10 bg-zinc-900/40 rounded-[40px] border border-white/5 backdrop-blur-md hover:border-indigo-500/30 transition-colors group">
                        <h3 className="text-indigo-400 font-mono text-xs mb-4 uppercase tracking-[0.2em]">{t.useCases.dev_title}</h3>
                        <p className="text-xl font-bold italic mb-4 group-hover:text-white transition-colors">{t.useCases.dev_msg}</p>
                        <p className="text-zinc-500 text-sm">{t.useCases.dev_desc}</p>
                    </div>
                    <div className="p-10 bg-zinc-900/40 rounded-[40px] border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
                        <h3 className="text-cyan-400 font-mono text-xs mb-4 uppercase tracking-[0.2em]">{t.useCases.arch_title}</h3>
                        <p className="text-xl font-bold italic mb-4 group-hover:text-white transition-colors">{t.useCases.arch_msg}</p>
                        <p className="text-zinc-500 text-sm">{t.useCases.arch_desc}</p>
                    </div>
                    <div className="p-10 bg-zinc-900/40 rounded-[40px] border border-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors group">
                        <h3 className="text-purple-400 font-mono text-xs mb-4 uppercase tracking-[0.2em]">{t.useCases.ana_title}</h3>
                        <p className="text-xl font-bold italic mb-4 group-hover:text-white transition-colors">{t.useCases.ana_msg}</p>
                        <p className="text-zinc-500 text-sm">{t.useCases.ana_desc}</p>
                    </div>
                </motion.div>
            </section>

            {/* --- INTERACTIVE DEMO --- */}
            <section id="demo" className="py-40 px-6 relative z-20 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div className="space-y-10">
                        <h2 className="text-5xl font-black uppercase italic leading-none">{t.demo.title_1} <br /> <span className="text-indigo-500">{t.demo.title_2}</span></h2>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                            {t.demo.desc}
                        </p>

                        {/* Indicatori Steps */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs">
                                <motion.div
                                    animate={{
                                        backgroundColor: demoStep >= 1 ? '#22c55e' : '#3f3f46',
                                        boxShadow: demoStep >= 1 ? '0 0 8px #22c55e' : 'none'
                                    }}
                                    className="w-2 h-2 rounded-full transition-colors duration-500"
                                />
                                <span className={demoStep >= 1 ? "text-white transition-colors duration-500" : ""}>{t.demo.step_1}</span>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs">
                                <motion.div
                                    animate={{
                                        backgroundColor: demoStep >= 3 ? '#22c55e' : '#3f3f46',
                                        boxShadow: demoStep >= 3 ? '0 0 8px #22c55e' : 'none'
                                    }}
                                    className="w-2 h-2 rounded-full transition-colors duration-500"
                                />
                                <span className={demoStep >= 3 ? "text-white transition-colors duration-500" : ""}>{t.demo.step_2}</span>
                            </div>
                        </div>
                    </div>

                    {/* SIMULATORE GRAFICO */}
                    <div className="relative aspect-video bg-[#020617] rounded-[50px] border border-white/5 overflow-hidden shadow-2xl flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid opacity-10" />

                        {/* SVG LINEE */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <AnimatePresence>
                                {demoStep >= 3 && (
                                    <motion.line
                                        key="line-1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        x1="50%" y1="35%" x2="30%" y2="60%"
                                        stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
                                    />
                                )}
                                {demoStep >= 4 && (
                                    <motion.line
                                        key="line-2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        x1="50%" y1="35%" x2="70%" y2="60%"
                                        stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
                                    />
                                )}
                            </AnimatePresence>
                        </svg>

                        {/* CONTENITORE NODI */}
                        <div className="absolute inset-0">
                            {/* Overlay Input */}
                            <AnimatePresence mode='wait'>
                                {(demoStep === 0 || demoStep === 1) && (
                                    <motion.div
                                        key="input-overlay"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.5 } }}
                                        className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-10"
                                    >
                                        <div className="w-full max-w-xs space-y-4">
                                            <div className="p-4 bg-zinc-900 border border-white/10 rounded-xl font-mono text-[10px] text-indigo-400 shadow-2xl">
                                                {'{ "project": "J-RAY", "engine": "turbo" }'}
                                            </div>
                                            <motion.div
                                                animate={demoStep === 1 ? { scale: 0.98, backgroundColor: "#4f46e5", color: "#fff" } : { backgroundColor: "#27272a" }}
                                                className="py-3 rounded-lg text-[10px] font-bold uppercase text-zinc-400 text-center transition-colors duration-300"
                                            >
                                                {demoStep === 1 ? "⚡ EXECUTING..." : "Run Visualizer"}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* NODI */}
                            <AnimatePresence>
                                {/* NODO PADRE */}
                                {demoStep >= 2 && (
                                    <motion.div
                                        key="node-core"
                                        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                                        animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.5, ease: "backIn" } }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        style={{ top: '35%', left: '50%', position: 'absolute' }}
                                        className="px-4 py-2 bg-zinc-900 border border-indigo-500/50 rounded-xl font-mono text-[10px] z-20 shadow-[0_0_20px_rgba(99,102,241,0.3)] whitespace-nowrap text-white"
                                    >
                                        J-RAY_CORE
                                    </motion.div>
                                )}

                                {/* NODO FIGLIO SINISTRO */}
                                {demoStep >= 3 && (
                                    <motion.div
                                        key="node-1"
                                        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                                        animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                                        transition={{ delay: 0.1, type: "spring" }}
                                        style={{ top: '60%', left: '30%', position: 'absolute' }}
                                        className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg font-mono text-[8px] text-zinc-400 z-10 whitespace-nowrap"
                                    >
                                        node_01: ok
                                    </motion.div>
                                )}

                                {/* NODO FIGLIO DESTRO */}
                                {demoStep >= 4 && (
                                    <motion.div
                                        key="node-2"
                                        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                                        animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        style={{ top: '60%', left: '70%', position: 'absolute' }}
                                        className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg font-mono text-[8px] text-zinc-400 z-10 whitespace-nowrap"
                                    >
                                        secure: true
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-[20%] w-full animate-scanline" />
                    </div>
                </motion.div>
            </section>

            {/* --- FEEDBACK SECTION (BLINDATA) --- */}
            <section className="py-20 px-6 relative z-20 max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="bg-black/40 border border-white/5 rounded-[40px] p-10 md:p-16 backdrop-blur-md relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-black italic uppercase mb-2">{t.feedback.title} <span className="text-indigo-500">{t.feedback.subtitle}</span></h3>
                        <p className="text-zinc-500 text-sm font-mono max-w-lg mx-auto">{t.feedback.desc}</p>
                    </div>

                    <form onSubmit={handleFeedbackSubmit} className="space-y-6 max-w-md mx-auto relative">

                        {/* --- HONEYPOT TRAP --- */}
                        <input
                            type="text"
                            value={honeyPot}
                            onChange={(e) => setHoneyPot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            className="absolute opacity-0 -z-10 w-0 h-0 pointer-events-none"
                            placeholder="Do not fill this if you are human"
                        />

                        {/* --- TEXTAREA REALE --- */}
                        <div className="relative group">
                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder={t.feedback.placeholder}
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors h-32 resize-none"
                            />
                            <div className="absolute bottom-3 right-3 text-[10px] text-zinc-700 font-mono group-focus-within:text-indigo-500">
                                {feedbackText.length} chars
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={feedbackStatus !== 'idle'}
                            className={`w-full py-4 rounded-xl font-black italic tracking-widest uppercase transition-all flex items-center justify-center gap-2
                                ${feedbackStatus === 'sent' ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-indigo-500 hover:text-white'}
                            `}
                        >
                            {feedbackStatus === 'sending' && (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            )}
                            {feedbackStatus === 'idle' && t.feedback.btn}
                            {feedbackStatus === 'sending' && "TRANSMITTING..."}
                            {feedbackStatus === 'sent' && t.feedback.success}
                        </button>
                    </form>
                </motion.div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-60 text-center relative z-20 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-12"
                >
                    <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                        {t.cta.title_1} <br /> <span className="text-indigo-500">{t.cta.title_2}</span>
                    </h2>
                    <Link
                        to="/app" /* <-- MODIFICATO: ORA TUTTI VANNO ALLA CONSOLE */
                        className="px-16 py-8 bg-indigo-600 rounded-[35px] text-2xl font-black italic shadow-[0_20px_80px_rgba(79,70,229,0.3)] hover:scale-110 transition-all inline-block"
                    >
                        {session ? t.cta.btn_auth : t.cta.btn_guest}
                    </Link>
                </motion.div>
            </section>

            {/* --- FOOTER PULITO --- */}
            <footer className="py-10 border-t border-white/5 relative z-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Copyright */}
                    <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">
                        {t.footer}
                    </div>

                    {/* Link Legali - SOLO PRIVACY POLICY */}
                    <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest uppercase">
                        <a
                            href="https://www.iubenda.com/privacy-policy/13130280"
                            className="iubenda-white iubenda-noiframe iubenda-embed text-zinc-600 hover:text-white transition-colors decoration-0"
                            title="Privacy Policy"
                        >
                            Privacy_Policy
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}