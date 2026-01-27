# Visualization Components

This directory contains all visualization components for the Algorithms project, organized by category.

## Folder Structure

### `/common`
Common visualization components used across the project:
- `ArrayVisualization.tsx` - Basic array visualization
- `ArrayGridVisualization.tsx` - Grid-based array visualization
- `GenericVisualization.tsx` - Generic visualization base component
- `MatrixVisualization.tsx` - Matrix visualization
- `CodeSnippet.tsx` - Code display component
- `VisualizationControls.tsx` - Common controls for visualizations

### `/searching`
Search algorithm visualizations:
- `BinarySearchVisualization.tsx` - Binary search algorithm
- `LinearSearchVisualization.tsx` - Linear search algorithm
- `BinarySearchVisualizer.tsx` - Interactive binary search visualizer

### `/sorting`
Sorting algorithm visualizations:
- `SelectionSortVisualizer.tsx` - Selection sort visualization

### `/trees`
Tree structure visualizations:
- `BinaryTreeVisualizer.tsx` - Binary tree visualization
- `TreeVisualization.tsx` - Generic tree visualization

### `/graphs`
Graph structure visualizations:
- `GraphVisualization.tsx` - Generic graph visualization
- `PrimsVisualizer.tsx` - Prim's algorithm visualization
- `UnifiedGraphVisualization.tsx` - Unified graph visualization

### `/advanced`
Advanced and complex visualizations:
- `ThreeDVisualization.tsx` - 3D visualization support
- `UnifiedMatrixVisualization.tsx` - Matrix visualizations
- `UnifiedStringVisualization.tsx` - String algorithm visualizations
- `UnifiedGeometricVisualization.tsx` - Geometric visualizations
- `UnifiedArrayVisualization.tsx` - Array operation visualizations
- `AdvancedVisualizations.tsx` - Collection of advanced visualizations
- `AlgorithmVisualizations.tsx` - Algorithm showcase visualizations
- `AlgorithmVisualizer.tsx` - Main algorithm visualizer component

## Usage

Import visualizations from the main index:

```typescript
import {
  ArrayVisualization,
  BinarySearchVisualizer,
  BinaryTreeVisualizer,
  GraphVisualization
} from '@/components/visualizations';
```

## Adding New Visualizations

1. Create the visualization component in the appropriate subfolder
2. Export it from the subfolder's index file (if one exists)
3. Update the main `index.ts` file to include the new export
