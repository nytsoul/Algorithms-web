
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    language?: string;
    readOnly?: boolean;
}

export function CodeEditor({
    value,
    onChange,
    language = "javascript",
    readOnly = false
}: CodeEditorProps) {
    const { theme } = useTheme();

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-[var(--neon-purple)]/20 bg-black/20 backdrop-blur-sm">
            <div className="absolute top-2 right-2 z-10">
                <div className="px-2 py-1 rounded text-[10px] font-mono bg-[var(--neon-yellow)]/10 text-[var(--neon-yellow)] border border-[var(--neon-yellow)]/30">
                    LITE EDITOR MODE
                </div>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                readOnly={readOnly}
                spellCheck={false}
                className="w-full h-full p-4 font-mono text-sm bg-transparent text-foreground outline-none resize-none leading-relaxed"
                placeholder="// Write your code here..."
            />
            <div className="absolute bottom-2 right-4 text-[10px] text-muted-foreground opacity-50 font-mono">
                {language.toUpperCase()} • UTF-8
            </div>
        </div>
    );
}
