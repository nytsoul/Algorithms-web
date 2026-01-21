from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .models import AlgorithmRequest, AlgorithmStep
from .algorithms.sorting import (
    generate_bubble_sort_steps, generate_quick_sort_steps, generate_merge_sort_steps,
    generate_selection_sort_steps, generate_insertion_sort_steps, generate_heap_sort_steps,
    generate_counting_sort_steps, generate_radix_sort_steps, generate_shell_sort_steps,
    generate_bucket_sort_steps, generate_comb_sort_steps, generate_cycle_sort_steps,
    generate_odd_even_sort_steps, generate_tim_sort_steps, generate_tree_sort_steps
)

from .algorithms.searching import (
    generate_binary_search_steps, generate_exponential_search_steps,
    generate_linear_search_steps, generate_jump_search_steps,
    generate_interpolation_search_steps, generate_ternary_search_steps,
    generate_fibonacci_search_steps, generate_hash_search_steps
)

from .algorithms.greedy import (
    generate_activity_selection_steps, generate_fractional_knapsack_steps,
    generate_job_sequencing_steps, generate_huffman_coding_steps,
    generate_coin_change_greedy_steps, generate_min_platforms_steps,
    generate_optimal_merge_pattern_steps
)

from .algorithms.dynamic_programming import (
    generate_fibonacci_dp_steps, generate_knapsack_01_steps,
    generate_lcs_steps, generate_unbounded_knapsack_steps,
    generate_lis_steps, generate_edit_distance_steps,
    generate_rod_cutting_steps, generate_subset_sum_steps,
    generate_partition_problem_steps, generate_matrix_chain_multiplication_steps
)

from .algorithms.graph import (
    generate_bfs_steps, generate_dfs_steps, generate_topological_sort_steps,
    generate_dijkstra_steps, generate_kruskal_steps, generate_prim_steps,
    generate_floyd_warshall_steps, generate_bellman_ford_steps
)

from .algorithms.advanced import (
    generate_n_queens_steps, generate_sudoku_solver_steps,
    generate_kmp_steps, generate_rabin_karp_steps,
    generate_karatsuba_steps, generate_closest_pair_steps,
    generate_fft_steps, generate_convex_hull_steps
)


app = FastAPI(title="Algorithms Backend", description="Python logic for Algorithm Visualizations")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Algorithms Backend is running", "status": "healthy"}

@app.post("/generate-steps", response_model=List[AlgorithmStep])
async def generate_steps(request: AlgorithmRequest):
    algo_type = request.type
    params = request.params
    
    # Sorting
    if algo_type == 'bubble-sort':
        return generate_bubble_sort_steps(params.get('array', []))
    elif algo_type == 'quick-sort':
        return generate_quick_sort_steps(params.get('array', []))
    elif algo_type == 'merge-sort':
        return generate_merge_sort_steps(params.get('array', []))
    elif algo_type == 'selection-sort':
        return generate_selection_sort_steps(params.get('array', []))
    elif algo_type == 'insertion-sort':
        return generate_insertion_sort_steps(params.get('array', []))
    elif algo_type == 'heap-sort':
        return generate_heap_sort_steps(params.get('array', []))
    elif algo_type == 'counting-sort':
        return generate_counting_sort_steps(params.get('array', []))
    elif algo_type == 'radix-sort':
        return generate_radix_sort_steps(params.get('array', []))
    elif algo_type == 'shell-sort':
        return generate_shell_sort_steps(params.get('array', []))
    elif algo_type == 'bucket-sort':
        return generate_bucket_sort_steps(params.get('array', []))
    elif algo_type == 'comb-sort':
        return generate_comb_sort_steps(params.get('array', []))
    elif algo_type == 'cycle-sort':
        return generate_cycle_sort_steps(params.get('array', []))
    elif algo_type == 'odd-even-sort':
        return generate_odd_even_sort_steps(params.get('array', []))
    elif algo_type == 'tim-sort':
        return generate_tim_sort_steps(params.get('array', []))
    elif algo_type == 'tree-sort':
        return generate_tree_sort_steps(params.get('array', []))

        
    # Searching
    elif algo_type == 'binary-search':
        return generate_binary_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'exponential-search':
        return generate_exponential_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'linear-search':
        return generate_linear_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'jump-search':
        return generate_jump_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'interpolation-search':
        return generate_interpolation_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'ternary-search':
        return generate_ternary_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'fibonacci-search':
        return generate_fibonacci_search_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'hash-search':
        return generate_hash_search_steps(params.get('array', []), params.get('target', 0))

    # Greedy
    elif algo_type == 'activity-selection':
        return generate_activity_selection_steps(params.get('startTimes', []), params.get('endTimes', []))
    elif algo_type == 'fractional-knapsack':
        return generate_fractional_knapsack_steps(params.get('weights', []), params.get('values', []), params.get('capacity', 0))
    elif algo_type == 'job-sequencing':
        return generate_job_sequencing_steps(params.get('ids', []), params.get('deadlines', []), params.get('profits', []))
    elif algo_type == 'huffman-coding':
        return generate_huffman_coding_steps(params.get('chars', []), params.get('frequencies', []))
    elif algo_type == 'coin-change-greedy':
        return generate_coin_change_greedy_steps(params.get('coins', []), params.get('amount', 0))
    elif algo_type == 'min-platforms':
        return generate_min_platforms_steps(params.get('arrivals', []), params.get('departures', []))
    elif algo_type == 'optimal-merge-pattern':
        return generate_optimal_merge_pattern_steps(params.get('files', []))

    # Dynamic Programming
    elif algo_type == 'fibonacci-dp':
        return generate_fibonacci_dp_steps(params.get('n', 0))
    elif algo_type == 'knapsack-0-1':
        return generate_knapsack_01_steps(params.get('weights', []), params.get('values', []), params.get('capacity', 0))
    elif algo_type == 'lcs':
        return generate_lcs_steps(params.get('s1', ""), params.get('s2', ""))
    elif algo_type == 'unbounded-knapsack':
        return generate_unbounded_knapsack_steps(params.get('weights', []), params.get('values', []), params.get('capacity', 0))
    elif algo_type == 'lis':
        return generate_lis_steps(params.get('array', []))
    elif algo_type == 'edit-distance':
        return generate_edit_distance_steps(params.get('s1', ""), params.get('s2', ""))
    elif algo_type == 'rod-cutting':
        return generate_rod_cutting_steps(params.get('prices', []), params.get('length', 0))
    elif algo_type == 'subset-sum':
        return generate_subset_sum_steps(params.get('array', []), params.get('target', 0))
    elif algo_type == 'partition-problem':
        return generate_partition_problem_steps(params.get('array', []))
    elif algo_type == 'matrix-chain-multiplication':
        return generate_matrix_chain_multiplication_steps(params.get('dimensions', []))

    # Graph
    elif algo_type == 'bfs':
        return generate_bfs_steps(params.get('graph', {}), params.get('startNode', 'A'))
    elif algo_type == 'dfs':
        return generate_dfs_steps(params.get('graph', {}), params.get('startNode', 'A'))
    elif algo_type == 'topological-sort':
        return generate_topological_sort_steps(params.get('graph', {}))
    elif algo_type == 'dijkstra':
        return generate_dijkstra_steps(params.get('edges', []), params.get('startNode', 0), params.get('numNodes', 0))
    elif algo_type == 'kruskal':
        return generate_kruskal_steps(params.get('edges', []), params.get('numNodes', 0))
    elif algo_type == 'prim':
        return generate_prim_steps(params.get('edges', []), params.get('numNodes', 0))
    elif algo_type == 'floyd-warshall':
        return generate_floyd_warshall_steps(params.get('matrix', []))
    elif algo_type == 'bellman-ford':
        return generate_bellman_ford_steps(params.get('edges', []), params.get('numNodes', 0), params.get('startNode', 0))

    # Advanced / Backtracking / String
    elif algo_type == 'n-queens':
        return generate_n_queens_steps(params.get('n', 4))
    elif algo_type == 'sudoku-solver':
        return generate_sudoku_solver_steps(params.get('board', []))
    elif algo_type == 'kmp':
        return generate_kmp_steps(params.get('text', ''), params.get('pattern', ''))
    elif algo_type == 'rabin-karp':
        return generate_rabin_karp_steps(params.get('text', ''), params.get('pattern', ''))
    elif algo_type == 'karatsuba':
        return generate_karatsuba_steps(params.get('x', 0), params.get('y', 0))
    elif algo_type == 'closest-pair':
        return generate_closest_pair_steps(params.get('points', []))
    elif algo_type == 'fft':
        return generate_fft_steps(params.get('coeffs', []))
    elif algo_type == 'convex-hull':
        return generate_convex_hull_steps(params.get('points', []))

    
    raise HTTPException(status_code=404, detail=f"Algorithm {algo_type} implementation not found in Python backend.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
