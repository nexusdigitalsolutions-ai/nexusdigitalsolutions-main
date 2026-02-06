import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Line, useTexture, Float, OrbitControls, Billboard, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { capabilitiesData, CapabilityFeature } from '@/data/capabilitiesData';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Types ---
interface FeatureNodeProps {
    feature: CapabilityFeature;
    position: [number, number, number];
    isHovered: boolean;
    onHover: (id: string | null) => void;
}

// --- Animated Connection Component ---
function AnimatedConnection({ start, end, isHovered }: { start: [number, number, number]; end: [number, number, number]; isHovered: boolean }) {
    const lineRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (lineRef.current?.material) {
            // Animate dash offset to simulate rapid energy flow towards center
            lineRef.current.material.dashOffset -= delta * 3; // Faster speed
        }
    });

    return (
        <Line
            ref={lineRef}
            points={[start, end]}
            color={isHovered ? "#60a5fa" : "#4ade80"} // Bright blue/green
            opacity={isHovered ? 1 : 0.8}
            transparent
            lineWidth={3} // Thicker line
            dashed
            dashScale={2} // Tighter pattern
            dashSize={0.2} // Short bursts of energy
            gapSize={0.5}  // Longer gaps between bursts
        />
    );
}

// --- Individual Node Component ---
function FeatureNode({ feature, position, isHovered, onHover }: FeatureNodeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(feature.image);

    // Fix texture colorspace for consistency
    texture.colorSpace = THREE.SRGBColorSpace;

    // Subtle rotation animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group position={position}>
            {/* Animated Connection Line to Center (0,0,0) */}
            <AnimatedConnection
                start={[0, 0, 0]} // Relative to this group, 0,0,0 is the node center
                end={[-position[0], -position[1], -position[2]]} // Vector to world center
                isHovered={isHovered}
            />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        onHover(feature.id);
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={(e) => {
                        onHover(null);
                        document.body.style.cursor = 'auto';
                    }}
                    scale={isHovered ? 1.5 : 1}
                >
                    {/* High-poly sphere for smooth look */}
                    <sphereGeometry args={[1, 64, 64]} />
                    {/* Using mostly emissive material to ensure image is bright and visible regardless of lighting */}
                    <meshStandardMaterial
                        map={texture}
                        color="#ffffff"
                        emissiveMap={texture}
                        emissive="#ffffff"
                        emissiveIntensity={isHovered ? 0.8 : 0.5} // High emission for visibility
                        roughness={0.2}
                        metalness={0.1}
                    />
                </mesh>
            </Float>

            {/* Billboard ensures Text always faces the camera */}
            <Billboard
                position={[0, -1.5, 0]}
                follow={true}
                lockX={false}
                lockY={false}
                lockZ={false}
            >
                <Text
                    fontSize={0.35}
                    color="white"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={3}
                    textAlign="center"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {feature.title}
                </Text>
            </Billboard>

            {/* HTML Overlay for Details (Visible on Hover) */}
            <Html position={[0, 0, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            style={{
                                width: '320px',
                                transform: 'translate(-50%, -130%)', // Position higher to avoid overlap
                                pointerEvents: 'none',
                            }}
                            className="bg-background/95 backdrop-blur-md border border-primary/20 p-5 rounded-xl shadow-2xl"
                        >
                            <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                            <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{feature.description}</p>
                            <div className="space-y-1.5">
                                {feature.features.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Html>
        </group>
    );
}

// --- Central System Node (Galaxy Core) ---
function CentralNode({ isAnyHovered }: { isAnyHovered: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Galaxy rotation
            groupRef.current.rotation.y -= delta * 0.05;
        }
    });

    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={groupRef}>
                    {/* Inner Glowing Core */}
                    <mesh>
                        <sphereGeometry args={[2, 64, 64]} />
                        <meshStandardMaterial
                            color="#4338ca" // White hot center
                            emissive="#6542eeff" // Deep blue/indigo glow
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* Galaxy Particles/Stars */}
                    <Sparkles
                        count={150}
                        scale={5}
                        size={5}
                        speed={0.4}
                        opacity={1}
                        color="#4338ca"
                    />
                    <Sparkles
                        count={80}
                        scale={7}
                        size={8}
                        speed={0.2}
                        opacity={0.7}
                        color="#4338ca"
                    />
                </group>

                {/* Internal Light source to illuminate surrounding connections from the center */}
                <pointLight distance={100} intensity={1} color="red" />
            </Float>

            {/* Static Text Heading */}
            <Billboard>
                <Text
                    position={[0, 0, 3.5]} // Outside the core
                    fontSize={0.45}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    textAlign="center"
                    outlineWidth={0.04}
                    outlineColor="#000000"
                    fillOpacity={1}
                >
                    ACCESS.AI
                </Text>
            </Billboard>
        </group>
    )
}



// --- Responsive Camera Controller ---
function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        const aspect = size.width / size.height;
        // Estimated total width of the scene to keep visible (nodes + text margins)
        const targetSceneWidth = 38;

        // Calculate required distance to fit target width:
        // distance = (width / 2) / (aspect * tan(fov / 2))
        const fov = 45;
        const rad = (fov * Math.PI) / 180;
        const dist = (targetSceneWidth / 2) / (Math.tan(rad / 2) * aspect);

        // Set camera Z (min 24 for desktop aesthetic, dynamic for mobile)
        camera.position.z = Math.max(24, dist);
        camera.updateProjectionMatrix();
    }, [camera, size]);

    return null;
}

// --- Main Scene Component ---
export default function CapabilitiesTree() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Calculate positions in a circle/sphere
    const nodePositions = useMemo(() => {
        const radius = 11; // Increased radius for better spacing
        return capabilitiesData.map((_, index) => {
            const angle = (index / capabilitiesData.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * (radius * 0.6);
            const y = Math.sin(angle * 2) * 2.5; // Increased height variation
            return [x, y, z] as [number, number, number];
        });
    }, []);

    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 2, 24], fov: 45 }} gl={{ toneMapping: THREE.NoToneMapping }}>
                <ResponsiveCamera />
                {/* Simple bright lighting setup */}
                <ambientLight intensity={3} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <pointLight position={[-10, 10, 10]} intensity={2} />
                <pointLight position={[0, -10, 10]} intensity={2} />

                <CentralNode isAnyHovered={!!hoveredId} />

                {capabilitiesData.map((feature, index) => (
                    <FeatureNode
                        key={feature.id}
                        feature={feature}
                        position={nodePositions[index]}
                        isHovered={hoveredId === feature.id}
                        onHover={setHoveredId}
                    />
                ))}

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    autoRotate={!hoveredId}
                    autoRotateSpeed={0.5}
                    minDistance={10}
                    maxDistance={150}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                    makeDefault // Ensures controls work correctly with gestures
                />

                <fog attach="fog" args={['#020817', 5, 180]} />
            </Canvas>
        </div>
    );
}
