export interface AlgorithmDomain {
    id: number;
    name: string;
    count: number;
    icon: string;
    description: string;
    color: string;
}

// Updated domains matching the seed script (1130 total algorithms across 11 domains)
export const ALGORITHM_DOMAINS: AlgorithmDomain[] = [
    { 
        id: 1, 
        name: "DSA", 
        count: 111, 
        icon: "💾", 
        description: "Data Structures & Algorithms - Foundation layer for implementation", 
        color: "cyan" 
    },
    { 
        id: 2, 
        name: "DAA", 
        count: 89, 
        icon: "📊", 
        description: "Design & Analysis of Algorithms - Design paradigms and complexity analysis", 
        color: "pink" 
    },
    { 
        id: 3, 
        name: "AI", 
        count: 85, 
        icon: "🤖", 
        description: "Artificial Intelligence - Decision making, reasoning, and planning", 
        color: "purple" 
    },
    { 
        id: 4, 
        name: "ML", 
        count: 97, 
        icon: "🧠", 
        description: "Machine Learning - Learning from data and pattern recognition", 
        color: "blue" 
    },
    { 
        id: 5, 
        name: "Networks", 
        count: 84, 
        icon: "🌐", 
        description: "Computer Networks - Communication, routing, and data transmission", 
        color: "green" 
    },
    { 
        id: 6, 
        name: "Security", 
        count: 117, 
        icon: "🔐", 
        description: "Security & Cryptography - Confidentiality, integrity, and authentication", 
        color: "red" 
    },
    { 
        id: 7, 
        name: "Systems", 
        count: 113, 
        icon: "⚙️", 
        description: "Systems - OS, Distributed Systems, and Cloud Computing", 
        color: "yellow" 
    },
    { 
        id: 8, 
        name: "Graphics", 
        count: 121, 
        icon: "🎨", 
        description: "Graphics & Vision - Visual computation and image processing", 
        color: "indigo" 
    },
    { 
        id: 9, 
        name: "Optimization", 
        count: 97, 
        icon: "📈", 
        description: "Optimization - Mathematical and heuristic optimization methods", 
        color: "orange" 
    },
    { 
        id: 10, 
        name: "Emerging", 
        count: 111, 
        icon: "🚀", 
        description: "Emerging CS Domains - Modern and interdisciplinary fields", 
        color: "teal" 
    },
    { 
        id: 11, 
        name: "Theory", 
        count: 105, 
        icon: "🎓", 
        description: "Theory - Theoretical CS and mathematical foundations", 
        color: "violet" 
    }
];

export function getDomainById(id: number): AlgorithmDomain | undefined {
    return ALGORITHM_DOMAINS.find(domain => domain.id === id);
}

export function getDomainsByCategory(category: string): AlgorithmDomain[] {
    const categories: Record<string, number[]> = {
        "DSA": [1],
        "DAA": [2],
        "AI": [3],
        "ML": [4],
        "Networks": [5],
        "Security": [6],
        "Systems": [7],
        "Graphics": [8],
        "Optimization": [9],
        "Emerging": [10],
        "Theory": [11]
    };
    
    const domainIds = categories[category] || [];
    return ALGORITHM_DOMAINS.filter(domain => domainIds.includes(domain.id));
}

export function getTotalAlgorithms(): number {
    return ALGORITHM_DOMAINS.reduce((total, domain) => total + domain.count, 0);
}

export function getDomainCount(): number {
    return ALGORITHM_DOMAINS.length;
}
