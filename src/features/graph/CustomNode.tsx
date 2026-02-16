import { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

const getTypeBadgeDetails = (value: any) => {
    if (value === null || value === 'null') {
        return { label: 'NULL', style: 'bg-red-500/20 text-red-300 border-red-500/50' };
    }
    let realValue = value;
    if (typeof value === 'string') {
        if (value === 'true' || value === 'false') realValue = value === 'true';
        else if (!isNaN(Number(value)) && value.trim() !== '') realValue = Number(value);
    }
    switch (typeof realValue) {
        case 'string': return { label: 'STR', style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' };
        case 'number': return { label: 'NUM', style: 'bg-orange-500/20 text-orange-300 border-orange-500/50' };
        case 'boolean': return { label: 'BOOL', style: 'bg-purple-500/20 text-purple-300 border-purple-500/50' };
        default: return { label: 'RAW', style: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/50' };
    }
};

const CustomNode = ({ id, data, isConnectable, selected }: NodeProps) => {
    const isObject = data.value === "{Object}" || data.value === "[Array]" || String(data.value).startsWith("[Array");
    const badge = !isObject ? getTypeBadgeDetails(data.value) : null;

    // --- MAGIA NERA: STATI PER L'EDITING ---
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(String(data.value));
    const inputRef = useRef<HTMLInputElement>(null);

    // Quando entra in modalità edit, metti a fuoco l'input
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        alert(`Path copiato: ${id}`);
    };

    // --- MAGIA NERA: FUNZIONE DI SALVATAGGIO ---
    const handleSave = () => {
        setIsEditing(false);
        // Se il valore non è cambiato, non facciamo nulla
        if (editValue === String(data.value)) return;

        // "Gridiamo" l'aggiornamento emettendo un Custom Event globale!
        // Il Visualizer ascolterà questo evento.
        const event = new CustomEvent('jray-node-update', {
            detail: { path: id, newValue: editValue }
        });
        window.dispatchEvent(event);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(String(data.value)); // Annulla
            setIsEditing(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`shadow-xl rounded-xl border-2 transition-all duration-200 backdrop-blur-md min-w-[180px]
                ${selected
                    ? 'border-indigo-400 bg-indigo-900/30 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                    : 'border-white/10 bg-[#18181b]/80 hover:border-white/20 hover:bg-[#27272a]/90'
                }
            `}
        >
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} className={`!w-3 !h-3 !bg-indigo-500 !border-2 !border-[#09090b] transition-all ${selected ? '!bg-cyan-400' : ''}`} />

            {/* HEADER */}
            <div className={`px-4 py-2 border-b ${selected ? 'border-indigo-500/30' : 'border-white/5'} bg-black/20 rounded-t-xl flex items-center justify-between gap-3`}>
                <div className="font-mono text-xs font-bold text-indigo-300 truncate" title={data.label}>{data.label}</div>
                <div className="flex items-center gap-2">
                    <button onClick={copyToClipboard} className="p-1 rounded hover:bg-white/10 text-zinc-500 hover:text-cyan-400 transition-colors" title="Copia Path">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>
                    </button>
                </div>
            </div>

            {/* CORPO DEL NODO */}
            <div className="px-4 py-3">
                {!isObject ? (
                    <div className="flex items-center justify-between gap-3">
                        {/* MAGIA NERA: Doppio click per editare */}
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={handleSave}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-black/50 border border-indigo-500 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        ) : (
                            <span
                                onDoubleClick={() => setIsEditing(true)}
                                className="font-mono text-xs text-zinc-300 truncate max-w-[140px] cursor-text hover:text-white transition-colors"
                                title="Doppio clic per modificare"
                            >
                                {String(data.value)}
                            </span>
                        )}

                        {!isEditing && badge && (
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${badge.style} uppercase tracking-wider`}>
                                {badge.label}
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center text-zinc-500 text-xs italic">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 opacity-50"><path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v11.5A2.25 2.25 0 0 1 15.75 18H4.25A2.25 2.25 0 0 1 2 15.75V4.25Zm4.03 6.28a.75.75 0 0 0-1.06-1.06L3 11.44v-1.88a.75.75 0 0 0-1.5 0v3.75c0 .414.336.75.75.75h3.75a.75.75 0 0 0 0-1.5h-1.88l1.94-1.94ZM12.53 7.47a.75.75 0 0 0-1.06 1.06l1.94 1.94h-1.88a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-1.5 0v1.88l-1.94-1.94Z" clipRule="evenodd" /></svg>
                        <span className="text-[10px]">{data.value}</span>
                    </div>
                )}
            </div>

            {isObject && <Handle type="source" position={Position.Right} isConnectable={isConnectable} className={`!w-3 !h-3 !bg-indigo-500 !border-2 !border-[#09090b] transition-all ${selected ? '!bg-cyan-400' : ''}`} />}
        </motion.div>
    );
};

export default memo(CustomNode);