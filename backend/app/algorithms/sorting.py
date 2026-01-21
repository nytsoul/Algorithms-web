from typing import List, Dict
import math
from ..models import AlgorithmStep

def generate_bubble_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    n = len(arr)
    current_arr = list(arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Bubble Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    for i in range(n):
        for j in range(0, n - i - 1):
            steps.append(AlgorithmStep(
                id=f"compare-{i}-{j}",
                description=f"Comparing {current_arr[j]} and {current_arr[j+1]}",
                comparedIndices=[j, j+1],
                data={"array": list(current_arr)}
            ))
            
            if current_arr[j] > current_arr[j+1]:
                current_arr[j], current_arr[j+1] = current_arr[j+1], current_arr[j]
                steps.append(AlgorithmStep(
                    id=f"swap-{i}-{j}",
                    description=f"Swapped {current_arr[j+1]} and {current_arr[j]}",
                    highlightedIndices=[j, j+1],
                    data={"array": list(current_arr)}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Bubble Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_quick_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Quick Sort (Python)",
        data={"array": list(current_arr)}
    ))

    def partition(low, high):
        pivot = current_arr[high]
        i = low - 1
        
        steps.append(AlgorithmStep(
            id=f"pivot-select-{high}",
            description=f"Selected pivot: {pivot}",
            highlightedIndices=[high],
            data={"array": list(current_arr)}
        ))

        for j in range(low, high):
            steps.append(AlgorithmStep(
                id=f"compare-{j}",
                description=f"Comparing {current_arr[j]} with pivot {pivot}",
                comparedIndices=[j, high],
                data={"array": list(current_arr)}
            ))
            
            if current_arr[j] < pivot:
                i += 1
                current_arr[i], current_arr[j] = current_arr[j], current_arr[i]
                steps.append(AlgorithmStep(
                    id=f"swap-{i}-{j}",
                    description=f"Swapped smaller element {current_arr[i]} to left",
                    highlightedIndices=[i, j],
                    data={"array": list(current_arr)}
                ))

        current_arr[i + 1], current_arr[high] = current_arr[high], current_arr[i + 1]
        steps.append(AlgorithmStep(
            id=f"pivot-place-{i+1}",
            description=f"Placed pivot {pivot} at correct position {i+1}",
            highlightedIndices=[i+1],
            data={"array": list(current_arr)}
        ))
        return i + 1

    def quick_sort_recursive(low, high):
        if low < high:
            pi = partition(low, high)
            quick_sort_recursive(low, pi - 1)
            quick_sort_recursive(pi + 1, high)

    quick_sort_recursive(0, len(current_arr) - 1)

    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Quick Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_merge_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Merge Sort (Python)",
        data={"array": list(current_arr)}
    ))

    def merge(l, m, r):
        n1 = m - l + 1
        n2 = r - m
        L = [0] * n1
        R = [0] * n2
        for i in range(n1): L[i] = current_arr[l + i]
        for j in range(n2): R[j] = current_arr[m + 1 + j]

        i = 0
        j = 0
        k = l
        
        while i < n1 and j < n2:
            steps.append(AlgorithmStep(
                id=f"compare-{l+i}-{m+1+j}",
                description=f"Comparing L:{L[i]} and R:{R[j]}",
                comparedIndices=[l+i, m+1+j],
                data={"array": list(current_arr)}
            ))
            
            if L[i] <= R[j]:
                current_arr[k] = L[i]
                i += 1
            else:
                current_arr[k] = R[j]
                j += 1
            
            steps.append(AlgorithmStep(
                id=f"merge-place-{k}",
                description=f"Placed {current_arr[k]} into merged array",
                highlightedIndices=[k],
                data={"array": list(current_arr)}
            ))
            k += 1

        while i < n1:
            current_arr[k] = L[i]
            i += 1
            k += 1
            
        while j < n2:
            current_arr[k] = R[j]
            j += 1
            k += 1
            
        steps.append(AlgorithmStep(
            id=f"merged-segment-{l}-{r}",
            description=f"Merged segment {l} to {r}",
            highlightedIndices=list(range(l, r+1)),
            data={"array": list(current_arr)}
        ))

    def merge_sort_recursive(l, r):
        if l < r:
            m = l + (r - l) // 2
            merge_sort_recursive(l, m)
            merge_sort_recursive(m + 1, r)
            merge(l, m, r)

    merge_sort_recursive(0, len(current_arr) - 1)

    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Merge Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_selection_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Selection Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    for i in range(n):
        min_idx = i
        steps.append(AlgorithmStep(
            id=f"min-init-{i}",
            description=f"Current minimum index: {i}",
            highlightedIndices=[i],
            data={"array": list(current_arr)}
        ))
        
        for j in range(i + 1, n):
            steps.append(AlgorithmStep(
                id=f"compare-{i}-{j}",
                description=f"Comparing {current_arr[j]} with current min {current_arr[min_idx]}",
                comparedIndices=[j, min_idx],
                data={"array": list(current_arr)}
            ))
            
            if current_arr[j] < current_arr[min_idx]:
                min_idx = j
                steps.append(AlgorithmStep(
                    id=f"new-min-{j}",
                    description=f"Found new minimum: {current_arr[j]}",
                    highlightedIndices=[j],
                    data={"array": list(current_arr)}
                ))
        
        if min_idx != i:
            current_arr[i], current_arr[min_idx] = current_arr[min_idx], current_arr[i]
            steps.append(AlgorithmStep(
                id=f"swap-{i}-{min_idx}",
                description=f"Swapped {current_arr[i]} with {current_arr[min_idx]}",
                highlightedIndices=[i, min_idx],
                data={"array": list(current_arr)}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Selection Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_insertion_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Insertion Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    for i in range(1, n):
        key = current_arr[i]
        j = i - 1
        
        steps.append(AlgorithmStep(
            id=f"select-key-{i}",
            description=f"Selected key: {key}",
            highlightedIndices=[i],
            data={"array": list(current_arr)}
        ))
        
        while j >= 0 and current_arr[j] > key:
            steps.append(AlgorithmStep(
                id=f"compare-{j}-{i}",
                description=f"Compare {current_arr[j]} > {key}, shifting {current_arr[j]} right",
                comparedIndices=[j],
                data={"array": list(current_arr)}
            ))
            
            current_arr[j + 1] = current_arr[j]
            j -= 1
            steps.append(AlgorithmStep(
                id=f"shift-{j+1}",
                description=f"Shifted for insertion",
                highlightedIndices=[j+1],
                data={"array": list(current_arr)}
            ))
            
        current_arr[j + 1] = key
        steps.append(AlgorithmStep(
            id=f"insert-{j+1}",
            description=f"Inserted {key} at index {j+1}",
            highlightedIndices=[j+1],
            data={"array": list(current_arr)}
        ))
        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Insertion Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_heap_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Heap Sort (Python)",
        data={"array": list(current_arr)}
    ))

    def heapify(n, i):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2
        
        if l < n:
            steps.append(AlgorithmStep(
                id=f"compare-{largest}-{l}",
                description=f"Comparing root {current_arr[largest]} with left child {current_arr[l]}",
                comparedIndices=[largest, l],
                data={"array": list(current_arr)}
            ))
            if current_arr[l] > current_arr[largest]:
                largest = l

        if r < n:
            steps.append(AlgorithmStep(
                id=f"compare-{largest}-{r}",
                description=f"Comparing largest {current_arr[largest]} with right child {current_arr[r]}",
                comparedIndices=[largest, r],
                data={"array": list(current_arr)}
            ))
            if current_arr[r] > current_arr[largest]:
                largest = r

        if largest != i:
            current_arr[i], current_arr[largest] = current_arr[largest], current_arr[i]
            steps.append(AlgorithmStep(
                id=f"swap-{i}-{largest}",
                description=f"Heapify: Swapped {current_arr[i]} with {current_arr[largest]}",
                highlightedIndices=[i, largest],
                data={"array": list(current_arr)}
            ))
            heapify(n, largest)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)
        
    for i in range(n - 1, 0, -1):
        current_arr[i], current_arr[0] = current_arr[0], current_arr[i]
        steps.append(AlgorithmStep(
            id=f"extract-max-{i}",
            description=f"Extracted max {current_arr[i]} to end",
            highlightedIndices=[0, i],
            data={"array": list(current_arr)}
        ))
        heapify(i, 0)
        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Heap Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_counting_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    if not current_arr: return steps
    
    # Handle negative numbers by shifting if necessary
    min_val = min(current_arr)
    shift = 0
    if min_val < 0:
        shift = abs(min_val)
        current_arr = [x + shift for x in current_arr]
        
    max_val = max(current_arr)
    count = [0] * (max_val + 1)
    output = [0] * len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Counting Sort (Python)",
        data={"array": list(arr)} # Display original array
    ))
    
    # Count occurrences
    for i in range(len(current_arr)):
        count[current_arr[i]] += 1
        steps.append(AlgorithmStep(
            id=f"count-{i}",
            description=f"Counting {current_arr[i] - shift}",
            highlightedIndices=[i],
            data={"array": list(arr), "count": list(count)}
        ))
        
    # Accumulate count
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    steps.append(AlgorithmStep(
        id="accumulate",
        description="Accumulated counts",
        data={"array": list(arr), "count": list(count)}
    ))
    
    # Build output array
    i = len(current_arr) - 1
    while i >= 0:
        val = current_arr[i]
        output[count[val] - 1] = val - shift
        count[val] -= 1
        
        # Visualize intermediate state (partially built output)
        current_output_display = list(output)
        # Update original array progressively for visualization simulation
        temp_viz = list(output) 
        # Note: Counting sort is not in-place usually, but we visualize result forming
        
        steps.append(AlgorithmStep(
            id=f"place-{i}",
            description=f"Placing {val - shift}",
            data={"array": list(temp_viz)}
        ))
        i -= 1
        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Counting Sort Complete (Python)",
        data={"array": list(output), "finished": True}
    ))
    return steps

def generate_shell_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    gap = n // 2
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Shell Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    while gap > 0:
        steps.append(AlgorithmStep(
            id=f"gap-{gap}",
            description=f"Sorting with gap: {gap}",
            data={"array": list(current_arr)}
        ))
        
        for i in range(gap, n):
            temp = current_arr[i]
            j = i
            
            steps.append(AlgorithmStep(
                id=f"select-{i}",
                description=f"Selected {temp} at index {i}",
                highlightedIndices=[i],
                data={"array": list(current_arr)}
            ))
            
            while j >= gap and current_arr[j - gap] > temp:
                steps.append(AlgorithmStep(
                    id=f"compare-{j}-{j-gap}",
                    description=f"Comparing {current_arr[j-gap]} > {temp}",
                    comparedIndices=[j, j-gap],
                    data={"array": list(current_arr)}
                ))
                
                current_arr[j] = current_arr[j - gap]
                j -= gap
                
                steps.append(AlgorithmStep(
                    id=f"shift-{j}",
                    description=f"Shifted element to {j}",
                    highlightedIndices=[j],
                    data={"array": list(current_arr)}
                ))
                
            current_arr[j] = temp
            steps.append(AlgorithmStep(
                id=f"insert-{j}",
                description=f"Inserted {temp} at index {j}",
                highlightedIndices=[j],
                data={"array": list(current_arr)}
            ))
            
        gap //= 2

    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Shell Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_radix_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    if not current_arr: return steps
    
    max_val = max(current_arr)
    exp = 1
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Radix Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    while max_val // exp > 0:
        steps.append(AlgorithmStep(
            id=f"exp-{exp}",
            description=f"Sorting digit at place: {exp}",
            data={"array": list(current_arr)}
        ))
        
        n = len(current_arr)
        output = [0] * n
        count = [0] * 10
        
        for i in range(n):
            index = (current_arr[i] // exp) % 10
            count[index] += 1
            
        for i in range(1, 10):
            count[i] += count[i - 1]
            
        i = n - 1
        while i >= 0:
            index = (current_arr[i] // exp) % 10
            output[count[index] - 1] = current_arr[i]
            count[index] -= 1
            i -= 1
            
        for i in range(n):
            current_arr[i] = output[i]
            steps.append(AlgorithmStep(
                id=f"update-{exp}-{i}",
                description=f"Updated index {i} with {current_arr[i]}",
                highlightedIndices=[i],
                data={"array": list(current_arr)}
            ))
            
        exp *= 10
        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Radix Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_bucket_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    if not current_arr: return steps
    
    n = len(current_arr)
    max_val = max(current_arr)
    min_val = min(current_arr)
    range_val = max_val - min_val
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Bucket Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    bucket_count = n
    if range_val == 0: bucket_count = 1
    buckets = [[] for _ in range(bucket_count)]
    
    for i in range(n):
        if range_val == 0:
            idx = 0
        else:
            idx = int((current_arr[i] - min_val) / range_val * (bucket_count - 1))
        buckets[idx].append(current_arr[i])
        
        steps.append(AlgorithmStep(
            id=f"bucket-place-{i}",
            description=f"Placed {current_arr[i]} into bucket {idx}",
            highlightedIndices=[i],
            data={"array": list(current_arr), "buckets": buckets} # Buckets visualization would need frontend support
        ))
        
    k = 0
    for i in range(bucket_count):
        buckets[i].sort() # Using Python's Timsort for individual buckets
        for item in buckets[i]:
            current_arr[k] = item
            steps.append(AlgorithmStep(
                id=f"collect-{k}",
                description=f"Collected {item} from bucket {i}",
                highlightedIndices=[k],
                data={"array": list(current_arr)}
            ))
            k += 1
            
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Bucket Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_comb_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    gap = n
    shrink = 1.3
    sorted_flag = False
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Comb Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    while not sorted_flag:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted_flag = True
            
        i = 0
        steps.append(AlgorithmStep(
            id=f"gap-{gap}",
            description=f"Current gap: {gap}",
            data={"array": list(current_arr)}
        ))
        
        while i + gap < n:
            steps.append(AlgorithmStep(
                id=f"compare-{i}-{i+gap}",
                description=f"Comparing {current_arr[i]} and {current_arr[i+gap]}",
                comparedIndices=[i, i+gap],
                data={"array": list(current_arr)}
            ))
            
            if current_arr[i] > current_arr[i + gap]:
                current_arr[i], current_arr[i + gap] = current_arr[i + gap], current_arr[i]
                sorted_flag = False
                steps.append(AlgorithmStep(
                    id=f"swap-{i}-{i+gap}",
                    description=f"Swapped {current_arr[i]} and {current_arr[i+gap]}",
                    highlightedIndices=[i, i+gap],
                    data={"array": list(current_arr)}
                ))
            i += 1
            
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Comb Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_cycle_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Cycle Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    for cycle_start in range(0, n - 1):
        item = current_arr[cycle_start]
        pos = cycle_start
        
        steps.append(AlgorithmStep(
            id=f"cycle-start-{cycle_start}",
            description=f"Starting cycle for item {item} at {cycle_start}",
            highlightedIndices=[cycle_start],
            data={"array": list(current_arr)}
        ))
        
        for i in range(cycle_start + 1, n):
            if current_arr[i] < item:
                pos += 1
                
        if pos == cycle_start:
            continue
            
        while item == current_arr[pos]:
            pos += 1
            
        current_arr[pos], item = item, current_arr[pos]
        steps.append(AlgorithmStep(
            id=f"swap-{pos}",
            description=f"Placed item at correct position {pos}",
            highlightedIndices=[pos, cycle_start],
            data={"array": list(current_arr)}
        ))
        
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if current_arr[i] < item:
                    pos += 1
                    
            while item == current_arr[pos]:
                pos += 1
                
            current_arr[pos], item = item, current_arr[pos]
            steps.append(AlgorithmStep(
                id=f"swap-{pos}-cycle",
                description=f"Placed item at correct position {pos}",
                highlightedIndices=[pos, cycle_start],
                data={"array": list(current_arr)}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Cycle Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_odd_even_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    is_sorted = False
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Odd-Even Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    while not is_sorted:
        is_sorted = True
        
        # Odd phase
        for i in range(1, n - 1, 2):
            steps.append(AlgorithmStep(
                id=f"odd-compare-{i}-{i+1}",
                description=f"Odd Phase: Comparing {current_arr[i]} and {current_arr[i+1]}",
                comparedIndices=[i, i+1],
                data={"array": list(current_arr)}
            ))
            if current_arr[i] > current_arr[i+1]:
                current_arr[i], current_arr[i+1] = current_arr[i+1], current_arr[i]
                is_sorted = False
                steps.append(AlgorithmStep(
                    id=f"odd-swap-{i}-{i+1}",
                    description=f"Odd Phase: Swapped {current_arr[i]} and {current_arr[i+1]}",
                    highlightedIndices=[i, i+1],
                    data={"array": list(current_arr)}
                ))
                
        # Even phase
        for i in range(0, n - 1, 2):
            steps.append(AlgorithmStep(
                id=f"even-compare-{i}-{i+1}",
                description=f"Even Phase: Comparing {current_arr[i]} and {current_arr[i+1]}",
                comparedIndices=[i, i+1],
                data={"array": list(current_arr)}
            ))
            if current_arr[i] > current_arr[i+1]:
                current_arr[i], current_arr[i+1] = current_arr[i+1], current_arr[i]
                is_sorted = False
                steps.append(AlgorithmStep(
                    id=f"even-swap-{i}-{i+1}",
                    description=f"Even Phase: Swapped {current_arr[i]} and {current_arr[i+1]}",
                    highlightedIndices=[i, i+1],
                    data={"array": list(current_arr)}
                ))
                
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Odd-Even Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_tim_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    n = len(current_arr)
    RUN = 32
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Tim Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    def insertion_sort_run(left, right):
        for i in range(left + 1, right + 1):
            temp = current_arr[i]
            j = i - 1
            while j >= left and current_arr[j] > temp:
                current_arr[j + 1] = current_arr[j]
                j -= 1
            current_arr[j + 1] = temp
            
            steps.append(AlgorithmStep(
                id=f"run-sort-{left}-{right}",
                description=f"Sorting run from {left} to {right}",
                highlightedIndices=list(range(left, right+1)),
                data={"array": list(current_arr)}
            ))

    def merge_runs(l, m, r):
        len1, len2 = m - l + 1, r - m
        left = [0] * len1
        right = [0] * len2
        for x in range(len1): left[x] = current_arr[l + x]
        for x in range(len2): right[x] = current_arr[m + 1 + x]
        
        i, j, k = 0, 0, l
        
        while i < len1 and j < len2:
            if left[i] <= right[j]:
                current_arr[k] = left[i]
                i += 1
            else:
                current_arr[k] = right[j]
                j += 1
            k += 1
            
        while i < len1:
            current_arr[k] = left[i]
            k += 1
            i += 1
        while j < len2:
            current_arr[k] = right[j]
            k += 1
            j += 1
            
        steps.append(AlgorithmStep(
            id=f"merge-runs-{l}-{r}",
            description=f"Merged runs from {l} to {r}",
            highlightedIndices=list(range(l, r+1)),
            data={"array": list(current_arr)}
        ))

    for i in range(0, n, RUN):
        insertion_sort_run(i, min((i + 31), (n - 1)))
        
    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right:
                merge_runs(left, mid, right)
        size = 2 * size
        
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Tim Sort Complete (Python)",
        data={"array": list(current_arr), "finished": True}
    ))
    return steps

def generate_tree_sort_steps(arr: List[int]) -> List[AlgorithmStep]:
    steps = []
    current_arr = list(arr)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Starting Tree Sort (Python)",
        data={"array": list(current_arr)}
    ))
    
    class Node:
        def __init__(self, key):
            self.left = None
            self.right = None
            self.val = key

    def insert(root, key, idx):
        if root is None:
            steps.append(AlgorithmStep(
                id=f"insert-node-{key}",
                description=f"Inserted {key} into BST",
                highlightedIndices=[idx],
                data={"array": list(current_arr)}
            ))
            return Node(key)
        else:
            if root.val < key:
                root.right = insert(root.right, key, idx)
            else:
                root.left = insert(root.left, key, idx)
        return root

    def inorder(root, res):
        if root:
            inorder(root.left, res)
            res.append(root.val)
            steps.append(AlgorithmStep(
                id=f"inorder-traversal",
                description=f"Inorder Traversal: {root.val}",
                data={"array": list(res) + [0]*(len(current_arr)-len(res))}
            ))
            inorder(root.right, res)

    root = None
    for i, item in enumerate(current_arr):
        root = insert(root, item, i)
        
    sorted_res = []
    inorder(root, sorted_res)
    
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Tree Sort Complete (Python)",
        data={"array": list(sorted_res), "finished": True}
    ))
    return steps
