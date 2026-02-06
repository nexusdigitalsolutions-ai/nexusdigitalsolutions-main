import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { capabilitiesData } from '@/data/capabilitiesData';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function MobileCapabilitiesFlow() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress for the central "Neural Spine"
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative w-full py-12 px-4 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            {/* Central Neural Spine (DNA Helix Effect) */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-border/30 rounded-full">
                <motion.div
                    className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 origin-top rounded-full"
                    style={{ scaleY, height: '100%' }}
                />

                {/* Pulsing Nodes on Spine */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full h-full">
                    {capabilitiesData.map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-background border-2 border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10"
                            style={{ top: `${(i / (capabilitiesData.length - 1)) * 90 + 5}%` }}
                        />
                    ))}
                </div>
            </div>

            {/* Nodes Stream */}
            <div className="relative z-10 space-y-12 pl-8">
                {capabilitiesData.map((feature, index) => (
                    <MobileFeatureNode key={feature.id} feature={feature} index={index} />
                ))}
            </div>
        </div>
    );
}

function MobileFeatureNode({ feature, index }: { feature: any, index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
                relative rounded-xl border backdrop-blur-md overflow-hidden transition-all duration-300
                ${isExpanded
                    ? 'bg-card/80 border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]'
                    : 'bg-card/30 border-border/50 hover:bg-card/50'
                }
            `}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Header / Condensed View */}
            <div className="p-4 flex gap-4 items-center">
                {/* Connecting Line to Spine */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-primary/30 -ml-4" />

                {/* Icon Thumbnail */}
                <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300
                    ${isExpanded ? 'bg-primary/20 text-primary' : 'bg-background/50 text-muted-foreground'}
                `}>
                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-lg opacity-80"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold truncate transition-colors ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                        {feature.title}
                    </h3>
                    {!isExpanded && (
                        <p className="text-[10px] text-muted-foreground truncate">
                            Tap to explore details...
                        </p>
                    )}
                </div>

                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : ''}`} />
            </div>

            {/* Expanded Content */}
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="px-4 pb-4 pt-0 border-t border-border/10">
                    <p className="text-xs text-muted-foreground mb-3 mt-3 leading-relaxed">
                        {feature.description}
                    </p>

                    <div className="space-y-2">
                        {feature.features.map((item: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-[10px] text-foreground/80">
                                <ArrowRight className="w-3 h-3 text-primary" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
