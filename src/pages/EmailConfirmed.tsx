import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function EmailConfirmed() {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);
    const { lang } = useLanguage();
    const t = translations[lang];

    useEffect(() => {
        // Countdown visivo
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        // Redirect effettivo dopo 3.5 secondi
        const redirect = setTimeout(() => {
            navigate('/app');
        }, 3500);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="h-screen w-screen bg-[#050508] flex items-center justify-center font-mono text-white overflow-hidden relative">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,23,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,23,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <div className="z-10 text-center space-y-8 max-w-md w-full px-6">

                {/* Icona Successo Animata */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>

                <div>
                    <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">
                        {t.email_confirmed.title}
                    </h1>
                    <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">
                        {t.email_confirmed.desc}
                    </p>
                </div>

                {/* Loading Bar */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                    />
                </div>

                <div className="text-[10px] text-zinc-600">
                    {t.email_confirmed.initializing} <span className="text-white font-bold">{count}s</span>
                </div>
            </div>
        </div>
    );
}