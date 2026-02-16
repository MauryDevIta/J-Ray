import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    setLang: (lang: Language) => void;
    t: (key: string) => string; // Helper opzionale per traduzioni future
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('jray_lang_v2');
        return (saved === 'it' || saved === 'en') ? saved : 'en'; // Default EN
    });

    useEffect(() => {
        localStorage.setItem('jray_lang_v2', lang);
    }, [lang]);

    const toggleLang = () => {
        setLangState(prev => prev === 'it' ? 'en' : 'it');
    };

    const setLang = (newLang: Language) => {
        setLangState(newLang);
    };

    // Placeholder per futura logica di traduzione centralizzata se necessario
    const t = (key: string) => key;

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
