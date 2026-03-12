import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- COMPONENTI UI DOCUMENTAZIONE ---

const CodeBlock = ({ code, language = "json" }: { code: string, language?: string }) => (
    <div className="relative group mt-4 mb-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d12] shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{language}</span>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
            </div>
        </div>
        <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-indigo-200">
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

/*
const GifPlaceholder = ({ title, height = "h-64" }: { title: string, height?: string }) => (
    <div className={`relative w-full ${height} mt-6 mb-10 rounded-2xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 flex flex-col items-center justify-center overflow-hidden group`}>
        <div className="absolute inset-0 bg-grid opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent h-[200%] animate-scanline pointer-events-none"></div>
        <span className="text-4xl mb-3 opacity-50">🎬</span>
        <span className="text-sm font-mono text-indigo-400 tracking-widest uppercase relative z-10 px-4 py-2 bg-black/50 rounded-full backdrop-blur-md border border-indigo-500/20">
            [ Inserisci GIF qui: {title} ]
        </span>
    </div>
);
*/

const Alert = ({ title, children, type = "info" }: { title: string, children: React.ReactNode, type?: "info" | "warning" | "success" }) => {
    const colors = {
        info: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
        warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        success: "border-green-500/30 bg-green-500/10 text-green-400"
    };
    const icons = { info: "ℹ️", warning: "⚠️", success: "✅" };

    return (
        <div className={`p-5 rounded-2xl border my-6 ${colors[type]} backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">{icons[type]}</span>
                <h4 className="font-bold text-white tracking-wide">{title}</h4>
            </div>
            <div className="text-sm leading-relaxed opacity-90 font-mono">
                {children}
            </div>
        </div>
    );
};

// --- STRUTTURA DATI DOCUMENTAZIONE ---

const docsContent = {
    it: {
        title: "DOCUMENTAZIONE",
        subtitle: "Il manuale definitivo per dominare J-RAY PRO.",
        nav: { back: "← HOME" },
        sidebar: [
            { id: "getting-started", label: "🚀 Getting Started" },
            { id: "installation", label: "Installazione & Sicurezza" },
            { id: "activation", label: "Attivazione Licenza" },
            { id: "core-engine", label: "⚡ Motore Core (Grafica)" },
            { id: "xray", label: "X-Ray Decrypter" },
            { id: "smart-stack", label: "Smart Stack (Array)" },
            { id: "pro-radar", label: "📡 Live API Radar (PRO)" },
            { id: "pro-diff", label: "⚖️ Visual Diff (PRO)" },
            { id: "pro-profiler", label: "📊 AI Profiler (PRO)" },
            { id: "pro-codegen", label: "🧬 Code Generation (PRO)" },
            { id: "shortcuts", label: "⌨️ Scorciatoie da Tastiera" },
        ],
        sections: {
            "getting-started": {
                title: "Getting Started",
                content: (
                    <>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                            Benvenuto nella documentazione ufficiale di <strong>J-RAY PRO</strong>. Questo manuale ti guiderà attraverso tutte le funzionalità del visualizzatore JSON più veloce e avanzato sul mercato, costruito nativamente in Rust per garantirti zero latenza e totale sicurezza offline.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            A differenza dei vecchi tool basati su Electron (che consumano gigabyte di RAM), il motore <em>Trifecta</em> di J-RAY dialoga direttamente con la tua GPU. Preparati a gestire file enormi senza blocchi.
                        </p>
                    </>
                )
            },
            "installation": {
                title: "Installazione & Sicurezza",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            J-RAY PRO è distribuito come applicazione <strong>Portable</strong> (nessuna installazione richiesta, non sporca il registro di sistema). Ti basta estrarre il file <code>.zip</code> e lanciare l'eseguibile.
                        </p>

                        <Alert title="Avviso per Windows SmartScreen" type="warning">
                            Essendo un software indipendente senza certificati crittografici Enterprise a pagamento, Windows potrebbe mostrare una schermata blu al primo avvio ("PC protetto da Windows").
                            <br /><br />
                            <strong>Come risolvere:</strong> Clicca su <em>"Ulteriori informazioni"</em> e poi sul pulsante <em>"Esegui comunque"</em>. L'app si avvierà in modo totalmente sicuro e 100% offline.
                        </Alert>

                        <Alert title="Avviso per macOS (Gatekeeper)" type="info">
                            Se macOS blocca l'app dicendo che proviene da uno sviluppatore non identificato, fai <strong>Tasto Destro</strong> sull'icona dell'app e seleziona <strong>Apri</strong> dal menu a tendina.
                            <br /><br />
                            Se macOS dice che l'app "è danneggiata", apri il Terminale e digita:
                            <br /><code>xattr -cr /percorso/dell/app/J-RAY-PRO.app</code>
                        </Alert>
                    </>
                )
            },
            "activation": {
                title: "Attivazione Licenza",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            Al primo avvio, ti verrà richiesto di accettare l'EULA. Subito dopo entrerai in <strong>Modalità Trial (7 Giorni)</strong> con tutte le funzionalità PRO sbloccate.
                        </p>
                        {/* <GifPlaceholder title="Attivazione Licenza" height="h-72" /> */}
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">Come inserire la chiave</h3>
                        <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
                            <li>Clicca sul pulsante <strong>"J-RAY PRO"</strong> in alto a sinistra nella barra dei menu.</li>
                            <li>Si aprirà la finestra di gestione licenza.</li>
                            <li>Incolla la tua chiave Lemon Squeezy nel campo di testo.</li>
                            <li>Clicca su <strong>"Attiva / Aggiorna Piano"</strong>.</li>
                        </ol>
                        <p className="text-zinc-400 mt-4">
                            L'app contatterà i server crittografati per validare il tuo ID Hardware. Una volta fatto, la licenza verrà salvata in locale e potrai staccare la connessione a internet.
                        </p>
                    </>
                )
            },
            "core-engine": {
                title: "Motore Core (Navigazione 3D)",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            Il Grafo 3D è il cuore di J-RAY. Non appena incolli del JSON o apri un file, il motore calcola istantaneamente il layout dei nodi.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400 mb-6">
                            <li><strong>Pan:</strong> Tieni premuto il clic sinistro in un punto vuoto e trascina per spostarti.</li>
                            <li><strong>Zoom:</strong> Usa la rotellina del mouse. Lo zoom è centrato sul cursore.</li>
                            <li><strong>Drag & Drop:</strong> Trascina l'intestazione di un nodo specifico per riorganizzare la mappa a tuo piacimento.</li>
                        </ul>
                        {/* <GifPlaceholder title="Navigazione del Grafo e Minimappa" /> */}
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">La Minimappa</h3>
                        <p className="text-zinc-400">
                            In basso a destra trovi il Radar Minimappa. Il rettangolo bianco mostra l'area attualmente visibile sullo schermo. Clicca ovunque sulla minimappa per teletrasportarti istantaneamente in quel punto del JSON.
                        </p>
                    </>
                )
            },
            "xray": {
                title: "X-Ray Decrypter",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            Dimentica di dover copiare i token e incollarli su siti web come jwt.io esponendo i tuoi dati a terzi. J-RAY PRO ha un "occhio magico" integrato.
                        </p>
                        <CodeBlock code={`{\n  "status": "success",\n  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."\n}`} language="json" />
                        <p className="text-zinc-400 mb-6">
                            Quando il motore rileva una stringa che somiglia a un Token JWT o a un pacchetto Base64 (lunghezza eccessiva, niente spazi, pattern specifici), farà comparire un pulsante rosso a forma di <strong>Lucchetto 🔓</strong> direttamente sul nodo.
                        </p>
                        {/* <GifPlaceholder title="Uso dell'X-Ray Decrypter" /> */}
                        <p className="text-zinc-400 mt-4">
                            Cliccando sul lucchetto, J-RAY decripterà la stringa offline e aprirà una finestra modale fluttuante mostrandoti il Payload JSON nascosto al suo interno.
                        </p>
                    </>
                )
            },
            "smart-stack": {
                title: "Smart Stack (Ottimizzazione Array)",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            Cosa succede se carichi un Array con 10.000 oggetti JSON? I normali editor testuali si bloccano o crashano. J-RAY PRO utilizza la tecnologia <strong>Smart Stack</strong>.
                        </p>
                        <Alert title="Come funziona" type="info">
                            Invece di renderizzare 10.000 nodi contemporaneamente, il motore ne disegna solo i primi 5 (per darti il contesto) e comprime tutti gli altri in una "Carta Pila" fucsia.
                        </Alert>
                        {/* <GifPlaceholder title="Espansione Smart Stack" height="h-56" /> */}
                        <p className="text-zinc-400 mt-4">
                            Cliccando sul simbolo <strong>[+50]</strong> situato a destra del nodo Stack, il motore "spacchetterà" dinamicamente i successivi 50 elementi nell'interfaccia, mantenendo l'app sempre a 60 FPS stabili.
                        </p>
                    </>
                )
            },
            "pro-radar": {
                title: "Live API Radar (Modulo PRO)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Il Radar trasforma il tuo visualizzatore statico in un monitoraggio in tempo reale. È perfetto per endpoint IoT, log di server live o ticker finanziari.
                        </p>
                        <ol className="list-decimal pl-5 space-y-3 text-zinc-400 mb-6">
                            <li>Nella barra superiore, inserisci un URL REST valido (es. <code>https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT</code>).</li>
                            <li>Imposta l'intervallo di aggiornamento tramite lo slider (da 0.5 a 10 secondi).</li>
                            <li>Clicca sul tasto verde <strong>▶ LIVE</strong>.</li>
                        </ol>
                        {/* <GifPlaceholder title="Radar API in azione" /> */}
                        <Alert title="Integrazione Diff" type="success">
                            Se attivi il Radar mentre sei in modalità <em>Visual Diff</em>, l'engine catturerà lo snapshot precedente e lo confronterà con il nuovo pacchetto live ogni X secondi, illuminando il grafo come un vero radar!
                        </Alert>
                    </>
                )
            },
            "pro-diff": {
                title: "Visual JSON Diff (Modulo PRO)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Dimentica la lettura riga-per-riga dei file Git. Il Visual Diff analizza la struttura logica (astratta) di due JSON e li mappa nello spazio 3D colorandone le mutazioni.
                        </p>
                        <h3 className="text-xl font-bold text-white mt-6 mb-3">Legenda Colori</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Verde (Aggiunto):</strong> Il nodo esiste solo nel File B.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Rosso (Rimosso):</strong> Il nodo è stato cancellato dal File A.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Giallo (Modificato):</strong> La chiave esiste in entrambi, ma il valore è cambiato.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-indigo-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Indigo (Invariato):</strong> Nessuna modifica strutturale.</span>
                            </li>
                        </ul>
                        {/* <GifPlaceholder title="Comparazione Visual Diff" /> */}
                        <p className="text-zinc-400">
                            Per utilizzarlo, carica il vecchio JSON cliccando su <em>File A</em>, carica il nuovo JSON cliccando su <em>File B</em>, e poi premi <strong>⚖️ Visual Diff</strong> nella navbar.
                        </p>
                    </>
                )
            },
            "pro-profiler": {
                title: "AI Data Profiler (Modulo PRO)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Stai importando dati estratti da un vecchio database e non ti fidi della loro consistenza? L'AI Profiler analizza tutto l'albero per trovare bug invisibili all'occhio umano.
                        </p>
                        <CodeBlock code={`[\n  { "age": 25, "name": "Mario" },\n  { "age": "ventisei", "name": "Luigi" }\n]`} />
                        <p className="text-zinc-400 mb-4">
                            Cliccando su <strong>📊 Profiler</strong>, il motore scansionerà ogni singolo campo dell'oggetto e genererà un Report Anomalie.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400 mb-6">
                            <li>Segnala campi che presentano tipi di dati incoerenti (es. <em>"Il campo 'age' è Numero in 90 oggetti, ma è Stringa in 10 oggetti"</em>).</li>
                            <li>Calcola la percentuale di campi Vuoti, Null o stringhe bianche.</li>
                        </ul>
                        {/* <GifPlaceholder title="Finestra Report Profiler" height="h-60" /> */}
                    </>
                )
            },
            "pro-codegen": {
                title: "Code Generation (Modulo PRO)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Smetti di scrivere i Modelli a mano. Partendo dal JSON attualmente visualizzato nel grafo, J-RAY è in grado di inferire i tipi di dato e scrivere il codice boilerplate per te.
                        </p>
                        <p className="text-zinc-400 mb-4">Clicca su <strong>🧬 Code Gen</strong> nella navbar. Si aprirà un pannello laterale dove potrai scegliere il linguaggio di output:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <CodeBlock language="typescript" code={`export interface Root {\n  id: number;\n  metadata: Metadata;\n  tags: string[];\n}`} />
                            <CodeBlock language="rust" code={`#[derive(Serialize, Deserialize)]\npub struct Root {\n    pub id: i64,\n    pub metadata: Metadata,\n    pub tags: Vec<String>,\n}`} />
                        </div>

                        <Alert title="Copia Rapida" type="info">
                            Usa il tasto <em>"📋 Copia Codice"</em> in alto a destra nella finestra modale per inviare il codice formattato direttamente negli appunti di sistema, pronto da incollare nel tuo IDE.
                        </Alert>
                    </>
                )
            },
            "shortcuts": {
                title: "Scorciatoie & Utilities",
                content: (
                    <>
                        <p className="text-zinc-400 mb-6">
                            J-RAY PRO è stato progettato per chi lavora al computer con due mani. Usa queste funzioni per accelerare il tuo flusso di lavoro.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">Ricerca JSONPath Focus</span>
                                <kbd className="px-2 py-1 bg-black/50 border border-zinc-700 rounded text-xs font-mono text-zinc-300">Invio</kbd>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2 pb-4">Quando sei nella barra di ricerca, premi Invio per saltare automaticamente da un risultato all'altro. La telecamera centrerà il nodo evidenziandolo in giallo.</p>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">Zen Mode (Nascondi UI)</span>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-black/50 border border-zinc-700 rounded text-xs text-zinc-300">Tasto 🧘 In basso a SX</span>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2 pb-4">Nasconde l'editor laterale e la navbar superiore per farti concentrare al 100% sulla mappa stellare dei tuoi dati.</p>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">Esportazione SVG</span>
                                <span className="px-3 py-1 bg-black/50 border border-zinc-700 rounded text-xs text-zinc-300">Tasto 📸 Navbar</span>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2">Salva una copia vettoriale perfetta in risoluzione 4K del grafo attualmente visualizzato. Ottimo per incollare schemi di architettura nei documenti aziendali o su Figma.</p>
                        </div>
                    </>
                )
            }
        }
    },
    en: {
        title: "DOCUMENTATION",
        subtitle: "The definitive manual to master J-RAY PRO.",
        nav: { back: "← HOME" },
        sidebar: [
            { id: "getting-started", label: "🚀 Getting Started" },
            { id: "installation", label: "Installation & Security" },
            { id: "activation", label: "License Activation" },
            { id: "core-engine", label: "⚡ Core Engine (Graphics)" },
            { id: "xray", label: "X-Ray Decrypter" },
            { id: "smart-stack", label: "Smart Stack (Arrays)" },
            { id: "pro-radar", label: "📡 Live API Radar (PRO)" },
            { id: "pro-diff", label: "⚖️ Visual Diff (PRO)" },
            { id: "pro-profiler", label: "📊 AI Profiler (PRO)" },
            { id: "pro-codegen", label: "🧬 Code Generation (PRO)" },
            { id: "shortcuts", label: "⌨️ Shortcuts & Tips" },
        ],
        sections: {
            "getting-started": {
                title: "Getting Started",
                content: (
                    <>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                            Welcome to the official documentation for <strong>J-RAY PRO</strong>. This manual will guide you through all the features of the fastest and most advanced JSON visualizer on the market, natively built in Rust to guarantee zero latency and total offline security.
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Unlike slow Electron-based tools (which eat up gigabytes of RAM), J-RAY's <em>Trifecta</em> engine talks directly to your GPU. Get ready to handle massive files without stuttering.
                        </p>
                    </>
                )
            },
            "installation": {
                title: "Installation & Security",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            J-RAY PRO is distributed as a <strong>Portable</strong> application (no installation required, no registry bloating). Simply extract the <code>.zip</code> file and run the executable.
                        </p>

                        <Alert title="Windows SmartScreen Warning" type="warning">
                            Because this is an independent software without expensive Enterprise cryptographic certificates, Windows might show a blue screen upon first launch ("Windows protected your PC").
                            <br /><br />
                            <strong>How to fix:</strong> Click on <em>"More info"</em> and then on the <em>"Run anyway"</em> button. The app will launch securely and remain 100% offline.
                        </Alert>

                        <Alert title="macOS Gatekeeper Warning" type="info">
                            If macOS blocks the app saying it's from an unidentified developer, <strong>Right-Click</strong> the app icon and select <strong>Open</strong> from the dropdown menu.
                            <br /><br />
                            If macOS says the app "is damaged", open the Terminal and type:
                            <br /><code>xattr -cr /path/to/app/J-RAY-PRO.app</code>
                        </Alert>
                    </>
                )
            },
            "activation": {
                title: "License Activation",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            On your first launch, you will be asked to accept the EULA. Immediately after, you will enter the <strong>7-Day Trial Mode</strong> with all PRO features unlocked.
                        </p>
                        {/* <GifPlaceholder title="License Activation" height="h-72" /> */}
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">How to insert your key</h3>
                        <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
                            <li>Click the <strong>"J-RAY PRO"</strong> button on the top left of the menu bar.</li>
                            <li>The license management window will open.</li>
                            <li>Paste your Lemon Squeezy license key into the text field.</li>
                            <li>Click <strong>"Activate / Upgrade Plan"</strong>.</li>
                        </ol>
                        <p className="text-zinc-400 mt-4">
                            The app will contact our encrypted servers to validate your Hardware ID. Once done, the license is saved locally and you can disconnect from the internet forever.
                        </p>
                    </>
                )
            },
            "core-engine": {
                title: "Core Engine (3D Navigation)",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            The 3D Graph is the heart of J-RAY. As soon as you paste JSON code or open a file, the engine instantly calculates the optimal node layout.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400 mb-6">
                            <li><strong>Pan:</strong> Left-click on an empty space and drag to move the camera.</li>
                            <li><strong>Zoom:</strong> Use the mouse scroll wheel. The zoom is centered on your cursor.</li>
                            <li><strong>Drag & Drop:</strong> Drag the header of any node to reorganize the map however you like.</li>
                        </ul>
                        {/* <GifPlaceholder title="Graph Navigation and Minimap" /> */}
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">The Minimap</h3>
                        <p className="text-zinc-400">
                            In the bottom right corner, you will find the Radar Minimap. The white rectangle shows the currently visible screen area. Click anywhere on the minimap to instantly teleport to that section of the JSON.
                        </p>
                    </>
                )
            },
            "xray": {
                title: "X-Ray Decrypter",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            Forget copying tokens and pasting them onto third-party websites like jwt.io, exposing your sensitive data. J-RAY PRO has a built-in "magic eye".
                        </p>
                        <CodeBlock code={`{\n  "status": "success",\n  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."\n}`} language="json" />
                        <p className="text-zinc-400 mb-6">
                            When the engine detects a string that looks like a JWT Token or a Base64 package (excessive length, no spaces, specific patterns), a red <strong>Padlock 🔓</strong> button will appear directly on the node.
                        </p>
                        {/* <GifPlaceholder title="Using X-Ray Decrypter" /> */}
                        <p className="text-zinc-400 mt-4">
                            Clicking the padlock will cause J-RAY to decrypt the string offline and open a floating modal window showing you the hidden JSON Payload inside.
                        </p>
                    </>
                )
            },
            "smart-stack": {
                title: "Smart Stack (Array Optimization)",
                content: (
                    <>
                        <p className="text-zinc-400 mb-4">
                            What happens if you load an Array with 10,000 JSON objects? Normal text editors freeze or crash. J-RAY PRO utilizes <strong>Smart Stack</strong> technology.
                        </p>
                        <Alert title="How it works" type="info">
                            Instead of rendering 10,000 nodes simultaneously, the engine draws only the first 5 (to give you context) and compresses all the others into a pink "Deck Card".
                        </Alert>
                        {/* <GifPlaceholder title="Smart Stack Expansion" height="h-56" /> */}
                        <p className="text-zinc-400 mt-4">
                            By clicking the <strong>[+50]</strong> symbol located on the right side of the Stack node, the engine will dynamically unpack the next 50 elements into the UI, maintaining a stable 60 FPS.
                        </p>
                    </>
                )
            },
            "pro-radar": {
                title: "Live API Radar (PRO Module)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            The Radar transforms your static visualizer into a real-time monitoring station. It's perfect for IoT endpoints, live server logs, or financial tickers.
                        </p>
                        <ol className="list-decimal pl-5 space-y-3 text-zinc-400 mb-6">
                            <li>In the top bar, enter a valid REST URL (e.g., <code>https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT</code>).</li>
                            <li>Set the refresh interval using the slider (from 0.5 to 10 seconds).</li>
                            <li>Click the green <strong>▶ LIVE</strong> button.</li>
                        </ol>
                        {/* <GifPlaceholder title="Radar API in action" /> */}
                        <Alert title="Diff Integration" type="success">
                            If you activate the Radar while in <em>Visual Diff</em> mode, the engine will capture the previous snapshot and compare it with the new live payload every X seconds, lighting up the graph like a true radar!
                        </Alert>
                    </>
                )
            },
            "pro-diff": {
                title: "Visual JSON Diff (PRO Module)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Forget reading line-by-line Git differences. The Visual Diff analyzes the logical (abstract) structure of two JSON files and maps them in 3D space, coloring their mutations.
                        </p>
                        <h3 className="text-xl font-bold text-white mt-6 mb-3">Color Legend</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Green (Added):</strong> The node exists only in File B.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Red (Removed):</strong> The node was deleted from File A.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Yellow (Modified):</strong> The key exists in both, but the value changed.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-indigo-500 rounded-sm"></div>
                                <span className="text-zinc-300"><strong>Indigo (Unchanged):</strong> No structural modifications.</span>
                            </li>
                        </ul>
                        {/* <GifPlaceholder title="Visual Diff Comparison" /> */}
                        <p className="text-zinc-400">
                            To use it, load the old JSON by clicking <em>File A</em>, load the new JSON by clicking <em>File B</em>, and then press <strong>⚖️ Visual Diff</strong> in the navbar.
                        </p>
                    </>
                )
            },
            "pro-profiler": {
                title: "AI Data Profiler (PRO Module)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Are you importing data extracted from an old database and don't trust its consistency? The AI Profiler scans the entire tree to find bugs invisible to the human eye.
                        </p>
                        <CodeBlock code={`[\n  { "age": 25, "name": "Mario" },\n  { "age": "twenty-six", "name": "Luigi" }\n]`} />
                        <p className="text-zinc-400 mb-4">
                            By clicking <strong>📊 Profiler</strong>, the engine will scan every single field of the object and generate an Anomaly Report.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400 mb-6">
                            <li>Flags fields with inconsistent data types (e.g., <em>"The field 'age' is a Number in 90 objects, but a String in 10 objects"</em>).</li>
                            <li>Calculates the percentage of Empty, Null, or blank string fields.</li>
                        </ul>
                        {/* <GifPlaceholder title="Profiler Report Window" height="h-60" /> */}
                    </>
                )
            },
            "pro-codegen": {
                title: "Code Generation (PRO Module)",
                content: (
                    <>
                        <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-black tracking-widest rounded-full mb-4">⚡ PRO MODULE</div>
                        <p className="text-zinc-400 mb-4">
                            Stop writing Models by hand. Starting from the JSON currently viewed in the graph, J-RAY can infer data types and write the boilerplate code for you.
                        </p>
                        <p className="text-zinc-400 mb-4">Click on <strong>🧬 Code Gen</strong> in the navbar. A side panel will open where you can choose the output language:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <CodeBlock language="typescript" code={`export interface Root {\n  id: number;\n  metadata: Metadata;\n  tags: string[];\n}`} />
                            <CodeBlock language="rust" code={`#[derive(Serialize, Deserialize)]\npub struct Root {\n    pub id: i64,\n    pub metadata: Metadata,\n    pub tags: Vec<String>,\n}`} />
                        </div>

                        <Alert title="Quick Copy" type="info">
                            Use the <em>"📋 Copy Code"</em> button on the top right of the modal window to send the formatted code directly to your system clipboard, ready to be pasted into your IDE.
                        </Alert>
                    </>
                )
            },
            "shortcuts": {
                title: "Shortcuts & Utilities",
                content: (
                    <>
                        <p className="text-zinc-400 mb-6">
                            J-RAY PRO was designed for power users who work with two hands. Use these features to speed up your workflow.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">JSONPath Search Focus</span>
                                <kbd className="px-2 py-1 bg-black/50 border border-zinc-700 rounded text-xs font-mono text-zinc-300">Enter</kbd>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2 pb-4">When focused on the search bar, press Enter to automatically jump from one result to the next. The camera will center on the node highlighting it in yellow.</p>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">Zen Mode (Hide UI)</span>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-black/50 border border-zinc-700 rounded text-xs text-zinc-300">Bottom Left 🧘 Button</span>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2 pb-4">Hides the side editor and top navbar to let you focus 100% on the star map of your data.</p>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-white font-bold">SVG Export</span>
                                <span className="px-3 py-1 bg-black/50 border border-zinc-700 rounded text-xs text-zinc-300">Navbar 📸 Button</span>
                            </div>
                            <p className="text-xs text-zinc-500 pl-2">Saves a perfect 4K resolution vector copy of the currently viewed graph. Great for pasting architecture schemas into company docs or Figma.</p>
                        </div>
                    </>
                )
            }
        }
    }
};

// --- PAGINA PRINCIPALE ---

export default function DocsPage() {
    const { lang } = useLanguage();
    const t = docsContent[lang];
    const [activeSection, setActiveSection] = useState("getting-started");

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll handling for smooth navigation
    const handleScrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            // Offset for the fixed header
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Intersection Observer to update active section on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        t.sidebar.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [lang, t.sidebar]);


    return (
        <div className="min-h-screen cyber-bg text-white font-sans selection:bg-indigo-500/30 flex flex-col">
            <div className="spotlight fixed inset-0 pointer-events-none z-0" />

            {/* HEADER FISSO */}
            <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-xl border-b border-white/5 bg-black/40">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-xs font-mono tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">
                        {t.nav.back}
                    </Link>
                    <div className="text-xl md:text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        {t.title}
                    </div>
                </div>
            </header>

            {/* LAYOUT A DUE COLONNE */}
            <div className="flex-1 flex w-full max-w-7xl mx-auto pt-24 md:pt-32 relative z-10 px-4 md:px-6">

                {/* SIDEBAR SINISTRA */}
                <aside className="hidden lg:block w-72 flex-shrink-0 relative">
                    <div className="sticky top-32 max-h-[calc(100vh-140px)] overflow-y-auto pr-6 custom-scrollbar pb-10">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                            Manuale Operativo
                        </p>
                        <nav className="space-y-2">
                            {t.sidebar.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScrollTo(item.id)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === item.id
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                        : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* CONTENUTO PRINCIPALE */}
                <main className="flex-1 min-w-0 pb-32 lg:pl-12 lg:border-l border-white/5">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-glow">
                            J-RAY PRO <span className="text-indigo-500">ENGINE</span>
                        </h1>
                        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{t.subtitle}</p>
                    </div>

                    <div className="space-y-32">
                        {t.sidebar.map((item) => {
                            const sectionData = t.sections[item.id as keyof typeof t.sections];
                            if (!sectionData) return null;

                            return (
                                <motion.section
                                    key={item.id}
                                    id={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="scroll-mt-32"
                                >
                                    <h2 className="text-3xl font-black italic uppercase text-white mb-8 pb-4 border-b border-white/10 flex items-center gap-4">
                                        <span className="text-indigo-500">_</span> {sectionData.title}
                                    </h2>
                                    <div className="prose prose-invert prose-indigo max-w-none">
                                        {sectionData.content}
                                    </div>
                                </motion.section>
                            );
                        })}
                    </div>

                    {/* FOOTER DELLA DOCUMENTAZIONE */}
                    <div className="mt-32 pt-10 border-t border-white/5 text-center">
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            End of Document // All systems nominal
                        </p>
                    </div>
                </main>

            </div>
        </div>
    );
}