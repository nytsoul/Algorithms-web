import { useState, useEffect } from 'react';
import { supabase, isSupabaseReady } from '@/lib/supabase';
import { Algorithm, MOCK_ALGORITHMS } from '@/lib/algorithms-data';
import { ALL_1000_ALGORITHMS } from '@/lib/all-algorithms';
import { ALGORITHM_DOMAINS } from '@/lib/domains';

export function useAlgorithms() {
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAlgorithms() {
            if (!isSupabaseReady) {
                // Use all 1000 algorithms when Supabase is not configured
                console.log('📊 Loading ALL_1000_ALGORITHMS:', ALL_1000_ALGORITHMS.length);
                setAlgorithms(ALL_1000_ALGORITHMS);
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('algorithms')
                    .select('*');

                if (error) throw error;

                if (data && data.length > 0) {
                    console.log('📊 Loaded from Supabase:', data.length);
                    setAlgorithms(data);
                } else {
                    // Fallback to ALL_1000_ALGORITHMS dataset
                    console.log('📊 Fallback to ALL_1000_ALGORITHMS:', ALL_1000_ALGORITHMS.length);
                    setAlgorithms(ALL_1000_ALGORITHMS);
                }
            } catch (error) {
                console.error('Error fetching algorithms:', error);
                console.log('📊 Error fallback to ALL_1000_ALGORITHMS:', ALL_1000_ALGORITHMS.length);
                setAlgorithms(ALL_1000_ALGORITHMS);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAlgorithms();
    }, []);

    return { algorithms, isLoading };
}

export function useAlgorithmBySlug(slug: string) {
    const { algorithms, isLoading } = useAlgorithms();
    const algorithm = algorithms.find(a => a.slug === slug);
    return { algorithm, isLoading };
}

export function useAlgorithmsByDomain(domainId: number) {
    const { algorithms, isLoading } = useAlgorithms();
    // Filter by domain name (which matches the domain in ALGORITHM_DOMAINS)
    const domain = ALGORITHM_DOMAINS.find(d => d.id === domainId);
    const domainAlgorithms = algorithms.filter(a => 
        a.domain === domain?.name || a.domainId === domainId
    );
    return { algorithms: domainAlgorithms, isLoading };
}

export function useAlgorithmsByDifficulty(difficulty: string) {
    const { algorithms, isLoading } = useAlgorithms();
    const filteredAlgorithms = algorithms.filter(a => a.difficulty === difficulty);
    return { algorithms: filteredAlgorithms, isLoading };
}

