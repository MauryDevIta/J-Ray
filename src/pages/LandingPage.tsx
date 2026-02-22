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
            launch: "WEB DEMO",
            pricing: "PRICING",
            docs: "DOCS"
        },
        hero: {
            init: "[ Inizializzazione_Protocollo_J-RAY ]",
            title: "DOMINA IL CAOS",
            subtitle: "DEI TUOI DATI.",
            desc: "Il visualizzatore JSON per chi non accetta il disordine.\nMappe neurali, decriptazione token, Live API Radar e molto altro.",
            cta: "ESPLORA LE FUNZIONI ↓"
        },
        features: {
            title: "POTENZA PURA",
            subtitle: "SOTTO IL COFANO.",
            f1_title: "Parsing Real-Time",
            f1_desc: "Modifica il JSON e vedi il grafo mutare istantaneamente. Il motore Nitro in Rust garantisce zero latenza anche su file enormi.",
            f2_title: "Smart Stack",
            f2_desc: "Array con migliaia di elementi? J-RAY li comprime automaticamente in pacchetti da 50 per non far esplodere la tua RAM.",
            f3_title: "X-Ray Decrypter",
            f3_desc: "Hai trovato un Token JWT o una stringa Base64 nel JSON? Clicca il lucchetto e decriptalo al volo senza usare tool esterni.",
            f4_title: "Type Code Gen",
            f4_desc: "Genera automaticamente le interfacce TypeScript, le struct Rust o i modelli Pydantic Python partendo dal tuo JSON."
        },
        proFeatures: {
            title: "MODULI",
            subtitle: "PRO",
            radar_title: "Live API Radar",
            radar_desc: "Connetti J-RAY a un endpoint REST. Imposta l'intervallo (es. 2 sec) e guarda il grafo aggiornarsi in tempo reale mentre i dati live fluiscono.",
            diff_title: "Visual JSON Diff",
            diff_desc: "Carica due file JSON diversi e accendi il Diff. J-RAY evidenzierà in tempo reale i nodi Aggiunti (Verde), Rimossi (Rosso) e Modificati (Giallo).",
            ai_title: "AI Data Profiler",
            ai_desc: "Fai analizzare l'intero dataset al Profiler. Troverà campi vuoti sospetti, tipi di dato incoerenti (es. una stringa in mezzo a numeri) e bug strutturali.",
            export_title: "Vector Export",
            export_desc: "Esporta l'intero grafo navigabile in formato SVG vettoriale ad altissima risoluzione per incollarlo in Figma o nella tua documentazione."
        },
        demo: {
            title_1: "Generazione",
            title_2: "Istantanea.",
            desc: "Incolla il codice. L'engine calcola il layout ottimale evitando sovrapposizioni e tracciando i collegamenti.",
            step_1: "PARSING_INPUT_JSON...",
            step_2: "MAPPING_GRAPH_NODES..."
        },
        webdemo: {
            title_1: "Prova la",
            title_2: "Web Demo.",
            desc: "Non sei ancora pronto per l'app desktop in Rust? Prova il nostro motore WebAssembly direttamente dal browser. (Funzionalità limitate)",
            btn: "APRI WEB DEMO"
        },
        architecture: {
            title: "ARCHITETTURA",
            subtitle: "DESKTOP FIRST",
            card_1: "Motore Nativo Rust",
            desc_1: "J-RAY PRO non è un'app Electron lenta. È scritta interamente in Rust usando eframe/egui per girare a 60FPS interagendo direttamente con la tua GPU.",
            card_2: "Sicurezza Offline",
            desc_2: "Nessun dato viene mai inviato ai nostri server. Il parsing, il diffing e la decriptazione avvengono al 100% sulla tua macchina locale.",
            card_3: "Licenza Perpetua",
            desc_3: "Paga una volta sola su Lemon Squeezy, usalo per sempre. La chiave di licenza viene salvata localmente nel tuo vault criptato."
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    },
    en: {
        nav: {
            console: "CONSOLE",
            logout: "LOGOUT_",
            launch: "WEB DEMO",
            pricing: "PRICING",
            docs: "DOCS"
        },
        hero: {
            init: "[ Initiating_Protocol_J-RAY ]",
            title: "TAME THE CHAOS",
            subtitle: "OF YOUR DATA.",
            desc: "The JSON visualizer for those who refuse disorder.\nNeural maps, token decryption, Live API Radar, and much more.",
            cta: "EXPLORE FEATURES ↓"
        },
        features: {
            title: "PURE POWER",
            subtitle: "UNDER THE HOOD.",
            f1_title: "Real-Time Parsing",
            f1_desc: "Edit JSON and watch the graph mutate instantly. The Rust Nitro engine guarantees zero latency even on huge files.",
            f2_title: "Smart Stack",
            f2_desc: "Arrays with thousands of elements? J-RAY automatically compresses them into 50-item decks to save your RAM.",
            f3_title: "X-Ray Decrypter",
            f3_desc: "Found a JWT Token or Base64 string in the JSON? Click the padlock to decrypt it on the fly without external tools.",
            f4_title: "Type Code Gen",
            f4_desc: "Automatically generate TypeScript interfaces, Rust structs, or Python Pydantic models directly from your JSON."
        },
        proFeatures: {
            title: "PRO",
            subtitle: "MODULES",
            radar_title: "Live API Radar",
            radar_desc: "Connect J-RAY to a REST endpoint. Set the interval (e.g., 2 sec) and watch the graph update in real-time as live data flows in.",
            diff_title: "Visual JSON Diff",
            diff_desc: "Load two different JSON files and enable Diff mode. J-RAY will highlight Added (Green), Removed (Red), and Modified (Yellow) nodes.",
            ai_title: "AI Data Profiler",
            ai_desc: "Let the Profiler analyze your dataset. It will find suspicious empty fields, inconsistent data types, and structural anomalies.",
            export_title: "Vector Export",
            export_desc: "Export the entire navigable graph to ultra-high resolution SVG format, ready to be pasted into Figma or your technical docs."
        },
        demo: {
            title_1: "Instant",
            title_2: "Generation.",
            desc: "Paste the code. The engine calculates the optimal layout avoiding overlaps and routing connections.",
            step_1: "PARSING_INPUT_JSON...",
            step_2: "MAPPING_GRAPH_NODES..."
        },
        webdemo: {
            title_1: "Try the",
            title_2: "Web Demo.",
            desc: "Not ready for the desktop Rust app yet? Try our WebAssembly engine directly in your browser. (Features are limited)",
            btn: "LAUNCH WEB DEMO"
        },
        architecture: {
            title: "ARCHITECTURE",
            subtitle: "DESKTOP FIRST",
            card_1: "Native Rust Engine",
            desc_1: "J-RAY PRO is not a slow Electron app. It's written entirely in Rust using eframe/egui to run at 60FPS directly on your GPU.",
            card_2: "Offline Security",
            desc_2: "No data is ever sent to our servers. Parsing, diffing, and decryption happen 100% locally on your machine.",
            card_3: "Perpetual License",
            desc_3: "Pay once via Lemon Squeezy, use it forever. Your license key is securely stored in your local encrypted vault."
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    }
};

// --- 4. COMPONENTE PRINCIPALE ---
export default function LandingPage() {
    const [isHeroReady, setIsHeroReady] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [session, setSession] = useState<any>(null);

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

    // Timer per l'animazione SVG
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

    return (
        <div className="min-h-screen cyber-bg text-white overflow-x-hidden selection:bg-indigo-500/30 font-sans">
            <motion.div className="progress-bar z-[1000]" style={{ scaleX }} />
            <div className="spotlight fixed inset-0 pointer-events-none" />

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

                            {/* Tasti di navigazione Custom */}
                            <div className="hidden md:flex items-center gap-6 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                                <Link to="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
                                <Link to="/docs" className="hover:text-white transition-colors">{t.nav.docs}</Link>
                            </div>

                            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                                <button onClick={() => setLang('it')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'it' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>IT</button>
                                <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>EN</button>
                            </div>

                            {session ? (
                                <>
                                    <Link to="/app" className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase">{t.nav.console}</Link>
                                    <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-full hover:bg-red-500 hover:text-white transition-all">
                                        {t.nav.logout}
                                    </button>
                                </>
                            ) : (
                                <Link to="/app" className="px-6 py-2 md:px-8 md:py-3 bg-white text-black text-[10px] md:text-xs font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
                            <h2 className="text-4xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 text-glow">
                                {t.hero.subtitle}
                            </h2>
                            <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-medium leading-relaxed whitespace-pre-line">
                                {t.hero.desc}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
                                <Link to="/pricing" className="px-10 py-5 bg-indigo-600 rounded-2xl font-black hover:bg-indigo-500 transition-all text-white italic shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                                    DOWNLOAD DESKTOP APP
                                </Link>
                                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 border border-white/10 rounded-2xl font-black hover:bg-white/5 transition-all text-zinc-500 italic">
                                    {t.hero.cta}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* --- CORE FEATURES SECTION --- */}
            <section id="features" className="py-32 px-6 relative z-20 max-w-7xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter">
                            {t.features.title} <span className="text-indigo-500">{t.features.subtitle}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: t.features.f1_title, desc: t.features.f1_desc, icon: "⚡", color: "text-yellow-400" },
                            { title: t.features.f2_title, desc: t.features.f2_desc, icon: "🃏", color: "text-emerald-400" },
                            { title: t.features.f3_title, desc: t.features.f3_desc, icon: "🔓", color: "text-red-400" },
                            { title: t.features.f4_title, desc: t.features.f4_desc, icon: "🧬", color: "text-cyan-400" },
                        ].map((f, i) => (
                            <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all">
                                <div className={`text-4xl mb-6 ${f.color}`}>{f.icon}</div>
                                <h3 className="text-2xl font-black italic mb-4 text-white uppercase">{f.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed font-mono">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* --- PRO MODULES SECTION --- */}
            <section className="py-32 px-6 relative z-20 max-w-7xl mx-auto border-t border-white/5">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter">
                            {t.proFeatures.title} <span className="text-pink-500">{t.proFeatures.subtitle}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Radar */}
                        <div className="p-12 bg-black/40 rounded-[40px] border border-white/5 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />
                            <div className="text-green-500 mb-6 font-mono text-xs uppercase tracking-widest border border-green-500/30 inline-block px-3 py-1 rounded-full">Module_01</div>
                            <h3 className="text-3xl font-black italic mb-4 text-white">{t.proFeatures.radar_title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{t.proFeatures.radar_desc}</p>
                        </div>

                        {/* Diff */}
                        <div className="p-12 bg-black/40 rounded-[40px] border border-white/5 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-colors" />
                            <div className="text-yellow-500 mb-6 font-mono text-xs uppercase tracking-widest border border-yellow-500/30 inline-block px-3 py-1 rounded-full">Module_02</div>
                            <h3 className="text-3xl font-black italic mb-4 text-white">{t.proFeatures.diff_title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{t.proFeatures.diff_desc}</p>
                        </div>

                        {/* AI Profiler */}
                        <div className="p-12 bg-black/40 rounded-[40px] border border-white/5 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
                            <div className="text-cyan-500 mb-6 font-mono text-xs uppercase tracking-widest border border-cyan-500/30 inline-block px-3 py-1 rounded-full">Module_03</div>
                            <h3 className="text-3xl font-black italic mb-4 text-white">{t.proFeatures.ai_title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{t.proFeatures.ai_desc}</p>
                        </div>

                        {/* Export */}
                        <div className="p-12 bg-black/40 rounded-[40px] border border-white/5 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
                            <div className="text-purple-500 mb-6 font-mono text-xs uppercase tracking-widest border border-purple-500/30 inline-block px-3 py-1 rounded-full">Module_04</div>
                            <h3 className="text-3xl font-black italic mb-4 text-white">{t.proFeatures.export_title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{t.proFeatures.export_desc}</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- INTERACTIVE DEMO (ANIMAZIONE RIPRISTINATA) --- */}
            <section id="demo" className="py-32 px-6 relative z-20 max-w-7xl mx-auto border-t border-white/5">
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

                    {/* SIMULATORE GRAFICO ANIMATO */}
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

            {/* --- WEB DEMO CTA SECTION --- */}
            <section className="pb-32 pt-10 px-6 relative z-20 max-w-5xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="bg-indigo-900/20 border border-indigo-500/30 rounded-[40px] p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 relative z-10">{t.webdemo.title_1} <span className="text-indigo-400">{t.webdemo.title_2}</span></h2>
                    <p className="text-zinc-400 mb-10 max-w-xl mx-auto relative z-10">{t.webdemo.desc}</p>
                    <Link to="/app" className="relative z-10 px-10 py-5 bg-white text-black rounded-xl font-black italic shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform inline-block">
                        {t.webdemo.btn}
                    </Link>
                </motion.div>
            </section>

            {/* --- ARCHITECTURE SECTION --- */}
            <section className="py-32 px-6 relative z-20 max-w-7xl mx-auto border-t border-white/5">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-10">
                            {t.architecture.title} <span className="text-indigo-500 block">{t.architecture.subtitle}</span>
                        </h2>
                        <div className="space-y-8">
                            {[
                                { title: t.architecture.card_1, desc: t.architecture.desc_1, color: "bg-orange-500" },
                                { title: t.architecture.card_2, desc: t.architecture.desc_2, color: "bg-emerald-500" },
                                { title: t.architecture.card_3, desc: t.architecture.desc_3, color: "bg-indigo-500" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className={`w-1 h-16 ${item.color} rounded-full flex-shrink-0`} />
                                    <div>
                                        <h4 className="text-xl font-black text-white uppercase tracking-wide italic mb-2">{item.title}</h4>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Visualizzazione Astratta Architettura */}
                    <div className="relative aspect-square md:aspect-video bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="text-center z-10 font-mono text-xs text-orange-400">
                            <div className="mb-2">[ OPERATING_SYSTEM_LEVEL ]</div>
                            <div className="p-6 border border-orange-500/50 rounded-xl bg-black/80 backdrop-blur shadow-[0_0_30px_rgba(249,115,22,0.15)] text-lg">
                                J-RAY_PRO.exe <br /> <span className="text-[10px] text-zinc-500">Built with Rust 🦀</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="pt-20 pb-10 border-t border-white/5 relative z-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">
                        {t.footer}
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono tracking-widest uppercase">
                        <Link to="/docs" className="text-zinc-500 hover:text-white transition-colors">Documentation</Link>
                        <Link to="/pricing" className="text-zinc-500 hover:text-white transition-colors">Pricing</Link>
                        <Link to="/terms" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
                        <a href="https://www.iubenda.com/privacy-policy/13130280" className="iubenda-white iubenda-noiframe iubenda-embed text-zinc-500 hover:text-white transition-colors decoration-0" title="Privacy Policy">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}