from pydantic import BaseModel
from typing import List, Optional, Any, Dict

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
