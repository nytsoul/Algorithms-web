import { useState, useEffect } from 'react';

interface MasteryState {
    points: number;
    solvedProblemIds: string[];
    enrolledPaths: Record<string, number>; // pathTitle -> progress percentage
    streak: number;
    lastSolvedDate: string | null;
    masteredAlgosharedIds: string[];
}

const STORAGE_KEY = 'algoverse_mastery_state';

const initialState: MasteryState = {
    points: 0,
    solvedProblemIds: [],
    enrolledPaths: {
        "Data Structures Fundamentals": 65,
        "Algorithm Design Patterns": 30,
        "Advanced Graph Algorithms": 0
    },
    streak: 14,
    lastSolvedDate: null,
    masteredAlgosharedIds: []
};

export function useMastery() {
    const [state, setState] = useState<MasteryState>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const addPoints = (amount: number) => {
        setState(prev => ({ ...prev, points: prev.points + amount }));
    };

    const solveProblem = (problemId: string, pointReward: number = 50) => {
        if (state.solvedProblemIds.includes(problemId)) return;

        setState(prev => ({
            ...prev,
            points: prev.points + pointReward,
            solvedProblemIds: [...prev.solvedProblemIds, problemId]
        }));
    };

    const enrollPath = (pathTitle: string) => {
        if (state.enrolledPaths[pathTitle] !== undefined) return;
        setState(prev => ({
            ...prev,
            enrolledPaths: { ...prev.enrolledPaths, [pathTitle]: 0 }
        }));
    };

    const updatePathProgress = (pathTitle: string, progress: number) => {
        setState(prev => ({
            ...prev,
            enrolledPaths: { ...prev.enrolledPaths, [pathTitle]: progress }
        }));
    };

    const completeDailyProtocol = () => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastSolvedDate === today) return;

        setState(prev => ({
            ...prev,
            points: prev.points + 100,
            streak: prev.streak + 1,
            lastSolvedDate: today
        }));
    };

    return {
        ...state,
        addPoints,
        solveProblem,
        enrollPath,
        updatePathProgress,
        completeDailyProtocol
    };
}
