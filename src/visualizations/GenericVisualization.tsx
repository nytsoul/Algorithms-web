import { motion } from "framer-motion";

export function GenericVisualization({ algorithmName }: { algorithmName: string }) {
    const particles = Array.from({ length: 20 });

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Pulse */}
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-[var(--neon-cyan)]/5"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Central Node */}
            <div className="z-10 text-center">
                <motion.div
                    className="w-32 h-32 rounded-lg border-2 border-[var(--neon-purple)] bg-background/50 flex items-center justify-center mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-24 h-24 rounded border border-[var(--neon-cyan)] flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] opacity-20 blur-xl absolute" />
                        <span className="text-2xl font-bold text-[var(--neon-cyan)]">CORE</span>
                    </div>
                </motion.div>
                <p className="text-sm font-mono text-[var(--neon-pink)] uppercase tracking-widest animate-pulse">
                    Processing {algorithmName}...
                </p>
            </div>

            {/* Orbiting Particles */}
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[var(--neon-cyan)] rounded-full"
                    animate={{
                        x: [
                            Math.cos(i * 0.5) * 150,
                            Math.cos(i * 0.5 + Math.PI) * 150,
                            Math.cos(i * 0.5) * 150
                        ],
                        y: [
                            Math.sin(i * 0.5) * 150,
                            Math.sin(i * 0.5 + Math.PI) * 150,
                            Math.sin(i * 0.5) * 150
                        ],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
}
