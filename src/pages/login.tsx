import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- TYPEWRITER (Centrato e senza sbalzi) ---
function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        const timer = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 40);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span className="inline-block">
            {displayedText}
            <span className="animate-pulse text-indigo-500 ml-1 font-light">|</span>
        </span>
    );
}

const translations = {
    it: {
        welcome: "BENVENUTO_OPERATORE",
        init: "INIZIALIZZA_CORE",
        status: "Stato_Auth:",
        verified: "Verificato",
        new: "Nuovo_Ingresso",
        email_ph: "INDIRIZZO_EMAIL",
        pass_ph: "CODICE_ACCESSO",
        conf_ph: "CONFERMA_CODICE",
        btn_login: "Autorizza_Accesso",
        btn_signup: "Sincronizza_Core",
        processing: "Elaborazione...",
        req_id: "[ Richiedi_Nuovo_ID ]",
        use_id: "[ Usa_ID_Esistente ]",
        abort: "Termina_Sessione",
        legal_1: "Procedendo con l'accesso, accetti i nostri ",
        legal_terms: "Termini di Servizio",
        legal_2: " e confermi di aver letto la ",
        legal_privacy: "Privacy Policy",
    },
    en: {
        welcome: "WELCOME_OPERATOR",
        init: "INITIALIZE_CORE",
        status: "Auth_Status:",
        verified: "Verified",
        new: "New_Entry",
        email_ph: "EMAIL_ADDRESS",
        pass_ph: "ACCESS_CODE",
        conf_ph: "CONFIRM_CODE",
        btn_login: "Authorize_Access",
        btn_signup: "Sync_Core",
        processing: "Processing...",
        req_id: "[ Request_New_ID ]",
        use_id: "[ Use_Existing_ID ]",
        abort: "Abort_Session",
        legal_1: "By proceeding, you agree to our ",
        legal_terms: "Terms of Service",
        legal_2: " and confirm you have read our ",
        legal_privacy: "Privacy Policy",
    }
};

export default function Login() {
    const { lang, setLang } = useLanguage();
    const t = translations[lang];
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    // --- LOGICA SOCIAL LOGIN OTTIMIZZATA ---
    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + '/app',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) {
            console.error(`Errore durante il login con ${provider}:`, error.message);
            setErrorMsg(error.message);
            setLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                navigate('/app');
            } else {
                if (password !== confirmPassword) throw new Error("Passwords mismatch");
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert("Core Initialized! Check your email for confirmation.");
                setIsLogin(true);
            }
        } catch (err: any) {
            setErrorMsg(err.message || "Access Denied");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#050508] overflow-hidden relative selection:bg-indigo-500/30 font-sans">

            <div className="absolute top-8 right-8 z-50 flex gap-2">
                <button onClick={() => setLang('it')} className={`text-[10px] font-black ${lang === 'it' ? 'text-indigo-500' : 'text-zinc-600'} hover:text-white transition-colors`}>IT</button>
                <div className="h-3 w-[1px] bg-zinc-800 self-center" />
                <button onClick={() => setLang('en')} className={`text-[10px] font-black ${lang === 'en' ? 'text-indigo-500' : 'text-zinc-600'} hover:text-white transition-colors`}>EN</button>
            </div>

            {/* Back Button */}
            <Link to="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-600 hover:text-indigo-400 transition-all font-mono text-[10px] tracking-[0.2em] uppercase group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>{t.abort}</span>
            </Link>

            <div className="absolute inset-0 cyber-bg opacity-[0.15] pointer-events-none" />

            <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-[400px] z-20 px-6">
                <div className="relative bg-[#0d0d12] p-8 md:p-10 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    <div className="text-center mb-10 h-16 flex flex-col justify-center">
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">
                            <Typewriter key={lang} text={isLogin ? t.welcome : t.init} />
                        </h2>
                        <div className="mt-2 text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
                            {t.status} <span className="text-indigo-500/80">{isLogin ? t.verified : t.new}</span>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-3">
                            <input
                                type="email" required placeholder={t.email_ph}
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full p-4 bg-black/40 rounded-xl border border-white/5 focus:border-indigo-500/50 outline-none transition-all font-mono text-[11px] text-white placeholder:text-zinc-700"
                            />
                            <input
                                type="password" required placeholder={t.pass_ph}
                                value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full p-4 bg-black/40 rounded-xl border border-white/5 focus:border-indigo-500/50 outline-none transition-all font-mono text-[11px] text-white placeholder:text-zinc-700"
                            />

                            <AnimatePresence>
                                {!isLogin && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-1 overflow-hidden">
                                        <input
                                            type="password" required placeholder={t.conf_ph}
                                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                            className="w-full p-4 bg-black/40 rounded-xl border border-white/5 focus:border-cyan-500/50 outline-none transition-all font-mono text-[11px] text-white placeholder:text-zinc-700"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {errorMsg && (
                            <div className="text-red-500 text-[9px] font-mono uppercase text-center py-2 border-b border-red-500/20">
                                ! {errorMsg}
                            </div>
                        )}

                        <button disabled={loading} className="w-full py-4 bg-white text-black hover:bg-indigo-500 hover:text-white transition-all font-black text-xs uppercase italic tracking-widest rounded-xl active:scale-[0.97]">
                            {loading ? t.processing : isLogin ? t.btn_login : t.btn_signup}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" onClick={() => handleSocialLogin('github')} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group">
                                <svg className="w-4 h-4 fill-zinc-500 group-hover:fill-white" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                <span className="text-[9px] font-bold text-zinc-500 group-hover:text-white uppercase">GitHub</span>
                            </button>
                            <button type="button" onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group">
                                <svg className="w-4 h-4 group-hover:scale-110" viewBox="0 0 24 24"><path fill="#EA4335" d="M24 12.27c0-.85-.07-1.74-.22-2.58H12.24v4.92h6.63c-.28 1.53-1.13 2.82-2.39 3.69v3.06h3.86c2.26-2.09 3.66-5.17 3.66-9.09z" /><path fill="#FBBC05" d="M12.24 24c3.24 0 5.96-1.07 7.96-2.91l-3.86-3.06c-1.07.72-2.45 1.15-4.1 1.15-3.15 0-5.83-2.13-6.79-5H1.51v3.14C3.49 21.23 7.57 24 12.24 24z" /><path fill="#34A853" d="M5.45 14.18c-.24-.72-.38-1.5-.38-2.32s.14-1.6.38-2.32V6.4H1.51C.55 8.32 0 10.45 0 12.5s.55 4.18 1.51 6.1l3.94-3.14z" /><path fill="#4285F4" d="M12.24 4.82c1.76 0 3.34.6 4.58 1.79l3.44-3.44C18.2 1.2 15.48 0 12.24 0 7.57 0 3.49 2.77 1.51 6.4L5.45 9.54c.96-2.87 3.64-5 6.79-5z" /></svg>
                                <span className="text-[9px] font-bold text-zinc-500 group-hover:text-white uppercase">Google</span>
                            </button>
                        </div>

                        {/* LEGAL DISCLAIMER SECTION */}
                        <p className="text-[9px] text-zinc-600 text-center mt-6 max-w-xs mx-auto leading-relaxed font-mono">
                            {t.legal_1}
                            <a
                                href="https://www.iubenda.com/privacy-policy/13130280"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-indigo-400 transition-colors"
                            >
                                {t.legal_terms}
                            </a>
                            {t.legal_2}
                            <a
                                href="https://www.iubenda.com/privacy-policy/13130280/cookie-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-indigo-400 transition-colors"
                            >
                                {t.legal_privacy}
                            </a>.
                        </p>

                        <button type="button" onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} className="w-full mt-6 text-zinc-600 hover:text-white text-[9px] font-bold uppercase tracking-[0.2em] transition-colors">
                            {isLogin ? t.req_id : t.use_id}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}