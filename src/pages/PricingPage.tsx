import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- TRADUZIONI ---
const translations = {
    it: {
        nav: { console: "CONSOLE", logout: "LOGOUT_", launch: "WEB DEMO", docs: "DOCS", terms: "TERMS" },
        back: "← TORNA ALLA HOME",
        header: {
            title_1: "SCEGLI LA TUA",
            title_2: "LICENZA",
            subtitle: "Paga una volta. Nessun abbonamento. Nessun tracciamento."
        },
        pricing: {
            personal: {
                name: "PERSONAL",
                desc: "Per sviluppatori individuali che vogliono dominare i JSON.",
                price: "5",
                devices: "Valida per 1 dispositivo",
                features: [
                    "Motore Rendering Nativo (Rust)",
                    "Parsing Real-Time illimitato",
                    "Smart Stack per array giganti",
                    "X-Ray Decrypter (JWT/Base64)",
                    "Aggiornamenti futuri inclusi"
                ],
                btn: "ACQUISTA PERSONAL"
            },
            pro: {
                name: "PRO",
                badge: "CONSIGLIATO",
                desc: "La suite definitiva per data analyst e architetti del software.",
                price: "10",
                devices: "Valida per 2 dispositivi",
                includes: "Tutto quello in Personal, più:",
                features: [
                    "Live API Radar",
                    "Visual JSON Diff",
                    "AI Data Profiler",
                    "Esportazione Vettoriale (SVG 4K)",
                    "Code Gen (TS, Rust, Python)"
                ],
                btn: "SBLOCCA J-RAY PRO"
            }
        },
        trial: {
            title: "Non sei ancora sicuro?",
            desc: "Scarica J-RAY PRO e provalo gratuitamente per 7 giorni. Tutte le funzionalità PRO sono sbloccate durante il periodo di prova.",
            btn: "SCARICA LA TRIAL (WINDOWS .EXE)",
            note: "Nessuna carta di credito richiesta."
        },
        faq: {
            title: "FAQ",
            q1: "È un abbonamento mensile?",
            a1: "No. Odiamo gli abbonamenti quanto te. Paghi una volta sola (Lifetime) e la licenza è tua per sempre.",
            q2: "Cosa succede dopo i 7 giorni di Trial?",
            a2: "L'applicazione si bloccherà e ti verrà chiesto di inserire una chiave di licenza (Personal o PRO) per continuare a usarla. Nessun addebito automatico.",
            q3: "Posso fare l'upgrade da Personal a PRO in futuro?",
            a3: "Certamente. Basterà acquistare la licenza PRO e inserirla nel software per sbloccare istantaneamente i moduli avanzati."
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    },
    en: {
        nav: { console: "CONSOLE", logout: "LOGOUT_", launch: "WEB DEMO", docs: "DOCS", terms: "TERMS" },
        back: "← BACK TO HOME",
        header: {
            title_1: "CHOOSE YOUR",
            title_2: "LICENSE",
            subtitle: "Pay once. No subscriptions. No tracking."
        },
        pricing: {
            personal: {
                name: "PERSONAL",
                desc: "For individual developers who want to tame JSON chaos.",
                price: "€5",
                devices: "Valid for 1 device",
                features: [
                    "Native Rendering Engine (Rust)",
                    "Unlimited Real-Time Parsing",
                    "Smart Stack for huge arrays",
                    "X-Ray Decrypter (JWT/Base64)",
                    "Future updates included"
                ],
                btn: "GET PERSONAL"
            },
            pro: {
                name: "PRO",
                badge: "RECOMMENDED",
                desc: "The ultimate suite for data analysts and software architects.",
                price: "€10",
                devices: "Valid for 2 devices",
                includes: "Everything in Personal, plus:",
                features: [
                    "Live API Radar",
                    "Visual JSON Diff",
                    "AI Data Profiler",
                    "Vector Export (4K SVG)",
                    "Code Gen (TS, Rust, Python)"
                ],
                btn: "UNLOCK J-RAY PRO"
            }
        },
        trial: {
            title: "Not entirely sure yet?",
            desc: "Download J-RAY PRO and try it free for 7 days. All PRO features are fully unlocked during the trial period.",
            btn: "DOWNLOAD TRIAL (WINDOWS .EXE)",
            note: "No credit card required."
        },
        faq: {
            title: "FAQ",
            q1: "Is this a monthly subscription?",
            a1: "No. We hate subscriptions as much as you do. You pay once (Lifetime) and the license is yours forever.",
            q2: "What happens after the 7-day Trial?",
            a2: "The application will lock and prompt you to enter a license key (Personal or PRO) to continue. There are no automatic charges.",
            q3: "Can I upgrade from Personal to PRO later?",
            a3: "Absolutely. Just purchase a PRO license and enter it into the software to instantly unlock the advanced modules."
        },
        footer: "© 2026 J-RAY Systems // All systems nominal"
    }
};

export default function PricingPage() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });


    return (
        <div className="w-full relative flex-1 pb-20">
            <motion.div className="progress-bar fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[200]" style={{ scaleX }} />
            <div className="spotlight fixed inset-0 pointer-events-none" />



            {/* --- HEADER --- */}
            <header className="pt-40 pb-16 px-6 text-center relative z-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Link to="/" className="text-[10px] font-mono tracking-widest text-indigo-400 hover:text-white transition-colors mb-8 inline-block">
                        {t.back}
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-tight">
                        {t.header.title_1} <br /> <span className="text-indigo-500">{t.header.title_2}</span>
                    </h1>
                    <p className="font-mono text-zinc-400 text-sm md:text-base mt-6 tracking-wide">
                        {t.header.subtitle}
                    </p>
                </motion.div>
            </header>

            {/* --- PRICING CARDS --- */}
            <main className="px-6 relative z-20 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                    {/* PERSONAL CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-black/40 border border-white/10 rounded-[40px] p-10 flex flex-col backdrop-blur-md hover:border-cyan-500/50 transition-colors"
                    >
                        <h3 className="text-3xl font-black italic text-cyan-400 mb-2">{t.pricing.personal.name}</h3>
                        <p className="text-zinc-400 text-sm h-10">{t.pricing.personal.desc}</p>
                        <div className="my-8">
                            <span className="text-5xl font-black text-white">{t.pricing.personal.price}</span>
                            <span className="text-zinc-500 text-sm ml-2 font-mono uppercase">/ lifetime</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-400 mb-8 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full inline-block self-start">
                            {t.pricing.personal.devices}
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow text-sm text-zinc-300">
                            {t.pricing.personal.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="text-cyan-500">✓</span> {feat}
                                </li>
                            ))}
                        </ul>
                        {/* 📝 INCOLLA QUI IL LINK LEMON SQUEEZY PER LA VERSIONE PERSONAL */}
                        <a href="https://j-ray-pro.lemonsqueezy.com/checkout/buy/9a97c742-bfa5-434f-8a27-5d859ad37e6c" className="w-full py-4 text-center rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black italic tracking-widest uppercase transition-all border border-white/5">
                            {t.pricing.personal.btn}
                        </a>
                    </motion.div>

                    {/* PRO CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-indigo-900/10 border-2 border-indigo-500 rounded-[40px] p-10 flex flex-col backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)]"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h3 className="text-3xl font-black italic text-pink-400">{t.pricing.pro.name}</h3>
                            <span className="text-[10px] font-black tracking-widest uppercase bg-indigo-500 text-white px-3 py-1 rounded-full animate-pulse">
                                {t.pricing.pro.badge}
                            </span>
                        </div>
                        <p className="text-zinc-400 text-sm h-10 relative z-10">{t.pricing.pro.desc}</p>
                        <div className="my-8 relative z-10">
                            <span className="text-5xl font-black text-white">{t.pricing.pro.price}</span>
                            <span className="text-zinc-500 text-sm ml-2 font-mono uppercase">/ lifetime</span>
                        </div>
                        <div className="text-xs font-mono text-pink-400 mb-8 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full inline-block self-start relative z-10">
                            {t.pricing.pro.devices}
                        </div>

                        <div className="mb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest relative z-10">
                            {t.pricing.pro.includes}
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow text-sm text-white font-medium relative z-10">
                            {t.pricing.pro.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="text-pink-500">⚡</span> {feat}
                                </li>
                            ))}
                        </ul>
                        {/* 📝 INCOLLA QUI IL LINK LEMON SQUEEZY PER LA VERSIONE PRO */}
                        <a href="https://j-ray-pro.lemonsqueezy.com/checkout/buy/ad0873a1-d70a-4a26-8e86-3151332b724f" className="w-full py-4 text-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black italic tracking-widest uppercase transition-all shadow-[0_10px_30px_rgba(79,70,229,0.4)] hover:scale-105 relative z-10">
                            {t.pricing.pro.btn}
                        </a>
                    </motion.div>

                </div>

                {/* --- TRIAL SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-20 p-10 bg-zinc-900/50 border border-white/5 rounded-[40px] text-center max-w-3xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
                    <h4 className="text-2xl font-black italic mb-4 relative z-10">{t.trial.title}</h4>
                    <p className="text-zinc-400 text-sm mb-8 relative z-10">{t.trial.desc}</p>

                    {/* 📝 INCOLLA QUI IL LINK PER SCARICARE IL FILE .EXE DAL TUO SITO O DA GITHUB RELEASES */}
                    <a href="https://tuo-sito.com/download/jray-pro-installer.exe" className="inline-block px-10 py-4 bg-white text-black font-black italic rounded-xl hover:scale-105 transition-transform relative z-10">
                        {t.trial.btn}
                    </a>
                    <p className="text-xs text-zinc-600 font-mono mt-4 uppercase tracking-widest relative z-10">{t.trial.note}</p>
                </motion.div>

                {/* --- FAQ SECTION --- */}
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="mt-32 max-w-3xl mx-auto"
                >
                    <h3 className="text-3xl font-black italic uppercase mb-10 text-center tracking-tighter">{t.faq.title}</h3>
                    <div className="space-y-8">
                        {[
                            { q: t.faq.q1, a: t.faq.a1 },
                            { q: t.faq.q2, a: t.faq.a2 },
                            { q: t.faq.q3, a: t.faq.a3 }
                        ].map((faq, idx) => (
                            <div key={idx} className="border-b border-white/5 pb-6">
                                <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </main>


        </div>
    );
}