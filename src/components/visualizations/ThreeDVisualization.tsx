
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera, Float, Text3D, Center } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

interface ThreeDVisualizationProps {
    algorithmName?: string;
}

function AlgorithmGrid() {
    const grid = useMemo(() => {
        const size = 10;
        const divisions = 10;
        return new THREE.GridHelper(size, divisions, 0x00ffff, 0x004444);
    }, []);

    return <primitive object={grid} rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]} />;
}

function DataBox({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={position}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
                <Center position={[0, 1.2, 0]}>
                    <Text3D font="/fonts/Geist_Regular.json" size={0.2} height={0.05}>
                        {label}
                        <meshStandardMaterial color="white" />
                    </Text3D>
                </Center>
            </mesh>
        </Float>
    );
}

export default function ThreeDVisualization({ algorithmName = "Algorithm" }: ThreeDVisualizationProps) {
    return (
        <div className="w-full h-full min-h-[500px] bg-black rounded-xl overflow-hidden border border-[var(--neon-cyan)]/20 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Badge variant="outline" className="bg-black/50 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)]">
                    3D Space Activated
                </Badge>
                <Badge variant="outline" className="bg-black/50 border-[var(--neon-purple)]/50 text-[var(--neon-purple)]">
                    Experimental
                </Badge>
            </div>

            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                <OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} color="#ff00ff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <AlgorithmGrid />

                    {/* Simulated 3D Data Structure */}
                    <DataBox position={[-2, 0, 0]} color="#00f3ff" label="Node A" />
                    <DataBox position={[0, 0, 0]} color="#ff00ff" label="Node B" />
                    <DataBox position={[2, 0, 0]} color="#00f3ff" label="Node C" />

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial color="#050505" />
                    </mesh>
                </Suspense>
            </Canvas>

            <div className="absolute bottom-4 right-4 z-10 text-[10px] text-muted-foreground font-mono">
                CTRL + DRAG TO ROTATE • SCROLL TO ZOOM
            </div>
        </div>
    );
}

// Simple Badge component since we can't import from ui if we want to be safe in this file
function Badge({ variant, className, children }: any) {
    return (
        <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}>
            {children}
        </div>
    );
}
