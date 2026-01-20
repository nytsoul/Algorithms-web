import { useState, useCallback } from 'react';

export interface ExecutionResult {
    id: string;
    timestamp: number;
    code: string;
    output: Array<{ type: 'log' | 'error' | 'success', msg: string }>;
    executionTime: number;
    language: string;
    success: boolean;
}

const MAX_HISTORY = 10;

export function useExecutionHistory() {
    const [history, setHistory] = useState<ExecutionResult[]>([]);

    const addExecution = useCallback((
        code: string,
        output: Array<{ type: 'log' | 'error' | 'success', msg: string }>,
        executionTime: number,
        language: string,
        success: boolean
    ) => {
        const newExecution: ExecutionResult = {
            id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            code,
            output,
            executionTime,
            language,
            success
        };

        setHistory(prev => {
            const updated = [newExecution, ...prev];
            return updated.slice(0, MAX_HISTORY);
        });

        return newExecution.id;
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    const getExecution = useCallback((id: string) => {
        return history.find(exec => exec.id === id);
    }, [history]);

    return {
        history,
        addExecution,
        clearHistory,
        getExecution
    };
}
