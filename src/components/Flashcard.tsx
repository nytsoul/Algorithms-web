import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
    question: string;
    answer: string;
    index: number;
}

export default function Flashcard({ question, answer, index }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group perspective-1000 h-64 w-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full preserve-3d shadow-xl rounded-xl"
            >
                {/* Front Side */}
                <Card className="absolute inset-0 backface-hidden w-full h-full flex flex-col items-center justify-center p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-[var(--neon-cyan)]/50 transition-colors">
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <HelpCircle className="w-3 h-3" />
                        Card #{index + 1}
                    </div>
                    <div className="absolute top-4 right-4">
                        <RefreshCw className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{question}</h3>
                    <p className="mt-4 text-sm text-[var(--neon-cyan)] font-medium animate-pulse">Click to Reveal</p>
                </Card>

                {/* Back Side */}
                <Card
                    className="absolute inset-0 backface-hidden w-full h-full flex flex-col items-center justify-center p-8 text-center bg-background border-[var(--neon-cyan)] overflow-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                    <div className="relative z-10">
                        <div className="text-xs font-mono text-[var(--neon-cyan)] mb-4 uppercase tracking-widest">Mastery Insight</div>
                        <p className="text-lg leading-relaxed">{answer}</p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <RefreshCw className="w-4 h-4 text-[var(--neon-cyan)] opacity-40" />
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

export function FlashcardGrid({ flashcards }: { flashcards: Array<{ question: string, answer: string }> }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card, i) => (
                <Flashcard key={i} index={i} question={card.question} answer={card.answer} />
            ))}
        </div>
    );
}
