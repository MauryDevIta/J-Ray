import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
    it: {
        nav: {
            home: "HOME",
            pricing: "PRICING",
            docs: "DOCS",
            download: "DOWNLOAD",
            terms: "TERMS",
            privacy: "PRIVACY",
            console: "CONSOLE",
            logout: "LOGOUT_",
            launch: "WEB DEMO"
        }
    },
    en: {
        nav: {
            home: "HOME",
            pricing: "PRICING",
            docs: "DOCS",
            download: "DOWNLOAD",
            terms: "TERMS",
            privacy: "PRIVACY",
            console: "CONSOLE",
            logout: "LOGOUT_",
            launch: "WEB DEMO"
        }
    }
};

export default function Navbar() {
    const { lang, setLang } = useLanguage();
    const t = translations[lang];
    const navigate = useNavigate();
    const location = useLocation();
    const [session, setSession] = useState<any>(null);

    const isHome = location.pathname === '/';
    const [isVisible, setIsVisible] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setIsVisible(true);
            return;
        }

        setIsVisible(false);
        const handleHeroReady = () => setIsVisible(true);
        window.addEventListener('hero-ready', handleHeroReady);
        return () => window.removeEventListener('hero-ready', handleHeroReady);
    }, [isHome]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        navigate('/');
    };

    // Helper for active link highlighting
    const isActive = (path: string) => location.pathname === path;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={isHome ? { y: -100, opacity: 0 } : false}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/40"
                >
                    <Link to="/" className="text-xl md:text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        J-RAY
                    </Link>

                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Custom Nav Links */}
                        <div className="hidden lg:flex items-center gap-5 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                            <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.home}</Link>
                            <Link to="/pricing" className={`transition-colors ${isActive('/pricing') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.pricing}</Link>
                            <Link to="/docs" className={`transition-colors ${isActive('/docs') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.docs}</Link>
                            <Link to="/download" className={`transition-colors ${isActive('/download') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.download}</Link>
                            <Link to="/terms" className={`transition-colors ${isActive('/terms') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.terms}</Link>
                            <Link to="/privacy" className={`transition-colors ${isActive('/privacy') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'hover:text-white'}`}>{t.nav.privacy}</Link>
                        </div>

                        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 shrink-0">
                            <button onClick={() => setLang('it')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'it' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>IT</button>
                            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>EN</button>
                        </div>

                        {session ? (
                            <div className="flex items-center gap-3 shrink-0">
                                <Link to="/app" className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase hidden sm:block">{t.nav.console}</Link>
                                <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-full hover:bg-red-500 hover:text-white transition-all">
                                    {t.nav.logout}
                                </button>
                            </div>
                        ) : (
                            <Link to="/app" className="shrink-0 px-5 py-2 md:px-6 md:py-2.5 bg-white text-black text-[10px] md:text-xs font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                {t.nav.launch}
                            </Link>
                        )}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
