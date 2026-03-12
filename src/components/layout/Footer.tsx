import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
    it: {
        footer: "© 2026 J-RAY Systems // All systems nominal"
    },
    en: {
        footer: "© 2026 J-RAY Systems // All systems nominal"
    }
};

export default function Footer() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <footer className="pt-10 pb-10 border-t border-white/5 relative z-20 bg-black/20 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">
                    {t.footer}
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono tracking-widest uppercase">
                    <Link to="/docs" className="text-zinc-500 hover:text-white transition-colors">Documentation</Link>
                    <Link to="/pricing" className="text-zinc-500 hover:text-white transition-colors">Pricing</Link>
                    <Link to="/terms" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/privacy" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
