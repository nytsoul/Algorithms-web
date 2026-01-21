from typing import List, Dict, Any
import heapq
from ..models import AlgorithmStep

def generate_activity_selection_steps(start_times: List[int], end_times: List[int]) -> List[AlgorithmStep]:
    steps = []
    # Combine and sort by end time
    activities = []
    for i in range(len(start_times)):
        activities.append({'id': i, 'start': start_times[i], 'end': end_times[i]})
    
    # Sort by end time
    sorted_activities = sorted(activities, key=lambda x: x['end'])
    
    steps.append(AlgorithmStep(
        id="init",
        description="Sorted activities by end time",
        data={"activities": sorted_activities}
    ))
    
    selected_indices = []
    if not sorted_activities:
        return steps
        
    # Select first activity
    last_selected = sorted_activities[0]
    selected_indices.append(last_selected['id'])
    
    steps.append(AlgorithmStep(
        id=f"select-{last_selected['id']}",
        description=f"Selected initial activity {last_selected['id']} (Ends at {last_selected['end']})",
        highlightedIndices=[0], # Highlighting in sorted list
        data={"selected": selected_indices, "last_end": last_selected['end']}
    ))
    
    for i in range(1, len(sorted_activities)):
        current = sorted_activities[i]
        steps.append(AlgorithmStep(
            id=f"check-{current['id']}",
            description=f"Checking activity {current['id']}: Start {current['start']} >= Last End {last_selected['end']}?",
            comparedIndices=[i],
            data={"current": current}
        ))
        
        if current['start'] >= last_selected['end']:
            last_selected = current
            selected_indices.append(current['id'])
            steps.append(AlgorithmStep(
                id=f"select-{current['id']}",
                description=f"Selected activity {current['id']}",
                highlightedIndices=[i], 
                data={"selected": selected_indices, "last_end": last_selected['end']}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Selected {len(selected_indices)} activities",
        data={"selected": selected_indices, "finished": True}
    ))
    return steps

def generate_fractional_knapsack_steps(weights: List[int], values: List[int], capacity: int) -> List[AlgorithmStep]:
    steps = []
    items = []
    for i in range(len(weights)):
        items.append({'id': i, 'weight': weights[i], 'value': values[i], 'ratio': values[i]/weights[i]})
        
    # Sort by value/weight ratio descending
    sorted_items = sorted(items, key=lambda x: x['ratio'], reverse=True)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Sorted items by Value/Weight ratio",
        data={"items": sorted_items, "capacity": capacity}
    ))
    
    current_weight = 0
    total_value = 0.0
    
    for i, item in enumerate(sorted_items):
        if current_weight == capacity:
            break
            
        remaining_capacity = capacity - current_weight
        
        steps.append(AlgorithmStep(
            id=f"check-{item['id']}",
            description=f"Checking item {item['id']} (Wt: {item['weight']}, Val: {item['value']})",
            comparedIndices=[i],
            data={"current_item": item, "remaining_capacity": remaining_capacity}
        ))
        
        if item['weight'] <= remaining_capacity:
            current_weight += item['weight']
            total_value += item['value']
            steps.append(AlgorithmStep(
                id=f"take-full-{item['id']}",
                description=f"Took full item {item['id']}",
                highlightedIndices=[i],
                data={"total_value": total_value, "current_weight": current_weight}
            ))
        else:
            fraction = remaining_capacity / item['weight']
            total_value += item['value'] * fraction
            current_weight += item['weight'] * fraction # which is capacity
            steps.append(AlgorithmStep(
                id=f"take-fraction-{item['id']}",
                description=f"Took {fraction:.2f} of item {item['id']}",
                highlightedIndices=[i],
                data={"total_value": total_value, "current_weight": current_weight}
            ))
            break
            
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Max Value: {total_value:.2f}",
        data={"total_value": total_value, "finished": True}
    ))
    return steps

def generate_job_sequencing_steps(ids: List[str], deadlines: List[int], profits: List[int]) -> List[AlgorithmStep]:
    steps = []
    n = len(ids)
    jobs = []
    for i in range(n):
        jobs.append({'id': ids[i], 'deadline': deadlines[i], 'profit': profits[i]})
        
    # Sort by profit descending
    jobs.sort(key=lambda x: x['profit'], reverse=True)
    
    max_deadline = max(deadlines) if deadlines else 0
    slots = [-1] * max_deadline
    
    steps.append(AlgorithmStep(
        id="init",
        description="Sorted jobs by profit. Created empty schedule slots.",
        data={"jobs": jobs, "slots": slots}
    ))
    
    total_profit = 0
    jobs_done = 0
    
    for i, job in enumerate(jobs):
        steps.append(AlgorithmStep(
            id=f"check-{job['id']}",
            description=f"Attempting to schedule Job {job['id']} (Profit: {job['profit']}, Deadline: {job['deadline']})",
            data={"current_job": job}
        ))
        
        # Find free slot from deadline-1 down to 0
        scheduled = False
        for j in range(min(max_deadline, job['deadline']) - 1, -1, -1):
            if slots[j] == -1:
                slots[j] = job['id']
                total_profit += job['profit']
                jobs_done += 1
                scheduled = True
                steps.append(AlgorithmStep(
                    id=f"schedule-{job['id']}",
                    description=f"Scheduled Job {job['id']} at slot {j}",
                    highlightedIndices=[j], # Highlighting slot
                    data={"slots": list(slots), "total_profit": total_profit}
                ))
                break
        
        if not scheduled:
            steps.append(AlgorithmStep(
                id=f"skip-{job['id']}",
                description=f"Could not schedule Job {job['id']} (No slots)",
                data={"slots": list(slots)}
            ))
            
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Scheduled {jobs_done} jobs for Profit: {total_profit}",
        data={"slots": list(slots), "total_profit": total_profit, "finished": True}
    ))
    return steps

def generate_huffman_coding_steps(chars: List[str], freqs: List[int]) -> List[AlgorithmStep]:
    steps = []
    
    class Node:
        def __init__(self, freq, symbol, left=None, right=None):
            self.freq = freq
            self.symbol = symbol
            self.left = left
            self.right = right
            self.huff = ''
        def __lt__(self, nxt):
            return self.freq < nxt.freq
            
    nodes = []
    for i in range(len(chars)):
        heapq.heappush(nodes, Node(freqs[i], chars[i]))
        
    steps.append(AlgorithmStep(
        id="init",
        description="Created Min-Heap from characters and frequencies",
        data={"nodes": [{'symbol': n.symbol, 'freq': n.freq} for n in nodes]}
    ))
    
    while len(nodes) > 1:
        left = heapq.heappop(nodes)
        right = heapq.heappop(nodes)
        
        left.huff = 0
        right.huff = 1
        
        steps.append(AlgorithmStep(
            id=f"merge-{left.symbol}-{right.symbol}",
            description=f"Extracted two smallest: ({left.symbol}:{left.freq}) & ({right.symbol}:{right.freq})",
            data={"left": {'symbol': left.symbol, 'freq': left.freq}, "right": {'symbol': right.symbol, 'freq': right.freq}}
        ))
        
        new_node = Node(left.freq + right.freq, left.symbol + right.symbol, left, right)
        heapq.heappush(nodes, new_node)
        
        steps.append(AlgorithmStep(
            id=f"push-{new_node.symbol}",
            description=f"Inserted merged node ({new_node.symbol}:{new_node.freq}) back to heap",
            data={"nodes_count": len(nodes)}
        ))
        
    codes = {}
    def printNodes(node, val=''):
        newVal = val + str(node.huff)
        if(node.left):
            printNodes(node.left, newVal)
        if(node.right):
            printNodes(node.right, newVal)
        if(not node.left and not node.right):
            codes[node.symbol] = newVal
            
    printNodes(nodes[0])
    
    steps.append(AlgorithmStep(
        id="complete",
        description="✅ Huffman Codes Generated",
        data={"codes": codes, "finished": True}
    ))
    return steps

def generate_coin_change_greedy_steps(coins: List[int], amount: int) -> List[AlgorithmStep]:
    steps = []
    # Greedy only works for standard currency systems, assumes input is compatible or just shows greedy attempt
    sorted_coins = sorted(coins, reverse=True)
    
    steps.append(AlgorithmStep(
        id="init",
        description=f"Starting Greedy Coin Change for amount {amount}",
        data={"coins": sorted_coins, "target": amount}
    ))
    
    result = []
    current_amount = amount
    
    for coin in sorted_coins:
        if current_amount == 0: break
        
        if coin <= current_amount:
            count = current_amount // coin
            current_amount -= count * coin
            result.append({'coin': coin, 'count': count})
            
            steps.append(AlgorithmStep(
                id=f"take-{coin}",
                description=f"Took {count} coin(s) of value {coin}",
                data={"remaining": current_amount, "result": list(result)}
            ))
            
    if current_amount > 0:
        steps.append(AlgorithmStep(
            id="failed",
            description=f"❌ Could not make exact change (Remaining: {current_amount})",
            data={"finished": True, "success": False}
        ))
    else:
        steps.append(AlgorithmStep(
            id="complete",
            description="✅ Coin change complete",
            data={"result": list(result), "finished": True, "success": True}
        ))
    return steps

def generate_min_platforms_steps(arrivals: List[int], departures: List[int]) -> List[AlgorithmStep]:
    steps = []
    n = len(arrivals)
    if n == 0: return steps
    
    arr = sorted(arrivals)
    dep = sorted(departures)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Sorted arrival and departure times",
        data={"arrivals": arr, "departures": dep}
    ))
    
    platforms_needed = 1
    max_platforms = 1
    i = 1
    j = 0
    
    while i < n and j < n:
        if arr[i] <= dep[j]:
            platforms_needed += 1
            steps.append(AlgorithmStep(
                id=f"arrival-{i}",
                description=f"Train arrival at {arr[i]}. Platforms needed: {platforms_needed}",
                data={"time": arr[i], "type": "arrival", "platforms": platforms_needed}
            ))
            i += 1
        elif arr[i] > dep[j]:
            platforms_needed -= 1
            steps.append(AlgorithmStep(
                id=f"departure-{j}",
                description=f"Train departure at {dep[j]}. Platforms needed: {platforms_needed}",
                data={"time": dep[j], "type": "departure", "platforms": platforms_needed}
            ))
            j += 1
            
        if platforms_needed > max_platforms:
            max_platforms = platforms_needed
            
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Minimum Platforms Required: {max_platforms}",
        data={"max_platforms": max_platforms, "finished": True}
    ))
    return steps

def generate_optimal_merge_pattern_steps(files: List[int]) -> List[AlgorithmStep]:
    steps = []
    pq = list(files)
    heapq.heapify(pq)
    
    steps.append(AlgorithmStep(
        id="init",
        description="Initialized Priority Queue with file sizes",
        data={"files": list(pq)}
    ))
    
    total_computation = 0
    
    while len(pq) > 1:
        first = heapq.heappop(pq)
        second = heapq.heappop(pq)
        merged_size = first + second
        total_computation += merged_size
        
        steps.append(AlgorithmStep(
            id=f"merge-{first}-{second}",
            description=f"Merged files of size {first} and {second} (Cost: {merged_size})",
            data={"merged_size": merged_size, "total_cost": total_computation}
        ))
        
        heapq.heappush(pq, merged_size)
        steps.append(AlgorithmStep(
            id=f"push-{merged_size}",
            description=f"Added merged file {merged_size} back to queue",
            data={"queue": list(pq)}
        ))
        
    steps.append(AlgorithmStep(
        id="complete",
        description=f"✅ Optimal Merge Cost: {total_computation}",
        data={"total_cost": total_computation, "finished": True}
    ))
    return steps
