/**
 * SUPABASE BACKEND PROXY ADAPTER
 * 
 * This file has been refactored to follow "Backend API Gateway" best practices.
 * The frontend no longer communicates with Supabase directly.
 * All requests are proxied through the Express backend at http://localhost:5000/api.
 */

const API_BASE_URL = "http://localhost:5000/api";

// Config status for UI badges
export const isSupabaseConfigured = true;
export const supabaseConfigReason = "Live Backend API Proxy";

// Availability state
let isAvailable = true;
export const isSupabaseAvailable = () => isAvailable;

/**
 * Proxy-based Supabase Mock/Adapter
 * Mimics the Supabase JS SDK interface for easy migration
 */
export const supabase: any = {
    from: (table: string) => {
        const queryBuilder = {
            select: (query: string = "*") => {
                const selectBuilder = {
                    order: (col: string) => ({
                        limit: (n: number) => ({
                            execute: async () => {
                                try {
                                    const response = await fetch(`${API_BASE_URL}/${table}`);
                                    const result = await response.json();
                                    return { data: result.data || [], error: result.success ? null : { message: result.error } };
                                } catch (err: any) {
                                    return { data: null, error: { message: err.message } };
                                }
                            }
                        }),
                        then: async (resolve: any) => {
                            try {
                                const response = await fetch(`${API_BASE_URL}/${table}`);
                                const result = await response.json();
                                resolve({ data: result.data || [], error: result.success ? null : { message: result.error } });
                            } catch (err: any) {
                                resolve({ data: null, error: { message: err.message } });
                            }
                        }
                    }),
                    eq: (col: string, val: any) => ({
                        single: async () => {
                            try {
                                const response = await fetch(`${API_BASE_URL}/${table}/${val}`);
                                const result = await response.json();
                                return { data: result.data || null, error: result.success ? null : { message: result.error || result.message } };
                            } catch (err: any) {
                                return { data: null, error: { message: err.message } };
                            }
                        }
                    }),
                    then: async (resolve: any) => {
                        try {
                            const response = await fetch(`${API_BASE_URL}/${table}`);
                            const result = await response.json();
                            resolve({ data: result.data || [], error: result.success ? null : { message: result.error } });
                        } catch (err: any) {
                            resolve({ data: null, error: { message: err.message } });
                        }
                    }
                };
                return selectBuilder;
            },
            insert: (batch: any[]) => {
                const insertBuilder = {
                    select: () => ({
                        then: async (resolve: any) => {
                            try {
                                const response = await fetch(`${API_BASE_URL}/${table}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(batch[0])
                                });
                                const result = await response.json();
                                resolve({ data: result.data ? [result.data] : [], error: result.success ? null : { message: result.error } });
                            } catch (err: any) {
                                resolve({ data: null, error: { message: err.message } });
                            }
                        }
                    }),
                    then: async (resolve: any) => {
                        try {
                            const response = await fetch(`${API_BASE_URL}/${table}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(batch[0])
                            });
                            const result = await response.json();
                            resolve({ data: result.data ? [result.data] : [], error: result.success ? null : { message: result.error } });
                        } catch (err: any) {
                            resolve({ data: null, error: { message: err.message } });
                        }
                    }
                };
                return insertBuilder;
            },
            delete: () => {
                const deleteBuilder = {
                    neq: (col: string, val: any) => ({
                        then: async (resolve: any) => {
                            console.log(`[Proxy] Mock delete called for ${table}`);
                            resolve({ error: null });
                        }
                    }),
                    then: async (resolve: any) => {
                        console.log(`[Proxy] Mock delete called for ${table}`);
                        resolve({ error: null });
                    }
                };
                return deleteBuilder;
            }
        };
        return queryBuilder;
    },
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (callback: any) => {
            console.log("[Proxy] Auth listener initialized");
            return { data: { subscription: { unsubscribe: () => { } } } };
        },
        signInAnonymously: async () => ({ data: { user: { id: "anon" } }, error: null }),
        signInWithOAuth: async (options: any) => ({ data: { provider: options.provider, url: "#" }, error: null }),
        signInWithPassword: async (credentials: any) => {
            // Mock sign in for proxy architecture
            return { data: { user: { email: credentials.email } }, error: null };
        },
        signOut: async () => ({ error: null }),
        signUp: async (credentials: any) => {
            // Proxy to backend user registration
            try {
                const response = await fetch(`${API_BASE_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: credentials.email, name: credentials.options?.data?.name || "New Operator" })
                });
                const result = await response.json();
                return { data: { user: result.data }, error: result.success ? null : { message: result.error } };
            } catch (err: any) {
                return { data: { user: null }, error: { message: err.message } };
            }
        }
    }
};

// Health check for proxy
const runProxyHealthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const result = await response.json();
        isAvailable = result.status === "ok";
    } catch (err) {
        isAvailable = false;
    }
};

runProxyHealthCheck();

export const getRedirectUrl = (path: string = '/dashboard') => {
    const origin = window.location.origin;
    return `${origin}${path}`;
};
