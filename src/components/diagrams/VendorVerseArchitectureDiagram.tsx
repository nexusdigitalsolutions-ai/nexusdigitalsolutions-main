
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    FileText,
    Shield,
    BrainCircuit,
    Cpu,
    FileSpreadsheet,
    File
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Custom Vector Components ---

const BotSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <rect x="30" y="35" width="40" height="30" rx="4" fill="currentColor" fillOpacity="0.8" />
        <circle cx="40" cy="50" r="5" fill="#000" /> {/* Left Eye */}
        <circle cx="60" cy="50" r="5" fill="#000" /> {/* Right Eye */}
        <path d="M 20 50 L 10 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /> {/* Left Antenna */}
        <circle cx="10" cy="40" r="3" fill="currentColor" />
        <path d="M 80 50 L 90 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /> {/* Right Antenna */}
        <circle cx="90" cy="40" r="3" fill="currentColor" />
        <path d="M 35 75 Q 50 85 65 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
    </svg>
);

const UserSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="20" fill="currentColor" fillOpacity="0.8" />
        <path d="M 20 90 Q 50 70 80 90 L 80 100 L 20 100 Z" fill="currentColor" fillOpacity="0.6" />
        <rect x="10" y="10" width="80" height="80" rx="40" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" fill="none" />
    </svg>
);

const SpeechBubbleSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 40 Q 10 10 40 10 L 60 10 Q 90 10 90 40 Q 90 70 60 70 L 40 70 L 20 80 L 25 65 Q 10 60 10 40 Z"
            fill="white" fillOpacity="0.95" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))" />
        <circle cx="35" cy="40" r="4" fill="#333">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="50" cy="40" r="4" fill="#333">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" begin="0.2s" />
        </circle>
        <circle cx="65" cy="40" r="4" fill="#333">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" begin="0.4s" />
        </circle>
    </svg>
);

export default function VendorVerseArchitectureDiagram() {
    type Stage =
        // 1. Ingestion Cycle
        | 'ingest-pickup'    // Bot at User (Pick up PDF/CSV)
        | 'ingest-move-rag'  // User -> RAG (Carry Doc)
        | 'ingest-process'   // Bot at RAG (Processing)
        | 'ingest-move-db'   // RAG -> DB (Carry Vectors)
        | 'ingest-store'     // Bot at DB (Storing)
        // 2. Reset / Return
        | 'return-user'      // DB -> User (Carry Nothing)
        // 3. Retrieval Cycle
        | 'retrieve-listen'  // Bot at User (Listen)
        | 'retrieve-move-db' // User -> DB (Search)
        | 'retrieve-search'  // Bot at DB (Searching)
        | 'retrieve-deliver' // DB -> User (Carry Protected Info)
        | 'retrieve-wait';   // Bot at User (Wait)

    const [stage, setStage] = useState<Stage>('ingest-pickup');

    useEffect(() => {
        const cycleAnimation = async () => {
            while (true) {
                // --- Part 1: Ingestion ---
                // 1. Pickup
                setStage('ingest-pickup');
                await new Promise(r => setTimeout(r, 2000));

                // 2. Go to RAG (with Doc)
                setStage('ingest-move-rag');
                await new Promise(r => setTimeout(r, 2000));

                // 3. Process
                setStage('ingest-process');
                await new Promise(r => setTimeout(r, 1500));

                // 4. Go to DB (with Vectors)
                setStage('ingest-move-db');
                await new Promise(r => setTimeout(r, 2000));

                // 5. Store
                setStage('ingest-store');
                await new Promise(r => setTimeout(r, 2000));

                // --- Part 2: Return & Listen ---
                // 6. Return to User (Empty)
                setStage('return-user');
                await new Promise(r => setTimeout(r, 2000));

                // 7. Listen
                setStage('retrieve-listen');
                await new Promise(r => setTimeout(r, 2500));

                // --- Part 3: Retrieval ---
                // 8. Go to DB (Search)
                setStage('retrieve-move-db');
                await new Promise(r => setTimeout(r, 2000));

                // 9. Search
                setStage('retrieve-search');
                await new Promise(r => setTimeout(r, 2000));

                // 10. Deliver
                setStage('retrieve-deliver');
                await new Promise(r => setTimeout(r, 2500));

                // 11. Wait before restarting loop
                setStage('retrieve-wait');
                await new Promise(r => setTimeout(r, 1500));
            }
        };
        cycleAnimation();
    }, []);

    // Helper: Bot Position (Left%, Top%)
    // Layout:
    // User: Bottom Left (20%, 75%) -> Bot: (28%, 75%) [Right of User]
    // RAG: Top Center (50%, 25%)   -> Bot: (50%, 40%) [Below RAG]
    // DB: Bottom Right (80%, 75%)  -> Bot: (72%, 75%) [Left of DB]
    const getBotPos = (s: Stage) => {
        switch (s) {
            case 'ingest-pickup': return { left: "28%", top: "75%" };
            case 'ingest-move-rag': return { left: "50%", top: "40%" };
            case 'ingest-process': return { left: "50%", top: "40%" };
            case 'ingest-move-db': return { left: "72%", top: "75%" };
            case 'ingest-store': return { left: "72%", top: "75%" };

            case 'return-user': return { left: "28%", top: "75%" };

            case 'retrieve-listen': return { left: "28%", top: "75%" };
            case 'retrieve-move-db': return { left: "72%", top: "75%" };
            case 'retrieve-search': return { left: "72%", top: "75%" };
            case 'retrieve-deliver': return { left: "28%", top: "75%" };
            case 'retrieve-wait': return { left: "28%", top: "75%" };
            default: return { left: "28%", top: "75%" };
        }
    };

    return (
        <div className="w-full py-12 relative flex items-center justify-center overflow-hidden h-[450px]">
            {/* Triangular Connections Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-primary/20" strokeWidth="2">
                <line x1="20%" y1="75%" x2="50%" y2="25%" /> {/* User -> RAG */}
                <line x1="50%" y1="25%" x2="80%" y2="75%" /> {/* RAG -> DB */}
                <line x1="20%" y1="75%" x2="80%" y2="75%" strokeDasharray="5,5" strokeOpacity="0.3" /> {/* User <-> DB */}
            </svg>

            {/* --- Nodes --- */}

            {/* 1. USER (Bottom Left) */}
            <div className="absolute left-[20%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10 transition-opacity duration-300"
                style={{ opacity: ['ingest-store', 'retrieve-search'].includes(stage) ? 0.6 : 1 }}>
                <motion.div
                    className="w-20 h-20 relative"
                    animate={['ingest-pickup', 'retrieve-listen'].includes(stage) ? { scale: 1.1 } : { scale: 1 }}
                >
                    <UserSVG className="w-full h-full text-primary" />

                    {/* Speech Bubble (Retrieval Listener) */}
                    <AnimatePresence>
                        {stage === 'retrieve-listen' && (
                            <motion.div
                                className="absolute -top-14 -right-14 w-28 h-16 pointer-events-none"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <SpeechBubbleSVG className="w-full h-full" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Doc Upload Icon (Ingestion Start) */}
                    <AnimatePresence>
                        {stage === 'ingest-pickup' && (
                            <motion.div
                                className="absolute -top-8 -right-8 p-1.5 bg-card border border-primary rounded-md shadow-lg flex gap-1 transform rotate-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <FileSpreadsheet className="w-4 h-4 text-green-500" />
                                <FileText className="w-4 h-4 text-blue-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className="text-sm font-bold tracking-wider text-muted-foreground bg-background/50 backdrop-blur px-2 rounded">User</div>
            </div>

            {/* 2. RAG CORE (Top Center) */}
            <div className="absolute left-[50%] top-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
                <motion.div
                    className="w-24 h-24 p-5 rounded-full bg-card border border-primary/40 shadow-[0_0_30px_rgba(var(--primary),0.2)] flex items-center justify-center relative"
                    animate={
                        ['ingest-process', 'ingest-move-rag'].includes(stage)
                            ? { borderColor: "rgba(var(--primary), 1)", boxShadow: "0 0 40px rgba(var(--primary), 0.6)" }
                            : {}
                    }
                >
                    <BrainCircuit className="w-full h-full text-primary" />
                    {/* Pulse Ring */}
                    {['ingest-process'].includes(stage) && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </motion.div>
                <div className="text-sm font-bold tracking-wider text-muted-foreground bg-background/50 backdrop-blur px-2 rounded">RAG Engine</div>
            </div>

            {/* 3. VECTOR DB (Bottom Right) */}
            <div className="absolute left-[80%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
                <motion.div
                    className="w-20 h-20 p-4 rounded-xl bg-card border border-primary/30 shadow-lg flex items-center justify-center relative overflow-hidden"
                    animate={['ingest-store', 'retrieve-search'].includes(stage) ? { borderColor: "rgba(var(--primary), 1)", boxShadow: "0 0 20px rgba(var(--primary), 0.5)" } : {}}
                >
                    <Database className="w-full h-full text-primary z-20 relative" />

                    {/* Matrix Effect (Background) */}
                    <AnimatePresence>
                        {['ingest-store', 'retrieve-search'].includes(stage) && (
                            <motion.div
                                className="absolute inset-0 bg-primary/10 z-10"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Drawers Animation (Search) */}
                    <AnimatePresence>
                        {stage === 'retrieve-search' && (
                            <motion.div
                                className="absolute inset-0 z-10 bg-primary/20"
                                initial={{ y: "100%" }}
                                animate={{ y: ["100%", "0%", "100%", "20%", "100%"] }}
                                transition={{ duration: 2.5 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className="text-sm font-bold tracking-wider text-muted-foreground bg-background/50 backdrop-blur px-2 rounded">Vector DB</div>
            </div>

            {/* --- The Bot (Agent) --- */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                <motion.div
                    className="absolute flex flex-col items-center"
                    initial={{ left: "20%", top: "75%" }}
                    animate={getBotPos(stage)}
                    transition={{
                        duration: (stage === 'ingest-process' || stage === 'retrieve-search') ? 0.5 : 2, // Slower travel, faster updates in place
                        ease: "easeInOut"
                    }}
                    style={{ x: "-50%", y: "-50%" }}
                >
                    {/* Bot Icon */}
                    <div className="w-16 h-16 drop-shadow-[0_0_15px_rgba(var(--primary),0.6)]">
                        <BotSVG className="w-full h-full text-primary" />
                    </div>

                    {/* CARRYING: Doc (Ingest User -> RAG) */}
                    <AnimatePresence>
                        {stage === 'ingest-move-rag' && (
                            <motion.div
                                className="absolute -top-10 -right-6 p-1 bg-card border border-primary rounded shadow-sm flex gap-1 transform rotate-12"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            >
                                <FileSpreadsheet className="w-3 h-3 text-green-500" />
                                <FileText className="w-3 h-3 text-blue-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CARRYING: Vectors (Ingest RAG -> DB) */}
                    <AnimatePresence>
                        {stage === 'ingest-move-db' && (
                            <motion.div
                                className="absolute -top-10 -right-6 p-1 bg-black border border-primary text-primary rounded shadow-sm font-mono text-[10px]"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            >
                                0101...
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CARRYING: Protected Info (Retrieval DB -> User) */}
                    <AnimatePresence>
                        {(stage === 'retrieve-deliver' || stage === 'retrieve-wait') && (
                            <motion.div
                                className="absolute -top-12 bg-card border border-primary text-primary px-3 py-1 rounded-md shadow-lg flex items-center gap-2 whitespace-nowrap z-40"
                                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Shield className="w-3 h-3 text-orange-500" />
                                <span className="text-[10px] font-bold text-foreground">Protected Info</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </div>
    );
}
