from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any, Dict

app = FastAPI(title="Algorithms Backend", description="Python logic for Algorithm Visualizations")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlgorithmRequest(BaseModel):
    type: str
    params: Dict[str, Any]

class AlgorithmStep(BaseModel):
    id: str
    description: str
    currentIndex: Optional[int] = None
    comparedIndices: Optional[List[int]] = None
    highlightedIndices: Optional[List[int]] = None
    data: Dict[str, Any]

@app.get("/")
async def root():
    return {"message": "Algorithms Backend is running", "status": "healthy"}

@app.post("/generate-steps", response_model=List[AlgorithmStep])
async def generate_steps(request: AlgorithmRequest):
    algo_type = request.type
    params = request.params
    
    # Simple routing to algorithm implementations
    if algo_type == 'bubble-sort':
        return bubble_sort_steps(params.get('array', []))
    elif algo_type == 'binary-search':
        return binary_search_steps(params.get('array', []), params.get('target', 0))
    
    raise HTTPException(status_code=404, detail=f"Algorithm {algo_type} implementation not found in Python backend.")

def bubble_sort_steps(arr: List[int]) -> List[Dict]:
    steps = []
    n = len(arr)
    current_arr = list(arr)
    
    steps.append({
        "id": "init",
        "description": "Starting Bubble Sort (Python)",
        "data": {"array": list(current_arr)}
    })
    
    for i in range(n):
        for j in range(0, n - i - 1):
            steps.append({
                "id": f"compare-{i}-{j}",
                "description": f"Comparing {current_arr[j]} and {current_arr[j+1]}",
                "comparedIndices": [j, j+1],
                "data": {"array": list(current_arr)}
            })
            
            if current_arr[j] > current_arr[j+1]:
                current_arr[j], current_arr[j+1] = current_arr[j+1], current_arr[j]
                steps.append({
                    "id": f"swap-{i}-{j}",
                    "description": f"Swapped {current_arr[j+1]} and {current_arr[j]}",
                    "highlightedIndices": [j, j+1],
                    "data": {"array": list(current_arr)}
                })
                
    steps.append({
        "id": "complete",
        "description": "✅ Bubble Sort Complete (Python)",
        "data": {"array": list(current_arr), "finished": True}
    })
    return steps

def binary_search_steps(arr: List[int], target: int) -> List[Dict]:
    steps = []
    left, right = 0, len(arr) - 1
    
    steps.append({
        "id": "init",
        "description": f"Starting Binary Search for {target} (Python)",
        "data": {"array": list(arr), "target": target}
    })
    
    while left <= right:
        mid = (left + right) // 2
        steps.append({
            "id": f"check-{mid}",
            "description": f"Checking mid index {mid}",
            "comparedIndices": [mid],
            "data": {"array": list(arr), "left": left, "right": right, "mid": mid}
        })
        
        if arr[mid] == target:
            steps.append({
                "id": "found",
                "description": f"✅ Found {target} at index {mid} (Python)",
                "highlightedIndices": [mid],
                "data": {"array": list(arr), "finished": True, "found": True}
            })
            return steps
        
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    steps.append({
        "id": "not-found",
        "description": f"❌ {target} not found (Python)",
        "data": {"array": list(arr), "finished": True, "found": False}
    })
    return steps

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
