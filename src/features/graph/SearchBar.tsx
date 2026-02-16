import { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const { getNodes, setCenter, zoomTo } = useReactFlow();
    const { lang } = useLanguage();
    const t = translations[lang];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Evita il refresh della pagina

        if (!search.trim()) return;

        // 1. Cerca il nodo che contiene il testo (nella chiave o nel valore)
        const nodes = getNodes();
        const foundNode = nodes.find((node) => {
            const label = (node.data.label || '').toLowerCase();
            const value = (node.data.value || '').toLowerCase();
            const query = search.toLowerCase();
            return label.includes(query) || value.includes(query);
        });

        // 2. Se trovato, vola lì!
        if (foundNode) {
            // Calcoliamo il centro del nodo (assumendo larghezza standard 250x100)
            const x = foundNode.position.x + 125;
            const y = foundNode.position.y + 50;

            // Animazione fluida verso il nodo
            setCenter(x, y, { zoom: 1.5, duration: 1200 });
        } else {
            alert(t.visualizer.node_not_found);
        }
    };

    return (
        <div className="absolute top-8 right-8 z-50">
            <form
                onSubmit={handleSearch}
                className="relative group flex items-center"
            >
                {/* Effetto Glow dietro */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder={t.visualizer.search_placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="relative w-64 bg-[#09090b]/90 backdrop-blur-xl border border-white/10 text-zinc-300 px-5 py-3 rounded-full outline-none focus:border-cyan-500/50 focus:text-white transition-all shadow-2xl font-['JetBrains_Mono'] text-xs tracking-wider pl-12"
                />

                {/* Icona Lente (Posizionata sopra l'input) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors z-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </form>
        </div>
    );
}