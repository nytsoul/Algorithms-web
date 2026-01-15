import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, isSupabaseAvailable } from '@/lib/supabase';
import { ALL_1000_ALGORITHMS } from '@/lib/all-algorithms';

export interface Algorithm {
    id?: string;
    _id?: string;
    slug: string;
    name: string;
    category: string;
    domain: string;
    domainId?: number;
    difficulty: string;
    visualizationType?: "array" | "tree" | "graph" | "matrix" | "network" | "none";
    description: string;
    problemStatement?: string;
    exampleDiagram?: string;
    intuition?: string;
    pseudocode?: string;
    implementation?: string;
    language?: string;
    inventor?: string;
    yearIntroduced?: number;
    applications?: string[];
    advantages?: string[];
    disadvantages?: string[];
    relatedAlgorithms?: string[];
    researchReferences?: string[];
    stepByStepWorking?: string[];
    dryRun?: string;
    keyPoints?: string[];
    precondition?: string;
    practiceProblems?: Array<{
        id: string;
        title: string;
        difficulty: string;
        platform: string;
        url: string;
        tags: string[];
        description?: string;
        inputFormat?: string;
        outputFormat?: string;
        testCases?: Array<{ input: string, output: string }>;
    }>;
    flashcards?: Array<{
        question: string;
        answer: string;
    }>;
    timeComplexity: {
        average: string;
        best?: string;
        worst?: string;
    };
    spaceComplexity: string;
    tags: string[];
}

export function useAlgorithms() {
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAlgorithms() {
            // If not configured or not available, use mock data
            if (!isSupabaseConfigured || !isSupabaseAvailable()) {
                setAlgorithms(ALL_1000_ALGORITHMS as any);
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('algorithms')
                    .select('*');

                if (error) throw error;

                if (data && data.length > 0) {
                    setAlgorithms(data as any);
                } else {
                    setAlgorithms(ALL_1000_ALGORITHMS as any);
                }
            } catch (error) {
                console.warn('Supabase fetch failed, falling back to mock data:', error);
                setAlgorithms(ALL_1000_ALGORITHMS as any);
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
    const domainAlgorithms = algorithms.filter(a => a.domainId === domainId);
    return { algorithms: domainAlgorithms, isLoading };
}
