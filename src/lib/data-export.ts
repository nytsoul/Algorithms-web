// Data export/import utilities

export interface UserData {
    progress: any;
    savedCode: any[];
    settings: any;
    executionHistory: any[];
    editorPreferences: any;
    timestamp: number;
}

export function exportUserData(): string {
    try {
        const data: UserData = {
            progress: JSON.parse(localStorage.getItem('algoverse_mastery') || '{}'),
            savedCode: JSON.parse(localStorage.getItem('algoverse_saved_code') || '[]'),
            settings: JSON.parse(localStorage.getItem('algoverse_settings') || '{}'),
            executionHistory: [], // Execution history is session-based, not exported
            editorPreferences: JSON.parse(localStorage.getItem('algoverse_editor_prefs') || '{}'),
            timestamp: Date.now()
        };

        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Failed to export data:', error);
        throw new Error('Failed to export user data');
    }
}

export function importUserData(jsonString: string): boolean {
    try {
        const data: UserData = JSON.parse(jsonString);

        // Validate data structure
        if (!data.timestamp || typeof data.timestamp !== 'number') {
            throw new Error('Invalid data format');
        }

        // Import data
        if (data.progress) localStorage.setItem('algoverse_mastery', JSON.stringify(data.progress));
        if (data.savedCode) localStorage.setItem('algoverse_saved_code', JSON.stringify(data.savedCode));
        if (data.settings) localStorage.setItem('algoverse_settings', JSON.stringify(data.settings));
        if (data.editorPreferences) localStorage.setItem('algoverse_editor_prefs', JSON.stringify(data.editorPreferences));

        return true;
    } catch (error) {
        console.error('Failed to import data:', error);
        throw new Error('Failed to import user data. Please check the file format.');
    }
}

export function clearAllUserData(): void {
    const keys = [
        'algoverse_mastery',
        'algoverse_saved_code',
        'algoverse_settings',
        'algoverse_editor_prefs',
        'algoverse_autosave'
    ];

    keys.forEach(key => {
        const pattern = new RegExp(`^${key}`);
        Object.keys(localStorage).forEach(storageKey => {
            if (pattern.test(storageKey)) {
                localStorage.removeItem(storageKey);
            }
        });
    });
}

export function calculateStorageUsage(): { used: number; total: number; percentage: number } {
    let totalSize = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length + key.length;
        }
    }

    // Convert to KB
    const usedKB = totalSize / 1024;
    // Most browsers allow 5-10MB, we'll use 5MB as conservative estimate
    const totalKB = 5 * 1024;
    const percentage = (usedKB / totalKB) * 100;

    return {
        used: Math.round(usedKB * 100) / 100,
        total: totalKB,
        percentage: Math.round(percentage * 100) / 100
    };
}

export function downloadJSON(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
