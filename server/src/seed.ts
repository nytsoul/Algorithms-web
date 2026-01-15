import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

faker.seed(42);

const domains = [
    { id: 1, name: "DSA", description: "Data Structures & Algorithms - The foundation of CS" },
    { id: 2, name: "DAA", description: "Design & Analysis of Algorithms - Design patterns & efficiency" },
    { id: 3, name: "AI", description: "Artificial Intelligence - Decision-making & reasoning" },
    { id: 4, name: "ML", description: "Machine Learning - Patterns & predictions from data" },
    { id: 5, name: "Networks", description: "Computer Networks - Communication & reliability" },
    { id: 6, name: "Security", description: "Cryptography & Security - Protection & privacy" },
    { id: 7, name: "Systems", description: "OS & Distributed Systems - Hardware & coordination" },
    { id: 8, name: "Graphics", description: "Graphics & Vision - Visual computation & rendering" },
    { id: 9, name: "Optimization", description: "Optimization Algorithms - Best solutions under constraints" },
    { id: 10, name: "Emerging", description: "Emerging CS Domains - Future technologies" },
    { id: 11, name: "Theory", description: "Theoretical CS - Computability & complexity theory" }
];

const categories: any = {
    "DSA": ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Sorting", "Searching"],
    "DAA": ["Divide & Conquer", "Greedy", "Dynamic Programming", "Backtracking", "Branch & Bound", "Approximation", "Complexity Proofs"],
    "AI": ["Heuristic Search", "Game Playing", "Knowledge Representation", "Planning", "Probabilistic Reasoning", "Reinforcement Learning"],
    "ML": ["Regression", "Classification", "Clustering", "Neural Networks", "Deep Learning", "Dimensionality Reduction"],
    "Networks": ["Routing", "Congestion Control", "Flow Control", "Error Handling", "Protocol Logic"],
    "Security": ["Encryption", "Decryption", "Hashing", "Digital Signatures", "Blockchain", "Consensus"],
    "Systems": ["Scheduling", "Memory Management", "Deadlock Avoidance", "Distributed Coordination", "Cloud Scaling"],
    "Graphics": ["Rendering", "Rasterization", "Ray Tracing", "Culling", "Image Processing", "Vision Pipelines"],
    "Optimization": ["Linear Programming", "Heuristics", "Metaheuristics", "Genetic Algorithms", "Simulated Annealing"],
    "Emerging": ["Blockchain", "Federated Learning", "Swarm Intelligence", "Edge Computing", "Quantum Simulation"],
    "Theory": ["Automata", "Computability", "Complexity Classes", "Reductions", "Formal Proofs"]
};

function generateAlgorithm(index: number) {
    const domainObj = faker.helpers.arrayElement(domains);
    const domain = domainObj.name;
    const category = faker.helpers.arrayElement(categories[domain] || ["General"]);
    const name = `${faker.hacker.adjective()} ${faker.hacker.ingverb()} ${category} ${index}`;
    const slug = faker.helpers.slugify(name.toLowerCase());

    return {
        slug,
        name,
        category,
        domain,
        domain_id: domainObj.id,
        difficulty: faker.helpers.arrayElement(["Beginner", "Intermediate", "Advanced", "Expert"]),
        visualization_type: faker.helpers.arrayElement(["array", "tree", "graph"]),
        description: faker.lorem.paragraph(),
        intuition: faker.lorem.sentences(2),
        pseudocode: `function ${slug.replace(/-/g, '_')}(data) {\n  let result = [];\n  for (let item of data) {\n    if (check(item)) {\n      process(item);\n    }\n  }\n  return result;\n}`,
        implementation: `function ${slug.replace(/-/g, '_')}(input) {\n  return input;\n}`,
        time_complexity: {
            average: faker.helpers.arrayElement(["O(n)", "O(n log n)", "O(n²)", "O(log n)", "O(1)", "O(2^n)"]),
            best: "O(1)",
            worst: "O(n²)"
        },
        space_complexity: faker.helpers.arrayElement(["O(1)", "O(n)", "O(log n)"]),
        tags: [category.toLowerCase(), domain.toLowerCase(), faker.hacker.noun()],
        applications: [faker.hacker.phrase(), faker.hacker.phrase()],
        advantages: [faker.company.catchPhrase(), faker.company.catchPhrase()],
        disadvantages: [faker.hacker.phrase(), faker.hacker.phrase()],
        related_algorithms: [faker.hacker.noun(), faker.hacker.noun()],
        research_references: [faker.internet.url(), faker.internet.url()]
    };
}

async function seed() {
    console.log("🚀 Starting synchronization of 1000 algorithms...");

    // Delete existing to avoid duplicates if re-running
    const { error: deleteError } = await supabase.from("algorithms").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
        console.warn("Could not clear existing table, proceeding with inserts...");
    }

    const batchSize = 100;
    for (let i = 0; i < 1000; i += batchSize) {
        const batch = Array.from({ length: batchSize }, (_, j) => generateAlgorithm(i + j + 1));
        const { error } = await supabase.from("algorithms").insert(batch);

        if (error) {
            console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
        } else {
            console.log(`✅ Batch ${i / batchSize + 1} synced.`);
        }
    }

    console.log("✨ Synchronization completed!");
}

seed();
