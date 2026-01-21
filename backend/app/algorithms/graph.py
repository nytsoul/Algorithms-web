from typing import List, Dict, Any, Tuple
import heapq
from ..models import AlgorithmStep

def generate_bfs_steps(graph: Dict[str, List[str]], start_node: str) -> List[AlgorithmStep]:
    steps = []
    queue = [start_node]
    visited = {start_node}
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting BFS from node {start_node}",
        data={"queue": list(queue), "visited": list(visited)}
    ))
    
    while queue:
        node = queue.pop(0)
        steps.append(AlgorithmStep(
            id=f"visit-{node}",
            description=f"Visiting node {node}",
            highlightedIndices=[], # Graph viz needs specific node mapping
            data={"current_node": node, "queue": list(queue)}
        ))
        
        if node in graph:
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    steps.append(AlgorithmStep(
                        id=f"explore-{node}-{neighbor}",
                        description=f"Found unvisited neighbor {neighbor}",
                        data={"neighbor": neighbor, "queue": list(queue)}
                    ))
                    
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ BFS Traversal Complete",
        data={"visited": list(visited), "finished": True}
    ))
    return steps

def generate_dfs_steps(graph: Dict[str, List[str]], start_node: str) -> List[AlgorithmStep]:
    steps = []
    visited = set()
    stack = [start_node]
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting DFS from node {start_node}",
        data={"stack": list(stack), "visited": list(visited)}
    ))
    
    while stack:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            steps.append(AlgorithmStep(
                id=f"visit-{node}",
                description=f"Visiting node {node}",
                data={"current_node": node, "visited": list(visited)}
            ))
            
            # Add neighbors to stack in reverse order to visit them in order
            if node in graph:
                neighbors = graph[node]
                for neighbor in reversed(neighbors):
                    if neighbor not in visited:
                        stack.append(neighbor)
                        steps.append(AlgorithmStep(
                            id=f"push-{neighbor}",
                            description=f"Pushing neighbor {neighbor} to stack",
                            data={"stack": list(stack)}
                        ))
                        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ DFS Traversal Complete",
        data={"visited": list(visited), "finished": True}
    ))
    return steps

def generate_topological_sort_steps(graph: Dict[str, List[str]]) -> List[AlgorithmStep]:
    steps = []
    # Calculate in-degrees
    in_degree = {node: 0 for node in graph}
    for u in graph:
        for v in graph[u]:
            in_degree[v] = in_degree.get(v, 0) + 1
            
    queue = [node for node in in_degree if in_degree[node] == 0]
    topo_order = []
    
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized In-Degrees and Queue",
        data={"in_degree": in_degree, "queue": list(queue)}
    ))
    
    while queue:
        u = queue.pop(0)
        topo_order.append(u)
        
        steps.append(AlgorithmStep(
            id=f"process-{u}",
            description=f"Processing node {u} (In-degree 0)",
            data={"node": u, "topo_order": list(topo_order)}
        ))
        
        if u in graph:
            for v in graph[u]:
                in_degree[v] -= 1
                steps.append(AlgorithmStep(
                    id=f"decrement-{v}",
                    description=f"Decremented in-degree of {v} to {in_degree[v]}",
                    data={"node": v, "in_degree": in_degree}
                ))
                
                if in_degree[v] == 0:
                    queue.append(v)
                    steps.append(AlgorithmStep(
                        id=f"enqueue-{v}",
                        description=f"Node {v} has in-degree 0, added to queue",
                        data={"queue": list(queue)}
                    ))
                    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Topological Sort: {topo_order}",
        data={"result": topo_order, "finished": True}
    ))
    return steps

def generate_dijkstra_steps(graph_edges: List[Dict[str, Any]], start_node: int, num_nodes: int) -> List[AlgorithmStep]:
    steps = []
    # Convert edge list to adjacency list: u -> [(v, w)]
    adj = {i: [] for i in range(num_nodes)}
    for edge in graph_edges:
        adj[edge['u']].append((edge['v'], edge['w']))
        adj[edge['v']].append((edge['u'], edge['w'])) # Assuming undirected for simplicity unless specified
        
    distances = {i: float('inf') for i in range(num_nodes)}
    distances[start_node] = 0
    pq = [(0, start_node)]
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Dijkstra from node {start_node}",
        data={"distances": distances}
    ))
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > distances[u]:
            continue
            
        steps.append(AlgorithmStep(
            id=f"visit-{u}",
            description=f"Visiting node {u} with distance {d}",
            data={"node": u, "distance": d}
        ))
        
        for v, weight in adj[u]:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
                heapq.heappush(pq, (distances[v], v))
                steps.append(AlgorithmStep(
                    id=f"relax-{u}-{v}",
                    description=f"Relaxing edge {u}-{v}: New dist {distances[v]}",
                    data={"distances": distances, "v": v}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Dijkstra Complete",
        data={"distances": distances, "finished": True}
    ))
    return steps

def generate_kruskal_steps(edges: List[Dict[str, Any]], num_nodes: int) -> List[AlgorithmStep]:
    steps = []
    sorted_edges = sorted(edges, key=lambda x: x['w'])
    
    parent = list(range(num_nodes))
    def find(i):
        if parent[i] == i: return i
        return find(parent[i])
    def union(i, j):
        root_i = find(i)
        root_j = find(j)
        if root_i != root_j:
            parent[root_i] = root_j
            return True
        return False
        
    mst_weight = 0
    mst_edges = []
    
    steps.append(AlgorithmStep(
        id="init",
        description="Sorted edges by weight",
        data={"edges": sorted_edges}
    ))
    
    for edge in sorted_edges:
        u, v, w = edge['u'], edge['v'], edge['w']
        
        steps.append(AlgorithmStep(
            id=f"check-{u}-{v}",
            description=f"Checking edge {u}-{v} (Weight: {w})",
            data={"edge": edge}
        ))
        
        if union(u, v):
            mst_weight += w
            mst_edges.append(edge)
            steps.append(AlgorithmStep(
                id=f"add-{u}-{v}",
                description=f"Added edge {u}-{v} to MST",
                data={"mst_edges": mst_edges, "mst_weight": mst_weight}
            ))
        else:
            steps.append(AlgorithmStep(
                id=f"cycle-{u}-{v}",
                description=f"Skipping edge {u}-{v} (Cycle detected)",
                data={}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ MST Weight: {mst_weight}",
        data={"mst_weight": mst_weight, "finished": True}
    ))
    return steps

def generate_prim_steps(graph_edges: List[Dict[str, Any]], num_nodes: int) -> List[AlgorithmStep]:
    steps = []
    adj = {i: [] for i in range(num_nodes)}
    for edge in graph_edges:
        adj[edge['u']].append((edge['v'], edge['w']))
        adj[edge['v']].append((edge['u'], edge['w']))
        
    key = [float('inf')] * num_nodes
    parent = [-1] * num_nodes
    key[0] = 0
    mst_set = [False] * num_nodes
    pq = [(0, 0)]
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Prim's Algorithm from node 0",
        data={"keys": key}
    ))
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if mst_set[u]: continue
        mst_set[u] = True
        
        steps.append(AlgorithmStep(
            id=f"include-{u}",
            description=f"Included node {u} in MST",
            data={"node": u, "mst_set": mst_set}
        ))
        
        for v, w in adj[u]:
            if not mst_set[v] and w < key[v]:
                key[v] = w
                parent[v] = u
                heapq.heappush(pq, (key[v], v))
                steps.append(AlgorithmStep(
                    id=f"update-{v}",
                    description=f"Updated key used for {v} to {w} (Parent: {u})",
                    data={"keys": key, "parents": parent}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Prim's MST Complete",
        data={"mst_weight": sum([k for k in key if k != float('inf')]), "finished": True}
    ))
    return steps

def generate_floyd_warshall_steps(graph_matrix: List[List[int]]) -> List[AlgorithmStep]:
    steps = []
    n = len(graph_matrix)
    dist = [row[:] for row in graph_matrix]
    
    # Handle 'inf' representation if graph_matrix uses a large number or 9999
    # Python infinite is float('inf')
    for i in range(n):
        for j in range(n):
            if dist[i][j] == -1: # Assuming -1 or specific value for infinity in input
                dist[i][j] = float('inf')
                
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized Distance Matrix",
        data={"matrix": [[str(x) if x == float('inf') else x for x in row] for row in dist]}
    ))
    
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] != float('inf') and dist[k][j] != float('inf') and dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    steps.append(AlgorithmStep(
                        id=f"update-{k}-{i}-{j}",
                        description=f"Updated dist[{i}][{j}] using node {k}: {dist[i][j]}",
                        data={"matrix": [[str(x) if x == float('inf') else x for x in row] for row in dist], "highlight": [i, j, k]}
                    ))
                    
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ All-Pairs Shortest Paths Computed",
        data={"matrix": [[str(x) if x == float('inf') else x for x in row] for row in dist], "finished": True}
    ))
    return steps

def generate_bellman_ford_steps(edges: List[Dict[str, Any]], num_nodes: int, start_node: int) -> List[AlgorithmStep]:
    steps = []
    dist = [float('inf')] * num_nodes
    dist[start_node] = 0
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Bellman-Ford from node {start_node}",
        data={"distances": [str(d) for d in dist]}
    ))
    
    for i in range(num_nodes - 1):
        changed = False
        steps.append(AlgorithmStep(
            id=f"iter-{i}",
            description=f"Iteration {i+1}",
            data={}
        ))
        
        for edge in edges:
            u, v, w = edge['u'], edge['v'], edge['w']
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
                steps.append(AlgorithmStep(
                    id=f"relax-{u}-{v}-{i}",
                    description=f"Relaxed edge {u}-{v}: {dist[v]}",
                    data={"distances": [str(d) for d in dist], "highlight_edge": edge}
                ))
                
        if not changed:
            break
            
    # Check negative cycle
    for edge in edges:
        u, v, w = edge['u'], edge['v'], edge['w']
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
             steps.append(AlgorithmStep(
                id="cycle-detected",
                description="❌ Negative Weight Cycle Detected!",
                data={"cycle": True, "finished": True}
            ))
             return steps
             
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Shortest Paths Computed",
        data={"distances": [str(d) for d in dist], "finished": True}
    ))
    return steps
