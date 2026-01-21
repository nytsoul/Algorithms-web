from typing import List, Dict, Any
from ..models import AlgorithmStep

def generate_fibonacci_dp_steps(n: int) -> List[AlgorithmStep]:
    steps = []
    dp = [0] * (n + 1)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized DP table for Fibonacci({n})",
        data={"dp": list(dp)}
    ))
    
    if n >= 0:
        dp[0] = 0
        steps.append(AlgorithmStep(
            id="base-0",
            description="Base case: F(0) = 0",
            highlightedIndices=[0],
            data={"dp": list(dp)}
        ))
    if n >= 1:
        dp[1] = 1
        steps.append(AlgorithmStep(
            id="base-1",
            description="Base case: F(1) = 1",
            highlightedIndices=[1],
            data={"dp": list(dp)}
        ))
        
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        steps.append(AlgorithmStep(
            id=f"calc-{i}",
            description=f"F({i}) = F({i-1}) + F({i-2}) = {dp[i-1]} + {dp[i-2]} = {dp[i]}",
            highlightedIndices=[i],
            comparedIndices=[i-1, i-2],
            data={"dp": list(dp)}
        ))
        
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Fibonacci({n}) = {dp[n]}",
        data={"result": dp[n], "finished": True}
    ))
    return steps

def generate_knapsack_01_steps(weights: List[int], values: List[int], capacity: int) -> List[AlgorithmStep]:
    steps = []
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized DP table for 0/1 Knapsack (Items: {n}, Capacity: {capacity})",
        data={"dp": dp} # 2D array might need formatting for frontend
    ))
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            wt = weights[i-1]
            val = values[i-1]
            
            steps.append(AlgorithmStep(
                id=f"check-{i}-{w}",
                description=f"Item {i} (Wt:{wt}, Val:{val}) at Capacity {w}",
                data={"i": i, "w": w}
            ))
            
            if wt <= w:
                include_val = val + dp[i-1][w-wt]
                exclude_val = dp[i-1][w]
                dp[i][w] = max(include_val, exclude_val)
                
                steps.append(AlgorithmStep(
                    id=f"update-{i}-{w}",
                    description=f"Max(Include: {include_val}, Exclude: {exclude_val}) = {dp[i][w]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, w]}
                ))
            else:
                dp[i][w] = dp[i-1][w]
                steps.append(AlgorithmStep(
                    id=f"skip-{i}-{w}",
                    description=f"Cannot include (Wt {wt} > Cap {w}). Value: {dp[i][w]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, w]}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Max Value: {dp[n][capacity]}",
        data={"max_value": dp[n][capacity], "finished": True}
    ))
    return steps

def generate_lcs_steps(s1: str, s2: str) -> List[AlgorithmStep]:
    steps = []
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized LCS DP Table for '{s1}' vs '{s2}'",
        data={"dp": dp}
    ))
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            steps.append(AlgorithmStep(
                id=f"compare-{i}-{j}",
                description=f"Comparing '{s1[i-1]}' and '{s2[j-1]}'",
                data={"i": i, "j": j}
            ))
            
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                steps.append(AlgorithmStep(
                    id=f"match-{i}-{j}",
                    description=f"Match! 1 + LCS({i-1}, {j-1}) = {dp[i][j]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, j]}
                ))
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                steps.append(AlgorithmStep(
                    id=f"mismatch-{i}-{j}",
                    description=f"Mismatch. Max(Up: {dp[i-1][j]}, Left: {dp[i][j-1]}) = {dp[i][j]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, j]}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ LCS Length: {dp[m][n]}",
        data={"lcs_length": dp[m][n], "finished": True}
    ))
    return steps

def generate_unbounded_knapsack_steps(weights: List[int], values: List[int], capacity: int) -> List[AlgorithmStep]:
    steps = []
    n = len(values)
    dp = [0] * (capacity + 1)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized DP table for Unbounded Knapsack",
        data={"dp": list(dp)}
    ))
    
    for i in range(capacity + 1):
        for j in range(n):
            if weights[j] <= i:
                steps.append(AlgorithmStep(
                    id=f"check-{i}-{j}",
                    description=f"Checking item {j} at capacity {i}",
                    data={"dp": list(dp), "current_cap": i}
                ))
                if dp[i - weights[j]] + values[j] > dp[i]:
                    dp[i] = dp[i - weights[j]] + values[j]
                    steps.append(AlgorithmStep(
                        id=f"update-{i}",
                        description=f"Updated max value at capacity {i} to {dp[i]}",
                        highlightedIndices=[i],
                        data={"dp": list(dp)}
                    ))
                    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Max Value (Unbounded): {dp[capacity]}",
        data={"max_value": dp[capacity], "finished": True}
    ))
    return steps

def generate_lis_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    n = len(arr)
    if n == 0: return steps
    
    lis = [1] * n
    
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized LIS array with 1s",
        data={"array": list(arr), "lis": list(lis)}
    ))
    
    for i in range(1, n):
        for j in range(0, i):
            steps.append(AlgorithmStep(
                id=f"compare-{i}-{j}",
                description=f"Comparing arr[{i}]={arr[i]} with arr[{j}]={arr[j]}",
                comparedIndices=[i, j],
                data={"array": list(arr), "lis": list(lis)}
            ))
            
            if arr[i] > arr[j] and lis[i] < lis[j] + 1:
                lis[i] = lis[j] + 1
                steps.append(AlgorithmStep(
                    id=f"update-{i}",
                    description=f"LIS at {i} updated: {lis[i]}",
                    highlightedIndices=[i],
                    data={"array": list(arr), "lis": list(lis)}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Longest Increasing Subsequence Length: {max(lis)}",
        data={"max_lis": max(lis), "finished": True}
    ))
    return steps

def generate_edit_distance_steps(s1: str, s2: str) -> List[AlgorithmStep]:
    steps = []
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0: dp[i][j] = j
            elif j == 0: dp[i][j] = i
            
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized Edit Distance Matrix for '{s1}' -> '{s2}'",
        data={"dp": [row[:] for row in dp]}
    ))
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
                steps.append(AlgorithmStep(
                    id=f"match-{i}-{j}",
                    description=f"Match '{s1[i-1]}': No op needed. Cost={dp[i][j]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, j]}
                ))
            else:
                dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])
                steps.append(AlgorithmStep(
                    id=f"op-{i}-{j}",
                    description=f"Mismatch. Min(Insert, Remove, Replace) + 1 = {dp[i][j]}",
                    data={"dp": [row[:] for row in dp], "highlight": [i, j]}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Edit Distance: {dp[m][n]}",
        data={"distance": dp[m][n], "finished": True}
    ))
    return steps

def generate_rod_cutting_steps(prices: List[int], length: int) -> List[AlgorithmStep]:
    steps = []
    val = [0] * (length + 1)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized value array for Rod Length {length}",
        data={"max_values": list(val)}
    ))
    
    for i in range(1, length + 1):
        max_val = -float('inf')
        steps.append(AlgorithmStep(
            id=f"calc-start-{i}",
            description=f"Calculating max value for length {i}",
            highlightedIndices=[i],
            data={"max_values": list(val)}
        ))
        
        # Note: prices array is usually 0-indexed where index 0 is length 1 or similar. 
        # Assuming prices[i] is price for rod of length i+1.
        for j in range(i):
            if j < len(prices):
                current_val = prices[j] + val[i - j - 1]
                steps.append(AlgorithmStep(
                    id=f"cut-{i}-{j+1}",
                    description=f"Try cut length {j+1} (Price: {prices[j]}) + MaxVal({i-(j+1)}): {current_val}",
                    data={"max_values": list(val)}
                ))
                if current_val > max_val:
                    max_val = current_val
                    
        val[i] = max_val if max_val != -float('inf') else 0
        steps.append(AlgorithmStep(
            id=f"update-{i}",
            description=f"Max value for length {i} is {val[i]}",
            highlightedIndices=[i],
            data={"max_values": list(val)}
        ))
        
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Max Revenue: {val[length]}",
        data={"max_revenue": val[length], "finished": True}
    ))
    return steps

def generate_subset_sum_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    n = len(arr)
    dp = [[False for _ in range(target + 1)] for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = True
        
    steps.append(AlgorithmStep(
        id="init",
        description=f"Initialized subset sum table for Target {target}",
        data={"dp_preview": "Grid initialized"} # Full boolean grid might be heavy
    ))
    
    for i in range(1, n + 1):
        for j in range(1, target + 1):
            dp[i][j] = dp[i-1][j]
            if arr[i-1] <= j:
                dp[i][j] = dp[i][j] or dp[i-1][j - arr[i-1]]
                
            steps.append(AlgorithmStep(
                id=f"cell-{i}-{j}",
                description=f"Using items 0..{i-1} can sum to {j}? {dp[i][j]}",
                data={"i": i, "j": j, "val": dp[i][j]}
            ))
            
    result = dp[n][target]
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Subset Sum Exists: {result}",
        data={"exists": result, "finished": True}
    ))
    return steps

def generate_partition_problem_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    total_sum = sum(arr)
    steps.append(AlgorithmStep(
        id="init",
        description=f"Checking if array can be partitioned. Total Sum: {total_sum}",
        data={"array": list(arr), "sum": total_sum}
    ))
    
    if total_sum % 2 != 0:
        steps.append(AlgorithmStep(
            id="fail-odd",
            description="Total sum is odd, cannot partition into equal halves.",
            data={"finished": True, "possible": False}
        ))
        return steps
        
    target = total_sum // 2
    # Reuse subset sum logic effectively
    subset_steps = generate_subset_sum_steps(arr, target)
    
    # Map subset steps to partition context or just append
    # For simplicity, we create new steps indicating progress towards target = sum/2
    can_partition = subset_steps[-1].data.get("exists", False)
    
    steps.append(AlgorithmStep(
        id="check-subset",
        description=f"Checking if subset with sum {target} exists...",
        data={"target": target}
    ))
    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Partition Possible: {can_partition}",
        data={"possible": can_partition, "finished": True}
    ))
    return steps

def generate_matrix_chain_multiplication_steps(dims: List[int]) -> List[AlgorithmStep]:
    steps = []
    n = len(dims) - 1
    m = [[0 for _ in range(n)] for _ in range(n)]
    
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized cost matrix",
        data={"m": [row[:] for row in m]}
    ))
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            m[i][j] = float('inf')
            
            steps.append(AlgorithmStep(
                id=f"calc-range-{i}-{j}",
                description=f"Calculating minimum cost for chain {i} to {j}",
                data={"m": [row[:] for row in m]}
            ))
            
            for k in range(i, j):
                q = m[i][k] + m[k+1][j] + dims[i] * dims[k+1] * dims[j+1]
                if q < m[i][j]:
                    m[i][j] = q
                    
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Min Matrix Multiplication Cost: {m[0][n-1]}",
        data={"min_cost": m[0][n-1], "finished": True}
    ))
    return steps
