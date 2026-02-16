import { useReactFlow } from 'reactflow';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

interface GraphControlsProps {
    onToggleDirection: () => void; // Nuova funzione passata dall'App
}

export default function GraphControls({ onToggleDirection }: GraphControlsProps) {
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <div className="absolute bottom-8 right-8 flex items-center gap-2 p-2 rounded-2xl bg-[#09090b]/80 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5 z-50">

            <div className="px-3 py-2 border-r border-white/10 hidden sm:block">
                <span className="font-['JetBrains_Mono'] text-[10px] text-zinc-500 uppercase tracking-widest">
                    {t.visualizer.controls}
                </span>
            </div>

            {/* Zoom Out */}
            <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all active:scale-90" title="Zoom Out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
            </button>

            {/* Tasto RUOTA LAYOUT (Nuovo!) */}
            <button
                onClick={onToggleDirection}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-indigo-500/20 text-zinc-400 hover:text-indigo-400 border border-transparent hover:border-indigo-500/50 transition-all active:scale-90 group"
                title="Ruota Verticale/Orizzontale"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>

            {/* Fit View */}
            <button onClick={() => fitView({ padding: 0.2, duration: 800 })} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all active:scale-90" title="Reset View">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
            </button>

            {/* Zoom In */}
            <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all active:scale-90" title="Zoom In">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </button>

        </div>
    );
}