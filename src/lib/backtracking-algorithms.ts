import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * N-Queens Problem
 * Place N queens on an NxN chessboard such that no two queens attack each other.
 */
export function generateNQueensSteps(n: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const board = Array.from({ length: n }, () => new Array(n).fill(0));

    steps.push({
        id: 'init',
        description: `Starting N-Queens for N=${n}.`,
        data: { board: board.map(row => [...row]) }
    });

    const solve = (col: number) => {
        if (col >= n) return true;

        for (let i = 0; i < n; i++) {
            steps.push({
                id: `try-${i}-${col}`,
                description: `Trying to place queen at [${i}, ${col}]`,
                currentIndex: i,
                data: { board: board.map(row => [...row]), currentCol: col }
            });

            if (isSafe(board, i, col, n)) {
                board[i][col] = 1;
                steps.push({
                    id: `place-${i}-${col}`,
                    description: `✅ Placed queen at [${i}, ${col}]`,
                    currentIndex: i,
                    data: { board: board.map(row => [...row]), currentCol: col }
                });

                if (solve(col + 1)) return true;

                board[i][col] = 0;
                steps.push({
                    id: `backtrack-${i}-${col}`,
                    description: `❌ Backtracking from [${i}, ${col}]`,
                    currentIndex: i,
                    data: { board: board.map(row => [...row]), currentCol: col }
                });
            }
        }
        return false;
    };

    function isSafe(board: number[][], row: number, col: number, n: number) {
        for (let i = 0; i < col; i++) if (board[row][i]) return false;
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
        for (let i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j]) return false;
        return true;
    }

    const solved = solve(0);

    steps.push({
        id: 'complete',
        description: solved ? '✅ N-Queens solved!' : '❌ No solution found.',
        data: { board: board.map(row => [...row]), finished: true }
    });

    return steps;
}

/**
 * Sudoku Solver
 */
export function generateSudokuSolverSteps(board: number[][]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const grid = board.map(row => [...row]);

    steps.push({
        id: 'init',
        description: 'Starting Sudoku Solver.',
        data: { grid: grid.map(row => [...row]) }
    });

    const solve = () => {
        let row = -1, col = -1, isEmpty = false;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    row = i; col = j; isEmpty = true;
                    break;
                }
            }
            if (isEmpty) break;
        }

        if (!isEmpty) return true;

        for (let num = 1; num <= 9; num++) {
            if (isSafeSudoku(grid, row, col, num)) {
                grid[row][col] = num;
                steps.push({
                    id: `try-${row}-${col}-${num}`,
                    description: `Trying ${num} at [${row}, ${col}]`,
                    currentIndex: row * 9 + col,
                    data: { grid: grid.map(row => [...row]) }
                });

                if (solve()) return true;

                grid[row][col] = 0;
                steps.push({
                    id: `backtrack-${row}-${col}`,
                    description: `Backtracking from [${row}, ${col}]`,
                    currentIndex: row * 9 + col,
                    data: { grid: grid.map(row => [...row]) }
                });
            }
        }
        return false;
    };

    function isSafeSudoku(grid: number[][], row: number, col: number, num: number) {
        for (let x = 0; x <= 8; x++) if (grid[row][x] === num) return false;
        for (let x = 0; x <= 8; x++) if (grid[x][col] === num) return false;
        let startRow = row - row % 3, startCol = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] === num) return false;
        return true;
    }

    solve();

    steps.push({
        id: 'complete',
        description: '✅ Sudoku Solver Complete!',
        data: { grid: grid.map(row => [...row]), finished: true }
    });

    return steps;
}

export const backtrackingGenerators = {
    nQueens: generateNQueensSteps,
    sudokuSolver: generateSudokuSolverSteps,
};
