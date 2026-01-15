import { supabase } from "@/lib/supabase";
import { ALL_1000_ALGORITHMS } from "@/lib/all-algorithms";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Database } from "lucide-react";
import { toast } from "sonner";

export function SupabaseSeeder() {
    const [isSeeding, setIsSeeding] = useState(false);
    const [progress, setProgress] = useState(0);

    const seedDatabase = async () => {
        setIsSeeding(true);
        setProgress(0);
        try {
            // Clear existing algorithms (optional but recommended for a clean seed)
            // Warning: This will delete all existing data in the table
            const { error: deleteError } = await supabase.from('algorithms').delete().neq('slug', '');
            if (deleteError) {
                console.error("Delete error:", deleteError);
                toast.error("Failed to clear existing database.");
            }

            // Supabase recommends batching large inserts
            const batchSize = 50;
            const totalAlgorithms = ALL_1000_ALGORITHMS.length;
            
            for (let i = 0; i < totalAlgorithms; i += batchSize) {
                const batch = ALL_1000_ALGORITHMS.slice(i, i + batchSize);
                const { error } = await supabase.from('algorithms').insert(batch);

                if (error) {
                    console.error(`Error seeding batch ${i / batchSize + 1}:`, error);
                    toast.error(`Error in batch ${i / batchSize + 1}`);
                    break;
                }

                const currentProgress = Math.min(((i + batchSize) / totalAlgorithms) * 100, 100);
                setProgress(Math.round(currentProgress));
            }

            toast.success("✅ Database seeded with 1000 algorithms successfully!");
        } catch (error) {
            console.error("Seeding failed:", error);
            toast.error("Database seeding failed.");
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <Button
                onClick={seedDatabase}
                disabled={isSeeding}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                {isSeeding ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Seeding ({progress}%)
                    </>
                ) : (
                    <>
                        <Database className="w-4 h-4" />
                        Seed 1k Algorithms
                    </>
                )}
            </Button>
        </div>
    );
}
