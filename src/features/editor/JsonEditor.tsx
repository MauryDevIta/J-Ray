import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';
import './syntax-highlight.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';
import { useState } from 'react';

interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    onGenerate: () => void;
    onDownload: (format: 'png' | 'svg') => void;
}

export default function JsonEditor({ value, onChange, onGenerate, onDownload }: JsonEditorProps) {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [formatError, setFormatError] = useState(false);
    const [tsCopied, setTsCopied] = useState(false);

    // ✨ 1. FORMATTAZIONE JSON
    const handlePrettify = () => {
        try {
            const parsedObj = JSON.parse(value);
            const prettyJson = JSON.stringify(parsedObj, null, 2);
            onChange(prettyJson);
            setFormatError(false);
        } catch (error) {
            setFormatError(true);
            setTimeout(() => setFormatError(false), 800);
        }
    };

    // 🧠 2. GENERATORE TYPESCRIPT (La Killer Feature)
    const handleGenerateTS = () => {
        try {
            const obj = JSON.parse(value);
            let output = '';
            const generated = new Set<string>();

            // Motore ricorsivo per mappare gli oggetti in Interfacce TS
            const parseObject = (data: any, name: string) => {
                if (generated.has(name)) return name;
                generated.add(name);

                let props = '';
                for (const key in data) {
                    const val = data[key];
                    // Capitalizza la chiave per il nome della sub-interfaccia
                    const typeName = key.charAt(0).toUpperCase() + key.slice(1);

                    if (val === null) {
                        props += `  ${key}: any | null;\n`;
                    } else if (Array.isArray(val)) {
                        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
                            parseObject(val[0], typeName);
                            props += `  ${key}: ${typeName}[];\n`;
                        } else if (val.length > 0) {
                            props += `  ${key}: ${typeof val[0]}[];\n`;
                        } else {
                            props += `  ${key}: any[];\n`;
                        }
                    } else if (typeof val === 'object') {
                        parseObject(val, typeName);
                        props += `  ${key}: ${typeName};\n`;
                    } else {
                        props += `  ${key}: ${typeof val};\n`;
                    }
                }
                output = `export interface ${name} {\n${props}}\n\n` + output;
                return name;
            };

            // Avvio del parsing
            if (Array.isArray(obj)) {
                parseObject(obj[0] || {}, 'RootItem');
                output += `export type Root = RootItem[];\n`;
            } else {
                parseObject(obj, 'RootObject');
            }

            // Copia negli appunti
            navigator.clipboard.writeText(output.trim());
            setTsCopied(true);
            setTimeout(() => setTsCopied(false), 2000); // Torna normale dopo 2 sec
            setFormatError(false);
        } catch (error) {
            setFormatError(true);
            setTimeout(() => setFormatError(false), 800);
        }
    };

    return (
        <div className="absolute top-6 left-6 bottom-6 w-[400px] z-50 flex flex-col rounded-3xl overflow-hidden backdrop-blur-2xl bg-[#09090b]/90 border border-white/5 shadow-2xl ring-1 ring-white/5">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-4">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="font-['JetBrains_Mono'] text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
                        {t.visualizer.input_label || "INPUT"}
                    </div>
                </div>

                {/* BOTTONI MAGICI IN ALTO A DESTRA */}
                <div className="flex items-center gap-2">
                    {/* Tasto TS Generator */}
                    <button
                        onClick={handleGenerateTS}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all duration-300 text-[9px] font-black uppercase tracking-wider
                            ${tsCopied
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500 hover:text-white hover:border-blue-400'
                            }
                        `}
                        title="Generate & Copy TypeScript Interfaces"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                        </svg>
                        <span>{tsCopied ? 'Copied!' : 'TS'}</span>
                    </button>

                    {/* Tasto Prettify */}
                    <button
                        onClick={handlePrettify}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all duration-300 text-[9px] font-black uppercase tracking-wider
                            ${formatError
                                ? 'bg-red-500/20 text-red-400 border-red-500/50'
                                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500 hover:text-white hover:border-indigo-400'
                            }
                        `}
                        title="Formatta JSON"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        <span>{formatError ? 'Error' : 'Format'}</span>
                    </button>
                </div>
            </div>

            {/* Area Codice */}
            <div className="flex-1 relative overflow-auto custom-scrollbar bg-[#09090b]">
                <Editor
                    value={value}
                    onValueChange={onChange}
                    highlight={(code) => highlight(code, languages.json, 'json')}
                    padding={24}
                    className="font-['JetBrains_Mono'] text-sm"
                    style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 14,
                        backgroundColor: 'transparent',
                        minHeight: '100%',
                    }}
                    textareaClassName="focus:outline-none"
                />
            </div>

            {/* Footer con bottoni */}
            <div className="p-6 border-t border-white/5 bg-black/20 flex gap-3">

                {/* Gruppo Download: PNG e SVG */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onDownload('png')}
                        title="Download PNG"
                        className="group flex items-center justify-center px-4 h-14 bg-[#18181b] rounded-xl border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all active:scale-95 cursor-pointer"
                    >
                        <span className="font-['JetBrains_Mono'] text-xs font-bold text-zinc-400 group-hover:text-indigo-400 transition-colors">PNG</span>
                    </button>
                    <button
                        onClick={() => onDownload('svg')}
                        title="Download SVG"
                        className="group flex items-center justify-center px-4 h-14 bg-[#18181b] rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all active:scale-95 cursor-pointer"
                    >
                        <span className="font-['JetBrains_Mono'] text-xs font-bold text-zinc-400 group-hover:text-cyan-400 transition-colors">SVG</span>
                    </button>
                </div>

                {/* Bottone RUN (Principale) */}
                <button
                    onClick={onGenerate}
                    className="flex-1 group relative cursor-pointer"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative h-14 flex items-center justify-center gap-3 px-6 bg-[#18181b] rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all active:scale-[0.98]">
                        <span className="text-indigo-400 group-hover:text-white font-bold font-['JetBrains_Mono'] uppercase tracking-wider text-sm transition-colors">
                            ⚡ {t.visualizer.run || "RUN"}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}

