import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Bot, ShieldAlert, Scale, BarChart3, Layers, Zap, Workflow, Server, Activity } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

// --- Types & Data ---
type NodeType = 'core' | 'input' | 'output' | 'utility';
type ViewMode = 'mobile' | 'laptop' | 'desktop';

interface FlowNode {
    id: string;
    label: string;
    subLabel?: string;
    icon: React.ElementType;
    type: NodeType;
    x: number;
    y: number;
    delay: number;
    stats?: string;
    color: string;
}

// 1. Mobile (< 768px): Vertical Compact Stack
const MOBILE_NODES: FlowNode[] = [
    { id: 'workflow', label: 'Workflow', subLabel: 'Visual', icon: Workflow, type: 'input', x: 25, y: 15, delay: 0.2, color: '#0ea5e9' },
    { id: 'test-gen', label: 'Test Gen', subLabel: 'Suites', icon: Zap, type: 'input', x: 75, y: 15, delay: 0.3, color: '#0ea5e9' },
    { id: 'rag', label: 'RAG', icon: Database, type: 'utility', x: 20, y: 32, delay: 0.4, color: '#3b82f6' },
    { id: 'llm', label: 'LLM', icon: Bot, type: 'utility', x: 80, y: 32, delay: 0.5, color: '#3b82f6' },
    { id: 'core', label: 'GenAI SHAP', subLabel: 'Analysis Engine', icon: Brain, type: 'core', x: 50, y: 50, delay: 0, color: '#06b6d4' },
    { id: 'resilience', label: 'Resilience', icon: Layers, type: 'utility', x: 20, y: 68, delay: 0.6, color: '#8b5cf6' },
    { id: 'fairness', label: 'Fairness', icon: Scale, type: 'utility', x: 80, y: 68, delay: 0.7, color: '#8b5cf6' },
    { id: 'analytics', label: 'Analytics', subLabel: '95/100', icon: BarChart3, type: 'output', x: 30, y: 85, delay: 0.8, stats: '95/100', color: '#f59e0b' },
    { id: 'readiness', label: 'Readiness', subLabel: 'READY', icon: ShieldAlert, type: 'output', x: 70, y: 85, delay: 0.9, stats: 'READY', color: '#10b981' },
    { id: 'arch', label: 'Arch', icon: Server, type: 'utility', x: 50, y: 96, delay: 1.0, color: '#64748b' },
];

// 2. Laptop/Tablet (768px - 1400px): Balanced Radial (Spacious)
const LAPTOP_NODES: FlowNode[] = [
    { id: 'core', label: 'GenAI SHAP Engine', subLabel: 'Analysis Engine', icon: Brain, type: 'core', x: 50, y: 50, delay: 0, color: '#06b6d4' },
    { id: 'rag', label: 'RAG/Vector DB', subLabel: 'Retrieval', icon: Database, type: 'utility', x: 35, y: 20, delay: 0.2, color: '#3b82f6' },
    { id: 'llm', label: 'LLM Service', subLabel: 'Generation', icon: Bot, type: 'utility', x: 65, y: 20, delay: 0.3, color: '#3b82f6' },
    { id: 'test-gen', label: 'Auto Test Gen', subLabel: 'Test Suites', icon: Zap, type: 'input', x: 15, y: 35, delay: 0.4, color: '#0ea5e9' },
    { id: 'workflow', label: 'Workflow', subLabel: 'Visual Builder', icon: Workflow, type: 'input', x: 15, y: 65, delay: 0.5, color: '#0ea5e9' },
    { id: 'analytics', label: 'Analytics', subLabel: 'Insights', icon: BarChart3, type: 'output', x: 85, y: 35, delay: 0.6, stats: '95/100', color: '#f59e0b' },
    { id: 'readiness', label: 'Readiness', subLabel: 'Verified', icon: ShieldAlert, type: 'output', x: 85, y: 65, delay: 0.7, stats: 'READY', color: '#10b981' },
    { id: 'resilience', label: 'Resilience', subLabel: 'Noise', icon: Layers, type: 'utility', x: 30, y: 60, delay: 0.5, color: '#8b5cf6' },
    { id: 'fairness', label: 'Fairness', subLabel: 'Bias', icon: Scale, type: 'utility', x: 70, y: 60, delay: 0.6, color: '#8b5cf6' },
    { id: 'arch', label: 'Architecture', subLabel: 'Stack', icon: Server, type: 'utility', x: 50, y: 85, delay: 0.8, color: '#64748b' },
];

// 3. Wide Desktop (> 1400px): Compact Panoramic (Ultra-wide)
const DESKTOP_NODES: FlowNode[] = [
    { id: 'core', label: 'GenAI SHAP Engine', subLabel: 'Context Retrieval & Contribution Analysis', icon: Brain, type: 'core', x: 50, y: 50, delay: 0, color: '#06b6d4' },
    { id: 'rag', label: 'RAG/Vector DB', subLabel: 'Knowledge Retrieval', icon: Database, type: 'utility', x: 38, y: 25, delay: 0.2, color: '#3b82f6' },
    { id: 'llm', label: 'LLM Service', subLabel: 'Test Case Generation', icon: Bot, type: 'utility', x: 62, y: 25, delay: 0.3, color: '#3b82f6' },
    { id: 'test-gen', label: 'Automated Test Gen', subLabel: 'Generates Comprehensive Suites', icon: Zap, type: 'input', x: 22, y: 35, delay: 0.4, color: '#0ea5e9' },
    { id: 'workflow', label: 'Interactive Workflow', subLabel: 'Visual Builder', icon: Workflow, type: 'input', x: 22, y: 65, delay: 0.5, color: '#0ea5e9' },
    { id: 'analytics', label: 'Deployment Analytics', subLabel: 'Performance Trends', icon: BarChart3, type: 'output', x: 78, y: 35, delay: 0.6, stats: '95/100', color: '#f59e0b' },
    { id: 'readiness', label: 'Readiness Score', subLabel: 'Production Verified', icon: ShieldAlert, type: 'output', x: 78, y: 65, delay: 0.7, stats: 'READY', color: '#10b981' },
    { id: 'resilience', label: 'Resilience', subLabel: 'Noise & Adversarial', icon: Layers, type: 'utility', x: 35, y: 62, delay: 0.5, color: '#8b5cf6' },
    { id: 'fairness', label: 'Fairness (Bias)', subLabel: 'Attention Distribution', icon: Scale, type: 'utility', x: 65, y: 62, delay: 0.6, color: '#8b5cf6' },
    { id: 'arch', label: 'System Architecture', subLabel: 'React • Python • LangChain', icon: Server, type: 'utility', x: 50, y: 80, delay: 0.8, color: '#64748b' },
];

export default function EvalSphereFlowDiagram() {
    const [viewMode, setViewMode] = useState<ViewMode>('laptop');
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Tri-State Responsive Logic
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setViewMode('mobile');
            } else if (width >= 768 && width < 1400) {
                setViewMode('laptop');
            } else {
                setViewMode('desktop');
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use appropriate nodes based on view mode
    const activeNodes = useMemo(() => {
        if (viewMode === 'mobile') return MOBILE_NODES;
        if (viewMode === 'desktop') return DESKTOP_NODES;
        return LAPTOP_NODES;
    }, [viewMode]);

    const coreNode = activeNodes.find(n => n.id === 'core')!;
    const otherNodes = activeNodes.filter(n => n.id !== 'core');

    // Dynamic Height/Aspect Ratio based on ViewMode
    const containerClasses = useMemo(() => {
        if (viewMode === 'mobile') return 'aspect-[4/5] min-h-[500px]';
        if (viewMode === 'laptop') return 'aspect-[16/10] md:aspect-[3/2]'; // Taller for laptops
        return 'aspect-[21/9]'; // Ultra-wide for desktop
    }, [viewMode]);

    return (
        <div className={`
        relative w-full bg-slate-950 rounded-3xl border border-slate-800/50 overflow-hidden shadow-2xl backdrop-blur-xl group/diagram transition-all duration-500
        ${containerClasses}
    `}>
            {/* Dynamic Backgrounds */}
            <div className="absolute inset-0 bg-[#020617] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_70%)] animate-pulse-slow" />
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

            {/* Rotating Cyber Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-cyan-500/10 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] h-[58%] border border-dashed border-cyan-500/10 rounded-full animate-spin-reverse-slower pointer-events-none" />

            {/* Connectivity Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <filter id="glow-path" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {otherNodes.map((node) => {
                    let state = 'normal';
                    if (hoveredNode) {
                        if (hoveredNode === node.id || hoveredNode === 'core') state = 'highlighted';
                        else state = 'dimmed';
                    }

                    return (
                        <ConnectionPath
                            key={node.id}
                            start={node}
                            end={coreNode}
                            state={state}
                        />
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            <div className="relative z-10 w-full h-full">
                {activeNodes.map((node) => (
                    <DiagramNode
                        key={node.id}
                        node={node}
                        isHovered={hoveredNode === node.id}
                        onHover={setHoveredNode}
                        dimmed={hoveredNode !== null && hoveredNode !== node.id && node.id !== 'core'}
                        viewMode={viewMode}
                    />
                ))}
            </div>

            <FloatingParticles count={25} />
        </div>
    );
}

// --- High-Fidelity Components ---

function DiagramNode({
    node,
    isHovered,
    onHover,
    dimmed,
    viewMode
}: {
    node: FlowNode,
    isHovered: boolean,
    onHover: (id: string | null) => void,
    dimmed: boolean,
    viewMode: ViewMode
}) {
    const isCore = node.type === 'core';
    const isMobile = viewMode === 'mobile';

    // Mobile adjustments
    const sizeMultiplier = isMobile ? 0.75 : (viewMode === 'laptop' ? 0.9 : 1);

    // Interaction Handler: Click toggles, Hover works if not relying on touch only
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling
        onHover(isHovered ? null : node.id);
    };

    return (
        <motion.div
            className={`absolute flex flex-col items-center gap-1.5 cursor-pointer select-none transition-all duration-500
        ${isCore ? 'z-30' : 'z-20'}
        ${dimmed ? 'opacity-30 blur-[1px] scale-90' : 'opacity-100 scale-100'}
      `}
            style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
            onClick={handleClick} // Universal click support
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: node.delay, type: 'spring', damping: 12 }}
        >
            {/* Node Container */}
            <div className="relative group">
                {/* Holographic Ring Effect */}
                <AnimatePresence>
                    {(isHovered || isCore) && (
                        <motion.div
                            className={`absolute inset-[-20%] rounded-full border border-${isCore ? 'cyan' : 'blue'}-500/30`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, rotate: 180 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.8, repeat: isCore ? Infinity : 0, ease: "linear" }}
                        />
                    )}
                </AnimatePresence>

                {/* Main Icon Box */}
                <div
                    className={`
            relative flex items-center justify-center rounded-2xl backdrop-blur-md transition-all duration-300
            ${isCore
                            ? 'bg-slate-900/80 border-2 border-cyan-400/60 shadow-[0_0_60px_rgba(6,182,212,0.4)]'
                            : 'bg-slate-900/60 border border-slate-700 hover:border-cyan-400/80 hover:bg-slate-800'
                        }
            ${isHovered ? 'shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-110' : ''}
        `}
                    style={{
                        width: isCore ? 100 * sizeMultiplier : 60 * sizeMultiplier,
                        height: isCore ? 100 * sizeMultiplier : 60 * sizeMultiplier,
                    }}
                >
                    {/* Core Inner Reactor */}
                    {isCore && (
                        <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl animate-pulse-slow" />
                    )}

                    <node.icon
                        className={`
              relative z-10 transition-all duration-300
              ${isCore ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}
            `}
                        style={{
                            color: isCore ? undefined : node.color,
                            width: isCore ? 40 * sizeMultiplier : 24 * sizeMultiplier,
                            height: isCore ? 40 * sizeMultiplier : 24 * sizeMultiplier
                        }}
                    />
                </div>
            </div>

            {/* Label & Details */}
            <div className={`
         text-center transition-all duration-300 flex flex-col items-center
         ${isHovered ? 'translate-y-0' : 'translate-y-1'}
      `}>
                <span className={`
            font-bold leading-tight tracking-tight whitespace-nowrap
            ${isCore ? 'text-xl text-white drop-shadow-md' : 'text-sm text-slate-200'}
            ${isMobile && !isCore ? 'text-[10px]' : ''}
            ${isMobile && isCore ? 'text-lg' : ''}
         `}>
                    {node.label}
                </span>

                {node.subLabel && (
                    <div className={`
                 overflow-hidden transition-all duration-300
                 ${(isHovered || isCore) ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0'}
             `}>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400/80 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-800/30 whitespace-nowrap">
                            {node.subLabel}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function ConnectionPath({ start, end, state }: { start: FlowNode, end: FlowNode, state: string }) {
    const isHighlighted = state === 'highlighted';
    const isDimmed = state === 'dimmed';

    const strokeColor = isHighlighted ? '#22d3ee' : start.color;
    const opacity = isDimmed ? 0.05 : (isHighlighted ? 0.8 : 0.2);
    const width = isHighlighted ? 2.5 : 1.5;

    return (
        <>
            <motion.line
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={strokeColor}
                strokeWidth={width}
                strokeOpacity={opacity}
                strokeLinecap="round"
                filter="url(#glow-path)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: start.delay }}
            />

            {!isDimmed && (
                <motion.div
                    className="absolute w-1 h-1 rounded-full bg-current"
                    style={{
                        color: strokeColor,
                        left: 0,
                        top: 0
                    }}
                    animate={{
                        left: [`${start.x}%`, `${end.x}%`],
                        top: [`${start.y}%`, `${end.y}%`],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: isHighlighted ? 1.5 : 3 + Math.random(),
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            )}
        </>
    );
}

function FloatingParticles({ count }: { count: number }) {
    const particles = useMemo(() => Array.from({ length: count }), [count]);
    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-cyan-200 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}
