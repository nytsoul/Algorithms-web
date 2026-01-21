from typing import List, Tuple, Any
from ..models import AlgorithmStep
import math
import cmath

def generate_n_queens_steps(n: int) -> List[AlgorithmStep]:
    steps = []
    board = [[0] * n for _ in range(n)]
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting N-Queens for N={n}",
        data={"board": [row[:] for row in board]}
    ))
    
    def is_safe(row, col):
        # Check col
        for i in range(row):
            if board[i][col] == 1: return False
        
        # Check upper left diag
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 1: return False
            
        # Check upper right diag
        for i, j in zip(range(row, -1, -1), range(col, n)):
            if board[i][j] == 1: return False
            
        return True
        
    solutions = []
    
    def solve(row):
        if row >= n:
            solutions.append([r[:] for r in board])
            steps.append(AlgorithmStep(
                id=f"sol-{len(solutions)}",
                description="✅ Found a solution!",
                data={"board": [r[:] for r in board], "solution_found": True}
            ))
            return True # Find one solution for visualization simplicity? Or all? Let's stop at one for clean viz or find all. The TS version finds all.
            # return False to find all
            
        for col in range(n):
            steps.append(AlgorithmStep(
                id=f"try-{row}-{col}",
                description=f"Trying Queen at ({row}, {col})",
                data={"board": [r[:] for r in board], "highlight": [row, col]}
            ))
            
            if is_safe(row, col):
                board[row][col] = 1
                steps.append(AlgorithmStep(
                    id=f"place-{row}-{col}",
                    description=f"Placed Queen at ({row}, {col})",
                    data={"board": [r[:] for r in board]}
                ))
                
                if solve(row + 1):
                    return True # Return first solution logic
                    
                board[row][col] = 0
                steps.append(AlgorithmStep(
                    id=f"backtrack-{row}-{col}",
                    description=f"Backtracking from ({row}, {col})",
                    data={"board": [r[:] for r in board]}
                ))
                
        return False

    solve(0)
    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ N-Queens Complete. Found solution.",
        data={"finished": True}
    ))
    return steps

def generate_sudoku_solver_steps(grid: List[List[int]]) -> List[AlgorithmStep]:
    steps = []
    board = [row[:] for row in grid]
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Sudoku Solver",
        data={"board": [row[:] for row in board]}
    ))
    
    def valid(num, pos):
        # Check row
        for i in range(len(board[0])):
            if board[pos[0]][i] == num and pos[1] != i:
                return False
        
        # Check col
        for i in range(len(board)):
            if board[i][pos[1]] == num and pos[0] != i:
                return False
                
        # Check box
        box_x = pos[1] // 3
        box_y = pos[0] // 3
        
        for i in range(box_y*3, box_y*3 + 3):
            for j in range(box_x*3, box_x*3 + 3):
                if board[i][j] == num and (i,j) != pos:
                    return False
        return True

    def solve():
        for i in range(len(board)):
            for j in range(len(board[0])):
                if board[i][j] == 0:
                    for num in range(1, 10):
                        if valid(num, (i, j)):
                            board[i][j] = num
                            steps.append(AlgorithmStep(
                                id=f"try-{i}-{j}-{num}",
                                description=f"Placed {num} at ({i}, {j})",
                                data={"board": [r[:] for r in board], "pos": [i, j]}
                            ))
                            
                            if solve():
                                return True
                                
                            board[i][j] = 0
                            steps.append(AlgorithmStep(
                                id=f"backtrack-{i}-{j}",
                                description=f"Backtracking at ({i}, {j})",
                                data={"board": [r[:] for r in board], "pos": [i, j]}
                            ))
                    return False
        return True

    solve()
    
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Sudoku Solved",
        data={"board": [r[:] for r in board], "finished": True}
    ))
    return steps

def generate_kmp_steps(text: str, pattern: str) -> List[AlgorithmStep]:
    steps = []
    n = len(text)
    m = len(pattern)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting KMP Search. Text: '{text}', Pattern: '{pattern}'",
        data={"text": text, "pattern": pattern}
    ))
    
    # Compute LPS
    lps = [0] * m
    len_lps = 0
    i = 1
    while i < m:
        if pattern[i] == pattern[len_lps]:
            len_lps += 1
            lps[i] = len_lps
            i += 1
            steps.append(AlgorithmStep(
                id=f"lps-{i}",
                description=f"Computing LPS for pattern: matched len {len_lps}",
                data={"lps": list(lps)}
            ))
        else:
            if len_lps != 0:
                len_lps = lps[len_lps - 1]
            else:
                lps[i] = 0
                i += 1
                
    steps.append(AlgorithmStep(
        id="lps-done",
        description="LPS Table Computed",
        data={"lps": list(lps)}
    ))
    
    i = 0
    j = 0
    while i < n:
        if pattern[j] == text[i]:
            steps.append(AlgorithmStep(
                id=f"match-{i}-{j}",
                description=f"Match at text[{i}] and pattern[{j}]",
                data={"text_idx": i, "pattern_idx": j}
            ))
            i += 1
            j += 1
        
        if j == m:
            steps.append(AlgorithmStep(
                id=f"found-{i-j}",
                description=f"✅ Pattern found at index {i-j}",
                data={"found_index": i-j, "finished": True}
            ))
            j = lps[j-1]
        elif i < n and pattern[j] != text[i]:
            steps.append(AlgorithmStep(
                id=f"mismatch-{i}-{j}",
                description=f"Mismatch at text[{i}] vs pattern[{j}]",
                data={"text_idx": i, "pattern_idx": j}
            ))
            if j != 0:
                j = lps[j-1]
            else:
                i += 1
                
    steps.append(AlgorithmStep(
        id="complete",
        description="KMP Search Complete",
        data={"finished": True}
    ))
    return steps

def generate_rabin_karp_steps(text: str, pattern: str) -> List[AlgorithmStep]:
    steps = []
    d = 256
    q = 101
    n = len(text)
    m = len(pattern)
    h = pow(d, m-1) % q
    p = 0
    t = 0
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Rabin-Karp. Hash Prime: {q}",
        data={"text": text, "pattern": pattern}
    ))
    
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
        
    steps.append(AlgorithmStep(
        id="hash-init",
        description=f"Initial Hashes: Pattern={p}, Text_Window={t}",
        data={"p_hash": p, "t_hash": t}
    ))
    
    for i in range(n - m + 1):
        steps.append(AlgorithmStep(
            id=f"window-{i}",
            description=f"Checking window at {i}. Hash match: {p == t}",
            data={"index": i, "t_hash": t, "p_hash": p}
        ))
        
        if p == t:
            if text[i:i+m] == pattern:
                steps.append(AlgorithmStep(
                    id=f"found-{i}",
                    description=f"✅ Pattern found at index {i}",
                    data={"found_index": i, "finished": True}
                ))
                
        if i < n - m:
            t = (d*(t - ord(text[i])*h) + ord(text[i+m])) % q
            if t < 0: t = t + q
            steps.append(AlgorithmStep(
                id=f"hash-update-{i+1}",
                description=f"Rolling hash updated for next window: {t}",
                data={"new_hash": t}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description="Rabin-Karp Search Complete",
        data={"finished": True}
    ))
    return steps

def generate_karatsuba_steps(x: int, y: int) -> List[AlgorithmStep]:
    steps = []
    
    def karatsuba_recursive(num1, num2):
        if num1 < 10 or num2 < 10:
            return num1 * num2
            
        m = max(len(str(num1)), len(str(num2)))
        m2 = m // 2
        
        high1, low1 = divmod(num1, 10**m2)
        high2, low2 = divmod(num2, 10**m2)
        
        steps.append(AlgorithmStep(
            id=f"split-{num1}-{num2}",
            description=f"Split: {num1} -> ({high1}, {low1}), {num2} -> ({high2}, {low2})",
            data={"num1": num1, "num2": num2, "high1": high1, "low1": low1}
        ))
        
        z0 = karatsuba_recursive(low1, low2)
        z1 = karatsuba_recursive((low1 + high1), (low2 + high2))
        z2 = karatsuba_recursive(high1, high2)
        
        return (z2 * 10**(2*m2)) + ((z1 - z2 - z0) * 10**m2) + z0

    result = karatsuba_recursive(x, y)
    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Result: {result}",
        data={"result": result, "finished": True}
    ))
    return steps

# Other advanced algorithms (simplified implementation or placeholders due to complexity/params)
def generate_closest_pair_steps(points: List[List[int]]) -> List[AlgorithmStep]:
    # Simplified brute force for visualization or placeholder
    steps = []
    steps.append(AlgorithmStep(id="init", description="Closest Pair Logic (Python Stub)", data={"points": points}))
    
    min_dist = float('inf')
    p1 = None
    p2 = None
    
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            dist = math.sqrt((points[i][0]-points[j][0])**2 + (points[i][1]-points[j][1])**2)
            steps.append(AlgorithmStep(
                id=f"check-{i}-{j}", 
                description=f"Dist({i}, {j}) = {dist:.2f}", 
                data={"p1": points[i], "p2": points[j], "dist": dist}
            ))
            if dist < min_dist:
                min_dist = dist
                p1 = points[i]
                p2 = points[j]
                
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Min Dist: {min_dist:.2f}",
        data={"min_dist": min_dist, "pair": [p1, p2], "finished": True}
    ))
    return steps

def generate_fft_steps(coeffs: List[int]) -> List[AlgorithmStep]:
    # Placeholder for FFT steps
    steps = [AlgorithmStep(id="init", description="FFT steps (Python Stub)", data={"coeffs": coeffs})]
    # In a real implementation this would show recursive DFT calls
    steps.append(AlgorithmStep(id="complete", description="FFT Complete", data={"finished": True}))
    return steps

def generate_convex_hull_steps(points: List[List[int]]) -> List[AlgorithmStep]:
    # Placeholder for Convex Hull (e.g., Jarvis March)
    steps = [AlgorithmStep(id="init", description="Convex Hull (Python Stub)", data={"points": points})]
    # Real impl...
    steps.append(AlgorithmStep(id="complete", description="Convex Hull Complete", data={"finished": True}))
    return steps
