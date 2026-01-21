import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x?: number;
    y?: number;
}

interface BinaryTreeVisualizerProps {
    hideHeader?: boolean;
}

class BinarySearchTree {
    root: TreeNode | null = null;

    insert(value: number): void {
        const newNode: TreeNode = { value, left: null, right: null };
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) return; // Duplicate
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    search(value: number): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    delete(value: number): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            let minRight = node.right;
            while (minRight.left) minRight = minRight.left;
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value);
        }
        return node;
    }

    getNodeCount(): number {
        const count = (node: TreeNode | null): number => {
            if (!node) return 0;
            return 1 + count(node.left) + count(node.right);
        };
        return count(this.root);
    }

    computeLayout(width: number, height: number): void {
        if (!this.root) return;

        const inorderList: Array<{ node: TreeNode; depth: number }> = [];
        const inorder = (n: TreeNode | null, d: number): void => {
            if (!n) return;
            inorder(n.left, d + 1);
            inorderList.push({ node: n, depth: d });
            inorder(n.right, d + 1);
        };

        inorder(this.root, 0);

        const marginX = 40;
        const marginY = 40;
        const maxDepth = Math.max(...inorderList.map(o => o.depth), 0);
        const nCount = inorderList.length;

        inorderList.forEach((o, i) => {
            const x = marginX + (nCount <= 1 ? (width - 2 * marginX) / 2 : i * (width - 2 * marginX) / (nCount - 1));
            const y = marginY + (maxDepth <= 0 ? 0 : o.depth * (height - 2 * marginY) / Math.max(1, maxDepth));
            o.node.x = x;
            o.node.y = y;
        });
    }
}

export function BinaryTreeVisualizer({ hideHeader = false }: BinaryTreeVisualizerProps) {
    const [bst] = useState(() => new BinarySearchTree());
    const [nodeValue, setNodeValue] = useState<string>('');
    const [selectedNode, setSelectedNode] = useState<number | null>(null);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [message, setMessage] = useState<string>('Insert values to build the tree');

    const triggerUpdate = () => setUpdateTrigger(prev => prev + 1);

    const handleInsert = useCallback(() => {
        const value = parseInt(nodeValue);
        if (isNaN(value)) {
            setMessage('Please enter a valid number');
            return;
        }
        bst.insert(value);
        setMessage(`Inserted ${value}`);
        setNodeValue('');
        triggerUpdate();
    }, [nodeValue, bst]);

    const handleDelete = useCallback(() => {
        const value = parseInt(nodeValue);
        if (isNaN(value)) {
            setMessage('Please enter a valid number');
            return;
        }
        bst.delete(value);
        setMessage(`Deleted ${value}`);
        setNodeValue('');
        setSelectedNode(null);
        triggerUpdate();
    }, [nodeValue, bst]);

    const handleSearch = useCallback(() => {
        const value = parseInt(nodeValue);
        if (isNaN(value)) {
            setMessage('Please enter a valid number');
            return;
        }
        const found = bst.search(value);
        setMessage(found ? `Value ${value} found!` : `Value ${value} not found`);
    }, [nodeValue, bst]);

    const handleClear = useCallback(() => {
        bst.root = null;
        setMessage('Tree cleared');
        setSelectedNode(null);
        triggerUpdate();
    }, [bst]);

    const handleRandom = useCallback(() => {
        bst.root = null;
        const values = new Set<number>();
        while (values.size < 10) {
            values.add(Math.floor(Math.random() * 100) + 1);
        }
        values.forEach(val => bst.insert(val));
        setMessage('Generated random tree');
        triggerUpdate();
    }, [bst]);

    useEffect(() => {
        // Initialize with sample tree
        [50, 30, 70, 20, 40, 60, 80].forEach(val => bst.insert(val));
        triggerUpdate();
    }, []);

    const renderTree = () => {
        if (!bst.root) {
            return (
                <div className="flex items-center justify-center h-full text-white/40 text-lg">
                    Empty tree. Insert values to begin.
                </div>
            );
        }

        const width = 1000;
        const height = 500;
        bst.computeLayout(width, height);

        const links: Array<[TreeNode, TreeNode]> = [];
        const collectLinks = (node: TreeNode | null): void => {
            if (!node) return;
            if (node.left) links.push([node, node.left]);
            if (node.right) links.push([node, node.right]);
            collectLinks(node.left);
            collectLinks(node.right);
        };
        collectLinks(bst.root);

        const nodes: TreeNode[] = [];
        const collectNodes = (node: TreeNode | null): void => {
            if (!node) return;
            nodes.push(node);
            collectNodes(node.left);
            collectNodes(node.right);
        };
        collectNodes(bst.root);

        return (
            <svg width={width} height={height} className="w-full h-full">
                {/* Links */}
                {links.map((pair, idx) => {
                    const [a, b] = pair;
                    return (
                        <line
                            key={`link-${idx}`}
                            x1={a.x}
                            y1={a.y}
                            x2={b.x}
                            y2={b.y}
                            stroke="#666"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, idx) => (
                    <g
                        key={`node-${idx}`}
                        transform={`translate(${node.x},${node.y})`}
                        onClick={() => {
                            setSelectedNode(node.value);
                            setNodeValue(node.value.toString());
                        }}
                        className="cursor-pointer"
                    >
                        <circle
                            r="24"
                            fill={selectedNode === node.value ? '#ff6b6b' : '#667eea'}
                            stroke="#764ba2"
                            strokeWidth="3"
                            className="transition-all duration-300 hover:r-[28]"
                        />
                        <text
                            textAnchor="middle"
                            dy="6"
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            className="pointer-events-none"
                        >
                            {node.value}
                        </text>
                    </g>
                ))}
            </svg>
        );
    };

    return (
        <div className="space-y-6">
            {!hideHeader && (
                <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                        Binary Search Tree
                    </h3>
                    <p className="text-white/40 text-sm mt-1">Interactive BST with insert, delete, and search operations</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualization */}
                <div className="lg:col-span-2">
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
                        <div className="relative h-[500px]">
                            {renderTree()}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                            Controls
                        </div>

                        <input
                            type="number"
                            value={nodeValue}
                            onChange={(e) => setNodeValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
                            placeholder="Enter value"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-center focus:bg-white/10 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all"
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleInsert}
                                className="px-4 py-2 bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 text-[var(--neon-green)] rounded-lg hover:bg-[var(--neon-green)]/20 transition-all font-semibold"
                            >
                                Insert
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-semibold"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] rounded-lg hover:bg-[var(--neon-cyan)]/20 transition-all font-semibold"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-lg hover:bg-white/10 transition-all font-semibold"
                            >
                                Clear
                            </button>
                        </div>

                        <button
                            onClick={handleRandom}
                            className="w-full px-4 py-3 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 text-[var(--neon-purple)] rounded-lg hover:bg-[var(--neon-purple)]/20 transition-all font-semibold"
                        >
                            Generate Random Tree
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
                            Tree Stats
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">Nodes:</span>
                                <span className="text-[var(--neon-cyan)] font-mono font-bold">{bst.getNodeCount()}</span>
                            </div>
                            {selectedNode !== null && (
                                <div className="flex justify-between">
                                    <span className="text-white/60 text-sm">Selected:</span>
                                    <span className="text-[var(--neon-purple)] font-mono font-bold">{selectedNode}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="bg-[var(--neon-cyan)]/5 border border-[var(--neon-cyan)]/10 rounded-xl p-4">
                        <p className="text-[var(--neon-cyan)] text-sm font-mono">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
