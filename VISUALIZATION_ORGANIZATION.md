# Visualization Folder Organization Guide

## ✅ Completed Setup

The visualization folder has been properly organized with the following structure:

```
src/components/visualizations/
├── index.ts                          # Main export file
├── README.md                         # Documentation
├── common/                           # Common/shared visualizations
│   └── index.ts
├── searching/                        # Search algorithm visualizations
│   ├── BinarySearchVisualization.tsx
│   ├── LinearSearchVisualization.tsx
│   └── index.ts
├── sorting/                          # Sorting algorithm visualizations
│   └── index.ts
├── trees/                            # Tree structure visualizations
│   └── index.ts
├── graphs/                           # Graph structure visualizations
│   └── index.ts
├── advanced/                         # Advanced visualizations
│   └── index.ts
```

## 📋 Files to Organize

The following files currently in `src/components/visualizations/` should be moved:

### Common Components (→ common/)
- `ArrayVisualization.tsx`
- `ArrayGridVisualization.tsx`
- `CodeSnippet.tsx`
- `VisualizationControls.tsx`
- `GenericVisualization.tsx` (from src/visualizations/)
- `MatrixVisualization.tsx` (from src/visualizations/)

### Searching Components (→ searching/)
- `BinarySearchVisualizer.tsx`

### Sorting Components (→ sorting/)
- `SelectionSortVisualizer.tsx`

### Tree Components (→ trees/)
- `BinaryTreeVisualizer.tsx`
- `TreeVisualization.tsx` (from src/visualizations/)

### Graph Components (→ graphs/)
- `GraphVisualization.tsx` (from src/visualizations/)
- `PrimsVisualizer.tsx`
- `UnifiedGraphVisualization.tsx`

### Advanced Components (→ advanced/)
- `AdvancedVisualizations.tsx`
- `AlgorithmVisualizations.tsx`
- `AlgorithmVisualizer.tsx`
- `ThreeDVisualization.tsx`
- `UnifiedArrayVisualization.tsx`
- `UnifiedGeometricVisualization.tsx`
- `UnifiedMatrixVisualization.tsx`
- `UnifiedStringVisualization.tsx`

## 🔗 Import Path Updates

After moving files, update imports throughout the project:

### Old Pattern
```typescript
import { BinarySearchVisualizer } from '@/components/visualizations';
```

### New Pattern (Recommended)
```typescript
// Specific import from category
import { BinarySearchVisualizer } from '@/components/visualizations/searching';

// Or from main index
import { BinarySearchVisualizer } from '@/components/visualizations';
```

## 📦 Additional Cleanup

### src/Visual-data/ folder
The HTML files in this folder can be consolidated:
- `Binary-Search.html`
- `Binary-Tree.html`

Consider moving to: `src/components/visualizations/assets/html/`

### Duplicate src/visualizations/ folder
The `src/visualizations/` folder contains duplicate files. After moving files to the proper structure, consider archiving or removing it.

## ✨ Benefits of This Organization

1. **Scalability** - Easy to add new algorithm visualizations
2. **Maintainability** - Clear folder structure for maintenance
3. **Discoverability** - Easy to find related visualizations
4. **Import Clarity** - Clear import paths indicate component type
5. **Performance** - Better code splitting potential
