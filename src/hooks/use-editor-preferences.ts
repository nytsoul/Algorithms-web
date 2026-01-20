import { useState, useEffect } from 'react';

export interface EditorPreferences {
    fontSize: number;
    fontFamily: string;
    tabSize: number;
    lineNumbers: boolean;
    autoComplete: boolean;
    minimap: boolean;
}

const DEFAULT_PREFERENCES: EditorPreferences = {
    fontSize: 14,
    fontFamily: 'Fira Code',
    tabSize: 2,
    lineNumbers: true,
    autoComplete: true,
    minimap: true
};

const STORAGE_KEY = 'algoverse_editor_prefs';

export function useEditorPreferences() {
    const [preferences, setPreferences] = useState<EditorPreferences>(DEFAULT_PREFERENCES);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
            }
        } catch (error) {
            console.error('Failed to load editor preferences:', error);
        }
    }, []);

    const updatePreference = <K extends keyof EditorPreferences>(
        key: K,
        value: EditorPreferences[K]
    ) => {
        const updated = { ...preferences, [key]: value };
        setPreferences(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const resetPreferences = () => {
        setPreferences(DEFAULT_PREFERENCES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
    };

    return {
        preferences,
        updatePreference,
        resetPreferences
    };
}
