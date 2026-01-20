import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface SavedCode {
    id: string;
    name: string;
    code: string;
    algorithmSlug: string;
    language: string;
    timestamp: number;
}

const STORAGE_KEY = 'algoverse_saved_code';
const AUTO_SAVE_KEY = 'algoverse_autosave';

export function useCodeStorage(algorithmSlug: string, language: string) {
    const [savedCodes, setSavedCodes] = useState<SavedCode[]>([]);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

    // Load saved codes on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSavedCodes(parsed.filter((item: SavedCode) =>
                    item.algorithmSlug === algorithmSlug
                ));
            }
        } catch (error) {
            console.error('Failed to load saved codes:', error);
        }
    }, [algorithmSlug]);

    // Save code manually
    const saveCode = useCallback((code: string, name?: string) => {
        try {
            const allStored = localStorage.getItem(STORAGE_KEY);
            const allCodes: SavedCode[] = allStored ? JSON.parse(allStored) : [];

            const newSave: SavedCode = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: name || `Solution ${new Date().toLocaleString()}`,
                code,
                algorithmSlug,
                language,
                timestamp: Date.now()
            };

            const updated = [...allCodes, newSave];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setSavedCodes(updated.filter(item => item.algorithmSlug === algorithmSlug));

            toast.success(`Code saved as "${newSave.name}"`);
            return newSave.id;
        } catch (error) {
            console.error('Failed to save code:', error);
            toast.error('Failed to save code');
            return null;
        }
    }, [algorithmSlug, language]);

    // Auto-save code
    const autoSave = useCallback((code: string) => {
        if (!autoSaveEnabled) return;

        try {
            const autoSaveData = {
                code,
                algorithmSlug,
                language,
                timestamp: Date.now()
            };
            localStorage.setItem(`${AUTO_SAVE_KEY}_${algorithmSlug}`, JSON.stringify(autoSaveData));
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }, [algorithmSlug, language, autoSaveEnabled]);

    // Load auto-saved code
    const loadAutoSave = useCallback(() => {
        try {
            const stored = localStorage.getItem(`${AUTO_SAVE_KEY}_${algorithmSlug}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed.code;
            }
        } catch (error) {
            console.error('Failed to load auto-save:', error);
        }
        return null;
    }, [algorithmSlug]);

    // Delete saved code
    const deleteCode = useCallback((id: string) => {
        try {
            const allStored = localStorage.getItem(STORAGE_KEY);
            if (allStored) {
                const allCodes: SavedCode[] = JSON.parse(allStored);
                const updated = allCodes.filter(item => item.id !== id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setSavedCodes(updated.filter(item => item.algorithmSlug === algorithmSlug));
                toast.success('Code deleted');
            }
        } catch (error) {
            console.error('Failed to delete code:', error);
            toast.error('Failed to delete code');
        }
    }, [algorithmSlug]);

    // Load specific saved code
    const loadCode = useCallback((id: string) => {
        const code = savedCodes.find(item => item.id === id);
        return code?.code || null;
    }, [savedCodes]);

    return {
        savedCodes,
        saveCode,
        autoSave,
        loadAutoSave,
        deleteCode,
        loadCode,
        autoSaveEnabled,
        setAutoSaveEnabled
    };
}
