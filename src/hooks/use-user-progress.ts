
import { useState, useEffect } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export interface UserProgress {
    favorites: string[];
    completed: string[];
}

export function useUserProgress() {
    const { user } = useAuth();
    const [progress, setProgress] = useState<UserProgress>({
        favorites: [],
        completed: []
    });
    const [isLoading, setIsLoading] = useState(true);

    // Load initial progress
    useEffect(() => {
        async function loadProgress() {
            if (!isSupabaseReady || !user) {
                // Fallback to local storage for guests or if Supabase is offline
                const localFavs = JSON.parse(localStorage.getItem("algo-favorites") || "[]");
                const localComp = JSON.parse(localStorage.getItem("algo-completed") || "[]");
                setProgress({ favorites: localFavs, completed: localComp });
                setIsLoading(false);
                return;
            }

            try {
                const [favsRes, compRes] = await Promise.all([
                    supabase.from('user_favorites').select('algo_slug').eq('user_id', user.id),
                    supabase.from('user_progress').select('algo_slug').eq('user_id', user.id).eq('status', 'completed')
                ]);

                if (favsRes.error) throw favsRes.error;
                if (compRes.error) throw compRes.error;

                setProgress({
                    favorites: favsRes.data.map(f => f.algo_slug),
                    completed: compRes.data.map(c => c.algo_slug)
                });
            } catch (err) {
                console.error("Error loading progress:", err);
            } finally {
                setIsLoading(false);
            }
        }

        loadProgress();
    }, [user]);

    const toggleFavorite = async (slug: string) => {
        const isFav = progress.favorites.includes(slug);
        const newFavs = isFav
            ? progress.favorites.filter(s => s !== slug)
            : [...progress.favorites, slug];

        setProgress(prev => ({ ...prev, favorites: newFavs }));

        if (!isSupabaseReady || !user) {
            localStorage.setItem("algo-favorites", JSON.stringify(newFavs));
            toast(isFav ? "Removed from favorites" : "Added to favorites!");
            return;
        }

        if (isFav) {
            await supabase.from('user_favorites').delete().eq('user_id', user.id).eq('algo_slug', slug);
            toast.info("Removed from favorites");
        } else {
            await supabase.from('user_favorites').insert({ user_id: user.id, algo_slug: slug });
            toast.success("Added to favorites!");
        }
    };

    const toggleCompleted = async (slug: string) => {
        const isComp = progress.completed.includes(slug);
        const newComp = isComp
            ? progress.completed.filter(s => s !== slug)
            : [...progress.completed, slug];

        setProgress(prev => ({ ...prev, completed: newComp }));

        if (!isSupabaseReady || !user) {
            localStorage.setItem("algo-completed", JSON.stringify(newComp));
            toast(isComp ? "Algorithm marked as incomplete" : "Algorithm completed! 🎓");
            return;
        }

        if (isComp) {
            await supabase.from('user_progress').delete().eq('user_id', user.id).eq('algo_slug', slug);
            toast.info("Algorithm marked as incomplete");
        } else {
            await supabase.from('user_progress').upsert({
                user_id: user.id,
                algo_slug: slug,
                status: 'completed',
                completed_at: new Date().toISOString()
            });
            toast.success("Algorithm marked as completed! 🎓");
        }
    };

    return {
        ...progress,
        isLoading,
        toggleFavorite,
        toggleCompleted,
        isFavorite: (slug: string) => progress.favorites.includes(slug),
        isCompleted: (slug: string) => progress.completed.includes(slug)
    };
}
