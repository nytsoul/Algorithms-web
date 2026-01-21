from typing import List, Dict
import math
from ..models import AlgorithmStep

def generate_binary_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    # Binary search requires sorted array, but we visualize what we are given or sort it.
    # Usually the frontend passes a sorted array for binary search.
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Binary Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))
    
    left, right = 0, len(current_arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        steps.append(AlgorithmStep(
            id=f"check-{mid}",
            description=f"Checking mid index {mid}",
            comparedIndices=[mid],
            data={"array": list(current_arr), "left": left, "right": right, "mid": mid}
        ))
        
        if current_arr[mid] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {mid} (Python)",
                highlightedIndices=[mid],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
        
        if current_arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_exponential_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Exponential Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))

    if current_arr[0] == target:
        steps.append(AlgorithmStep(
            id="found-0",
            description=f"✅ Found {target} at index 0 (Python)",
            highlightedIndices=[0],
            data={"array": list(current_arr), "finished": True, "found": True}
        ))
        return steps

    i = 1
    steps.append(AlgorithmStep(
        id=f"check-{i}",
        description=f"Checking index {i}",
        comparedIndices=[i],
        data={"array": list(current_arr), "index": i}
    ))

    while i < n and current_arr[i] <= target:
        i = i * 2
        if i < n:
            steps.append(AlgorithmStep(
                id=f"check-{i}",
                description=f"Checking index {i} (Exponential Jump)",
                comparedIndices=[i],
                data={"array": list(current_arr), "index": i}
            ))

    # Binary search in expected range
    left = i // 2
    right = min(i, n - 1)
    
    steps.append(AlgorithmStep(
        id="bs-range",
        description=f"Binary Search in range [{left}, {right}]",
        data={"array": list(current_arr), "left": left, "right": right}
    ))

    # Perform binary search in range
    while left <= right:
        mid = (left + right) // 2
        steps.append(AlgorithmStep(
            id=f"bs-check-{mid}",
            description=f"Checking mid index {mid}",
            comparedIndices=[mid],
            data={"array": list(current_arr), "left": left, "right": right, "mid": mid}
        ))

        if current_arr[mid] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {mid} (Python)",
                highlightedIndices=[mid],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
        
        if current_arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_linear_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Linear Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))
    
    for i in range(n):
        steps.append(AlgorithmStep(
            id=f"check-{i}",
            description=f"Checking index {i}",
            comparedIndices=[i],
            data={"array": list(current_arr), "index": i}
        ))
        
        if current_arr[i] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {i} (Python)",
                highlightedIndices=[i],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
            
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_jump_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    if n == 0: return steps
    
    step = int(math.sqrt(n))
    prev = 0
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Jump Search for {target} (Step size: {step})",
        data={"array": list(current_arr), "target": target}
    ))
    
    while current_arr[min(step, n) - 1] < target:
        steps.append(AlgorithmStep(
            id=f"jump-{step}",
            description=f"Jumping to index {min(step, n)-1}",
            comparedIndices=[min(step, n)-1],
            data={"array": list(current_arr)}
        ))
        
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            steps.append(AlgorithmStep(
                id="not-found",
                description=f"❌ {target} not found (Python)",
                data={"array": list(current_arr), "finished": True, "found": False}
            ))
            return steps
            
    steps.append(AlgorithmStep(
        id="linear-start",
        description=f"Found block between {prev} and {min(step, n)}",
        data={"array": list(current_arr)}
    ))
            
    while current_arr[prev] < target:
        steps.append(AlgorithmStep(
            id=f"check-{prev}",
            description=f"Checking index {prev}",
            comparedIndices=[prev],
            data={"array": list(current_arr)}
        ))
        
        prev += 1
        if prev == min(step, n):
            steps.append(AlgorithmStep(
                id="not-found",
                description=f"❌ {target} not found (Python)",
                data={"array": list(current_arr), "finished": True, "found": False}
            ))
            return steps
            
    steps.append(AlgorithmStep(
        id=f"final-check-{prev}",
        description=f"Final check at index {prev}",
        comparedIndices=[prev],
        data={"array": list(current_arr)}
    ))

    if current_arr[prev] == target:
        steps.append(AlgorithmStep(
            id="found",
            description=f"✅ Found {target} at index {prev} (Python)",
            highlightedIndices=[prev],
            data={"array": list(current_arr), "finished": True, "found": True}
        ))
    else:
        steps.append(AlgorithmStep(
            id="not-found",
            description=f"❌ {target} not found (Python)",
            data={"array": list(current_arr), "finished": True, "found": False}
        ))
    return steps

def generate_interpolation_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    lo = 0
    hi = n - 1
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Interpolation Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))
    
    while lo <= hi and target >= current_arr[lo] and target <= current_arr[hi]:
        if lo == hi:
            if current_arr[lo] == target:
                steps.append(AlgorithmStep(
                    id="found",
                    description=f"✅ Found {target} at index {lo}",
                    highlightedIndices=[lo],
                    data={"array": list(current_arr), "finished": True, "found": True}
                ))
                return steps
            steps.append(AlgorithmStep(
                id="not-found",
                description=f"❌ {target} not found",
                data={"array": list(current_arr), "finished": True, "found": False}
            ))
            return steps
            
        pos = lo + int(((float(hi - lo) / (current_arr[hi] - current_arr[lo])) * (target - current_arr[lo])))
        
        steps.append(AlgorithmStep(
            id=f"probe-{pos}",
            description=f"Probing predicted position {pos}",
            comparedIndices=[pos],
            data={"array": list(current_arr), "pos": pos}
        ))
        
        if current_arr[pos] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {pos}",
                highlightedIndices=[pos],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
            
        if current_arr[pos] < target:
            lo = pos + 1
        else:
            hi = pos - 1
            
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_ternary_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Ternary Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))
    
    if not current_arr:
        return steps

    l, r = 0, len(current_arr) - 1
    
    while l <= r:
        mid1 = l + (r - l) // 3
        mid2 = r - (r - l) // 3
        
        steps.append(AlgorithmStep(
            id=f"check-{mid1}-{mid2}",
            description=f"Checking mid1: {mid1}, mid2: {mid2}",
            comparedIndices=[mid1, mid2],
            data={"array": list(current_arr), "left": l, "right": r}
        ))
        
        if current_arr[mid1] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {mid1}",
                highlightedIndices=[mid1],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
        if current_arr[mid2] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {mid2}",
                highlightedIndices=[mid2],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
            
        if target < current_arr[mid1]:
            r = mid1 - 1
        elif target > current_arr[mid2]:
            l = mid2 + 1
        else:
            l = mid1 + 1
            r = mid2 - 1
            
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_fibonacci_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Fibonacci Search for {target} (Python)",
        data={"array": list(current_arr), "target": target}
    ))
    
    fibMMm2 = 0
    fibMMm1 = 1
    fibM = fibMMm2 + fibMMm1
    
    while fibM < n:
        fibMMm2 = fibMMm1
        fibMMm1 = fibM
        fibM = fibMMm2 + fibMMm1
        
    offset = -1
    
    while fibM > 1:
        i = min(offset + fibMMm2, n - 1)
        
        steps.append(AlgorithmStep(
            id=f"check-{i}",
            description=f"Checking index {i}",
            comparedIndices=[i],
            data={"array": list(current_arr)}
        ))
        
        if current_arr[i] < target:
            fibM = fibMMm1
            fibMMm1 = fibMMm2
            fibMMm2 = fibM - fibMMm1
            offset = i
        elif current_arr[i] > target:
            fibM = fibMMm2
            fibMMm1 = fibMMm1 - fibMMm2
            fibMMm2 = fibM - fibMMm1
        else:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {i}",
                highlightedIndices=[i],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
            
    if fibMMm1 and offset + 1 < n and current_arr[offset + 1] == target:
        steps.append(AlgorithmStep(
            id="found",
            description=f"✅ Found {target} at index {offset + 1}",
            highlightedIndices=[offset + 1],
            data={"array": list(current_arr), "finished": True, "found": True}
        ))
        return steps
        
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found (Python)",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps

def generate_hash_search_steps(arr: List[int], target: int) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    size = len(current_arr)
    if size == 0: return steps
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Hash Search for {target}",
        data={"array": list(current_arr), "target": target}
    ))
    
    predicted_idx = target % size
    
    steps.append(AlgorithmStep(
        id=f"hash-calc",
        description=f"Hash({target}) = {target} % {size} = {predicted_idx}",
        data={"array": list(current_arr)}
    ))
    
    steps.append(AlgorithmStep(
        id=f"probe-{predicted_idx}",
        description=f"Checking predicted index {predicted_idx}",
        comparedIndices=[predicted_idx],
        data={"array": list(current_arr)}
    ))
    
    if current_arr[predicted_idx] == target:
        steps.append(AlgorithmStep(
            id="found",
            description=f"✅ Found {target} at index {predicted_idx} (Direct Hit)",
            highlightedIndices=[predicted_idx],
            data={"array": list(current_arr), "finished": True, "found": True}
        ))
        return steps
        
    steps.append(AlgorithmStep(
        id="collision",
        description=f"Value at {predicted_idx} is {current_arr[predicted_idx]} (Collision/Miss)",
        data={"array": list(current_arr)}
    ))
    
    for i in range(len(current_arr)):
        if i == predicted_idx: continue
        steps.append(AlgorithmStep(
            id=f"scan-{i}",
            description=f"Scanning index {i}...",
            comparedIndices=[i],
            data={"array": list(current_arr)}
        ))
        if current_arr[i] == target:
            steps.append(AlgorithmStep(
                id="found",
                description=f"✅ Found {target} at index {i}",
                highlightedIndices=[i],
                data={"array": list(current_arr), "finished": True, "found": True}
            ))
            return steps
            
    steps.append(AlgorithmStep(
        id="not-found",
        description=f"❌ {target} not found",
        data={"array": list(current_arr), "finished": True, "found": False}
    ))
    return steps
