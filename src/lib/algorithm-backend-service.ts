import axios from 'axios';
import type { AlgorithmStep } from '@/types/visualization-types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function fetchAlgorithmSteps(type: string, params: Record<string, any>): Promise<AlgorithmStep[]> {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-steps`, {
            type,
            params
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching algorithm steps from Python backend:', error);
        throw error;
    }
}

export async function checkBackendStatus(): Promise<boolean> {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}
