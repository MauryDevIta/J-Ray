import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng, toSvg } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';

import CustomNode from './features/graph/CustomNode';
import JsonEditor from './features/editor/JsonEditor';
import GraphControls from './features/graph/GraphControls';
import SearchBar from './features/graph/SearchBar';
import { jsonToGraph } from './utils/graphGenerator';
import { toggleGraphPath } from './utils/treeUtils';
import { translations } from './utils/translations';

function FlowWithProvider() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [layoutDirection, setLayoutDirection] = useState<'LR' | 'TB'>('LR');
  const [jsonInput, setJsonInput] = useState('{\n  "app": "J-RAY",\n  "status": "ready",\n  "modules": [\n    "Authentication",\n    "Database",\n    "Graph Engine"\n  ]\n}');

  // 🧘‍♂️ STATO ZEN MODE
  const [isZenMode, setIsZenMode] = useState(false);

  const { fitView } = useReactFlow();
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  // 🧘‍♂️ Ascoltatore tasto ESC per uscire dalla Zen Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  // 🔥 MAGIA NERA: TWO-WAY BINDING 🔥
  useEffect(() => {
    const handleNodeUpdate = (e: any) => {
      const { path, newValue } = e.detail;

      try {
        // 1. Parsiamo il JSON attuale
        const currentData = JSON.parse(jsonInput);

        // 2. Puliamo il percorso e lo dividiamo in un array di chiavi
        // Rimuove 'root.' se presente e splitta su punti e parentesi quadre
        const cleanPath = path.startsWith('root.') ? path.replace('root.', '') : path;
        const pathParts = cleanPath.split(/[.\[\]]+/).filter(Boolean);

        // Se l'aggiornamento è sulla root (raro, ma gestiamolo)
        if (pathParts.length === 0) return;

        // 3. Navighiamo l'oggetto fino al genitore della chiave da modificare
        let currentLevel = currentData;
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (currentLevel[pathParts[i]] === undefined) return;
          currentLevel = currentLevel[pathParts[i]];
        }

        // 4. Analizziamo il tipo originale per non corrompere i dati
        const lastKey = pathParts[pathParts.length - 1];
        const originalType = typeof currentLevel[lastKey];

        let parsedValue: any = newValue;

        // Conversione intelligente
        if (originalType === 'number') {
          parsedValue = Number(newValue);
          if (isNaN(parsedValue)) return; // Se scrive "ciao" in un numero, blocchiamo
        } else if (originalType === 'boolean') {
          parsedValue = (newValue.toLowerCase() === 'true');
        } else if (newValue === 'null') {
          parsedValue = null;
        }

        // 5. Applichiamo la modifica all'oggetto
        currentLevel[lastKey] = parsedValue;

        // 6. Riformattiamo il JSON in stringa
        const newJsonString = JSON.stringify(currentData, null, 2);

        // 7. Aggiorniamo l'editor di testo (che farà scattare il resto)
        setJsonInput(newJsonString);

        // 8. Ricalcoliamo subito il grafo per avere un feedback istantaneo
        const { nodes: newNodes, edges: newEdges } = jsonToGraph(newJsonString, nodes, layoutDirection, true);
        setNodes(newNodes);
        setEdges(newEdges);

      } catch (err) {
        console.error("Two-Way Binding Error:", err);
      }
    };

    // Ascoltiamo l'evento globale lanciato da CustomNode
    window.addEventListener('jray-node-update', handleNodeUpdate);
    return () => window.removeEventListener('jray-node-update', handleNodeUpdate);
  }, [jsonInput, nodes, layoutDirection]);
  // --------------------------------------------------------

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1' } }, eds)),
    [setEdges]
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    const { nodes: newNodes, edges: newEdges } = toggleGraphPath(nodes, edges, node.id);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleGenerateGraph = () => {
    const { nodes: newNodes, edges: newEdges } = jsonToGraph(jsonInput, nodes, layoutDirection, true);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleToggleLayout = () => {
    const newDirection = layoutDirection === 'LR' ? 'TB' : 'LR';
    setLayoutDirection(newDirection);
    const { nodes: newNodes, edges: newEdges } = jsonToGraph(jsonInput, nodes, newDirection, false);
    setNodes(newNodes);
    setEdges(newEdges);
    setTimeout(() => {
      window.requestAnimationFrame(() => fitView({ padding: 0.2, duration: 800 }));
    }, 10);
  };

  const handleDownload = (format: 'png' | 'svg') => {
    const el = document.querySelector('.react-flow') as HTMLElement;
    const imageWidth = 1920;
    const imageHeight = 1080;

    const options = {
      backgroundColor: '#09090b',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: String(imageWidth),
        height: String(imageHeight),
        transform: `translate(0, 0)`,
      },
    };

    if (format === 'png') {
      toPng(el, options).then((dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'j-ray-diagram.png');
        a.setAttribute('href', dataUrl);
        a.click();
      });
    } else {
      toSvg(el, options).then((dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'j-ray-diagram.svg');
        a.setAttribute('href', dataUrl);
        a.click();
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-[#09090b] text-white overflow-hidden flex flex-col font-sans relative">

      {/* NAVBAR CON ANIMATE PRESENCE (Sparisce in Zen Mode) */}
      <AnimatePresence>
        {!isZenMode && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-16 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex-shrink-0 z-[100] flex items-center justify-between px-8 absolute top-0 left-0 right-0 w-full"
          >
            <div className="flex items-center gap-4">
              <div className="text-xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">
                J-RAY
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                {t.nav.workspace}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* 🍕 TASTO DONAZIONE 🍕 */}
              <a
                href="https://www.buymeacoffee.com/gentilemau6"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5F5F]/10 border border-[#FF5F5F]/30 hover:bg-[#FF5F5F] text-[#FF5F5F] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,95,95,0)] hover:shadow-[0_0_20px_rgba(255,95,95,0.4)] hover:-translate-y-0.5"
              >
                <span className="text-sm group-hover:animate-bounce">🍕</span>
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {lang === 'it' ? 'Offrimi una pizza' : 'Support J-Ray'}
                </span>
              </a>

              {/* LANG TOGGLE */}
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setLang('it')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'it' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                  EN
                </button>
              </div>

              {/* TASTO TORNA INDIETRO (Home) */}
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {lang === 'it' ? 'Torna al Sito' : 'Home'}
                </span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* AREA DI LAVORO */}
      <main className={`flex-1 flex relative overflow-hidden transition-all duration-500 ${isZenMode ? 'mt-0' : 'mt-16'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#09090b] to-[#09090b] pointer-events-none z-0"></div>

        {/* EDITOR JSON CON ANIMATE PRESENCE (Scivola via in Zen Mode) */}
        <AnimatePresence>
          {!isZenMode && (
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -500, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="z-50"
            >
              <JsonEditor
                value={jsonInput}
                onChange={setJsonInput}
                onGenerate={handleGenerateGraph}
                onDownload={handleDownload}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 relative z-10 h-full">
          {/* I controlli di ricerca e layout rimangono visibili anche in Zen Mode */}
          <SearchBar />
          <GraphControls onToggleDirection={handleToggleLayout} />

          {/* 🧘‍♂️ IL TASTO FLUTTUANTE ZEN MODE (Che scorre con l'editor) */}
          <button
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? "Exit Zen Mode (ESC)" : "Enter Zen Mode"}
            className={`absolute bottom-6 z-50 flex items-center justify-center w-12 h-12 bg-[#18181b] rounded-full border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/20 text-zinc-400 hover:text-white shadow-xl active:scale-95 cursor-pointer transition-all duration-500 ease-in-out
              ${isZenMode ? 'left-6' : 'left-[440px]'}
            `}
          >
            {isZenMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25v-3.75a.75.75 0 0 1 .75-.75h3.75m-3.75 4.5h4.5m-4.5-4.5L15 15m-6 0-3-3m3 3 3-3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4.5 4.5M15 15l4.5 4.5M15 9l4.5-4.5M9 15l-4.5 4.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            )}
          </button>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
            snapToGrid={true}
            snapGrid={[15, 15]}
            selectNodesOnDrag={true}
            panOnScroll={true}
            zoomOnPinch={true}
            minZoom={0.05}
            maxZoom={4}
          >
            <Background color="#52525b" gap={24} size={1} variant={BackgroundVariant.Dots} />

            <MiniMap
              style={{
                backgroundColor: '#18181b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                height: 120,
                width: 180,
                bottom: 80,
                right: 32
              }}
              maskColor="rgba(0, 0, 0, 0.6)"
              nodeColor={() => '#6366f1'}
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
          </ReactFlow>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowWithProvider />
    </ReactFlowProvider>
  );
}