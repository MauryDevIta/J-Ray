import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const translations = {
    it: {
        back: "← TORNA ALLA HOME",
        title: "PRIVACY POLICY",
        subtitle: "Trasparenza totale sia Desktop che Web. I tuoi dati restano tuoi.",
        lastUpdated: "Ultimo aggiornamento: Marzo 2026",
        sections: [
            {
                title: "1. Elaborazione Locale (Desktop & Web Console)",
                content: "Sia l'applicazione desktop J-RAY PRO che la Web Console (Demo Online) sono progettate con la privacy come principio fondamentale. L'app desktop opera al 100% offline. La Web Console elabora i tuoi dati JSON e i calcoli del grafo interamente all'interno della memoria del tuo browser (client-side). Non carichiamo, raccogliamo, analizziamo, trasmettiamo o conserviamo MAI i tuoi file JSON, payload API o segreti sui nostri server. Ciò che accade sul tuo schermo, resta sul tuo schermo."
            },
            {
                title: "2. Quali dati raccogliamo e perché",
                content: "Raccogliamo solo il minimo indispensabile per fornirti il servizio, gestire l'assistenza e prevenire la pirateria:\n\n• Dati di Acquisto: Quando acquisti una licenza, riceviamo dal nostro gestore pagamenti il tuo indirizzo email, il nome fornito e l'ID dell'ordine. Non abbiamo mai accesso ai dettagli della tua carta di credito.\n• Hardware ID (Machine ID) e Hashing: Per far rispettare i limiti di utilizzo dell'App Desktop, J-RAY PRO genera un ID basato sull'hardware. Per la tua privacy, questo ID viene convertito in un hash crittografico (SHA-256) a livello locale *prima* di essere inviato ai nostri server. Tale hash viene utilizzato esclusivamente per validare la licenza."
            },
            {
                title: "3. Servizi di Terze Parti (Merchant of Record)",
                content: "Utilizziamo Lemon Squeezy, LLC come nostro Merchant of Record (MoR) ufficiale. Tutte le transazioni e la generazione delle chiavi sono gestite da loro. Il nostro sito web e la Web Console sono ospitati su infrastrutture sicure (es. Cloudflare) che possono raccogliere log di server standard (come indirizzi IP temporanei) unicamente per ragioni di sicurezza e prevenzione DDoS."
            },
            {
                title: "4. Cookie e Tracciamento",
                content: "Il nostro sito e la Web Console utilizzano esclusivamente cookie tecnici e il LocalStorage del browser strettamente necessari al funzionamento della piattaforma (es. gestire l'autenticazione o salvare le preferenze UI). Non utilizziamo script pubblicitari di terze parti o pixel di tracciamento."
            },
            {
                title: "5. Conservazione, Sicurezza e Rimborsi",
                content: "Conserviamo i dati legati alla tua licenza finché rimane attiva. Essendo un software digitale fornito con Web Demo e periodo di prova di 7 giorni per la valutazione, tutte le vendite sono definitive. Per i consumatori residenti nell'Unione Europea, l'attivazione della chiave comporta la perdita del diritto di recesso di 7 giorni."
            },
            {
                title: "6. I tuoi Diritti (GDPR & CCPA)",
                content: "Hai il diritto di richiedere l'accesso, la correzione o la cancellazione dei dati legati alla tua licenza in nostro possesso. Nota: la cancellazione comporterà la revoca della chiave di licenza senza rimborso.\n\nPer esercitare i tuoi diritti, contattaci all'indirizzo email fornito di seguito."
            }
        ],
        contact: "Hai domande sulla privacy? Contattaci a:",
        email: "support@jraypro.com"
    },
    en: {
        back: "← BACK TO HOME",
        title: "PRIVACY POLICY",
        subtitle: "Total transparency across Desktop & Web. Your data remains yours.",
        lastUpdated: "Last updated: March 2026",
        sections: [
            {
                title: "1. Local Data Processing (Desktop & Web Console)",
                content: "Both the J-RAY PRO desktop application and the Web Console (Online Demo) are designed with absolute privacy in mind. The Desktop app runs 100% offline. The Web Console processes your JSON data and graph calculations entirely within your browser's local memory (client-side). We NEVER upload, collect, analyze, transmit, or store your JSON files, API payloads, or secrets on our servers. What happens on your screen, stays on your screen."
            },
            {
                title: "2. What Data We Collect and Why",
                content: "We collect only the bare minimum necessary for operations and piracy prevention:\n\n• Purchase Data: When buying a license, we receive your email and order ID from our payment provider. We never see your credit card.\n• Hardware ID (Machine ID) & Hashing: To enforce device limits for the Desktop App, J-RAY PRO generates an ID based on your hardware. For your privacy, this is converted into a one-way hash (SHA-256) locally *before* reaching our servers. This hashed ID is used strictly to validate your license."
            },
            {
                title: "3. Third-Party Services (Merchant of Record)",
                content: "We use Lemon Squeezy, LLC as our official Merchant of Record (MoR). All transactions and key generation are securely handled by them. Our website and Web Console are hosted on secure infrastructure (e.g., Cloudflare) which may collect standard server logs (such as temporary IP addresses) solely for DDoS prevention and routing."
            },
            {
                title: "4. Cookies and Tracking",
                content: "Our website and Web Console use only essential technical cookies and browser LocalStorage necessary for the platform to function (e.g., authentication, UI preferences). We do not use third-party advertising scripts or tracking pixels."
            },
            {
                title: "5. Data Retention, Security, and Refunds",
                content: "We retain your license data while your license is active. Because we provide a fully functional Web Demo and a 7-day free trial to evaluate the Software, all sales are final. For EU consumers, activating the License Key expressly waives your 7-day right of withdrawal."
            },
            {
                title: "6. Your Rights (GDPR & CCPA)",
                content: "You have the right to access, correct, or request deletion of your license data. Note: Deletion will irreversibly revoke your license key without a refund.\n\nTo exercise your rights, please contact us at the email below."
            }
        ],
        contact: "Questions about privacy? Contact us at:",
        email: "support@jraypro.com"
    }
};

export default function PrivacyPage() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div className="w-full relative flex-1 pb-20">
            <motion.div className="progress-bar fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[200]" style={{ scaleX }} />
            <div className="spotlight fixed inset-0 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
                <Link to="/" className="text-xs font-mono tracking-widest text-indigo-400 hover:text-white transition-colors mb-12 inline-block">
                    {t.back}
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-4">
                        {t.title}
                    </h1>
                    <p className="text-indigo-400 font-mono text-sm tracking-wide mb-2">{t.subtitle}</p>
                    <p className="text-zinc-500 font-mono text-xs">{t.lastUpdated}</p>
                </header>

                <div className="space-y-12">
                    {t.sections.map((section, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-black/40 border border-white/5 p-8 md:p-10 rounded-[30px] backdrop-blur-sm"
                        >
                            <h2 className="text-2xl font-black italic uppercase text-white mb-6">
                                {section.title}
                            </h2>
                            <div className="text-zinc-400 leading-relaxed font-mono text-sm whitespace-pre-line">
                                {section.content}
                            </div>
                        </motion.section>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-white/5 pt-10">
                    <p className="text-zinc-500 mb-2">{t.contact}</p>
                    <a href={`mailto:${t.email}`} className="text-indigo-400 font-black hover:text-white text-xl transition-colors">
                        {t.email}
                    </a>
                </div>
            </div>
        </div>
    );
}