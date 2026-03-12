import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

const translations = {
    it: {
        back: "← TORNA ALLA HOME",
        title: "SCARICA",
        subtitle: "J-RAY PRO",
        version_label: "Ultima versione stabile:",
        desc: "L'engine nativo in Rust per dominare i tuoi dati. Scegli il tuo sistema operativo e inizia subito.",
        trial_title: "7 GIORNI DI TRIAL GRATUITO",
        trial_desc: "Scarica l'app e avviala. Nessuna carta di credito richiesta, nessuna registrazione. Hai 7 giorni per testare TUTTE le funzionalità PRO (Visual Diff, Radar API, X-Ray) senza limiti.",
        os: {
            win: "Download per Windows",
            mac: "Download per macOS",
            lin: "Download per Linux"
        },
        req_title: "Requisiti di Sistema",
        req_desc: "L'app è portable (nessuna installazione). Richiede una GPU compatibile con OpenGL/Vulkan per i 60 FPS. Funziona 100% offline.",
        pricing_cta: "Il tuo Trial è scaduto?",
        pricing_btn: "SCOPRI I PIANI E ACQUISTA LA LICENZA ➔"
    },
    en: {
        back: "← BACK TO HOME",
        title: "DOWNLOAD",
        subtitle: "J-RAY PRO",
        version_label: "Latest stable version:",
        desc: "The native Rust engine to tame your data. Choose your operating system and start immediately.",
        trial_title: "7-DAY FREE TRIAL",
        trial_desc: "Download and run the app. No credit card required, no sign-up. You get 7 days to test ALL PRO features (Visual Diff, API Radar, X-Ray) without limits.",
        os: {
            win: "Download for Windows",
            mac: "Download for macOS",
            lin: "Download for Linux"
        },
        req_title: "System Requirements",
        req_desc: "The app is portable (no installation). Requires an OpenGL/Vulkan compatible GPU for 60 FPS. Works 100% offline.",
        pricing_cta: "Has your Trial expired?",
        pricing_btn: "VIEW PLANS & BUY LICENSE ➔"
    }
};

export default function DownloadPage() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [version, setVersion] = useState<string>("v1.0.5"); // Fallback di sicurezza all'ultima creata
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://api.github.com/repos/MauryDevIta/j-ray-releases/releases/latest")
            .then(response => response.json())
            .then(data => {
                if (data && data.tag_name) {
                    setVersion(data.tag_name);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Errore nel recupero della versione da GitHub:", error);
                setIsLoading(false);
            });
    }, []);

    // 🎯 I NOMI CORRETTI COME DA TUA RELEASE SU GITHUB
    const getDownloadUrl = (os: 'win' | 'mac' | 'lin') => {
        const fileNames = {
            win: `J-RAY-PRO-Windows-${version}.exe`,
            mac: `J-RAY-PRO-Mac-Silicon-${version}`,
            lin: `J-RAY-PRO-Linux-${version}`
        };
        return `https://github.com/MauryDevIta/j-ray-releases/releases/download/${version}/${fileNames[os]}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="w-full flex-1 pb-20 relative">
            <div className="spotlight fixed inset-0 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
                <Link to="/" className="text-xs font-mono tracking-widest text-indigo-400 hover:text-white transition-colors mb-12 inline-block">
                    {t.back}
                </Link>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* HEADER */}
                    <motion.header variants={itemVariants} className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-4">
                            {t.title} <span className="text-indigo-500">{t.subtitle}</span>
                        </h1>
                        <div className="flex items-center justify-center gap-2 mb-6 h-6">
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{t.version_label}</span>
                            {isLoading ? (
                                <span className="w-12 h-4 bg-zinc-800 animate-pulse rounded"></span>
                            ) : (
                                <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 rounded text-xs font-bold font-mono">
                                    {version}
                                </span>
                            )}
                        </div>
                        <p className="text-zinc-400 font-mono text-sm tracking-wide max-w-xl mx-auto leading-relaxed">
                            {t.desc}
                        </p>
                    </motion.header>

                    {/* TRIAL INFO BOX */}
                    <motion.div variants={itemVariants} className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-8 md:p-10 text-center max-w-3xl mx-auto backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                        <h2 className="text-2xl font-black italic text-indigo-400 mb-4 uppercase">{t.trial_title}</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            {t.trial_desc}
                        </p>
                    </motion.div>

                    {/* DOWNLOAD BUTTONS */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

                        {/* 🪟 Windows */}
                        <a
                            href={getDownloadUrl('win')}
                            className="group relative p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-center flex flex-col items-center gap-4 overflow-hidden"
                        >
                            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🪟</div>
                            <div className="font-black tracking-wide text-lg text-white">{t.os.win}</div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">.exe Executable • Portable</div>
                        </a>

                        {/* 🍎 macOS Silicon */}
                        <a
                            href={getDownloadUrl('mac')}
                            className="group relative p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-white/50 hover:bg-white/10 transition-all text-center flex flex-col items-center gap-4 overflow-hidden"
                        >
                            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🍎</div>
                            <div className="font-black tracking-wide text-lg text-white">{t.os.mac}</div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">Native Binary • Apple Silicon</div>
                        </a>

                        {/* 🐧 Linux */}
                        <a
                            href={getDownloadUrl('lin')}
                            className="group relative p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center flex flex-col items-center gap-4 overflow-hidden"
                        >
                            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🐧</div>
                            <div className="font-black tracking-wide text-lg text-white">{t.os.lin}</div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">Native Binary • Portable</div>
                        </a>
                    </motion.div>

                    {/* SYSTEM REQ */}
                    <motion.div variants={itemVariants} className="text-center mt-10">
                        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">{t.req_title}</p>
                        <p className="text-zinc-600 text-xs max-w-lg mx-auto">{t.req_desc}</p>
                    </motion.div>

                    {/* PRICING CALL TO ACTION */}
                    <motion.div variants={itemVariants} className="mt-24 pt-16 border-t border-white/5 text-center">
                        <p className="text-zinc-400 mb-6 text-lg">{t.pricing_cta}</p>
                        <Link
                            to="/pricing"
                            className="inline-block px-10 py-5 bg-white text-black rounded-xl font-black italic shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform"
                        >
                            {t.pricing_btn}
                        </Link>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}