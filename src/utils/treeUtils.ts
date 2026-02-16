// AGGIUNTO 'type' davanti a Node ed Edge
import { type Node, type Edge } from 'reactflow';

// Funzione che trova tutti i discendenti (figli, nipoti, ecc.) di un nodo
export const getDescendants = (nodes: Node[], edges: Edge[], nodeId: string): string[] => {
    const descendants = new Set<string>();
    const stack = [nodeId];

    while (stack.length > 0) {
        const currentId = stack.pop();
        const childrenEdges = edges.filter((edge) => edge.source === currentId);

        childrenEdges.forEach((edge) => {
            if (!descendants.has(edge.target)) {
                descendants.add(edge.target);
                stack.push(edge.target);
            }
        });
    }

    return Array.from(descendants);
};

// Funzione principale che nasconde o mostra i nodi
export const toggleGraphPath = (nodes: Node[], edges: Edge[], nodeId: string) => {
    const childEdges = edges.filter((e) => e.source === nodeId);
    if (childEdges.length === 0) return { nodes, edges };

    const firstChildId = childEdges[0].target;
    const firstChild = nodes.find((n) => n.id === firstChildId);

    const isClosing = !firstChild?.hidden;

    let newNodes = [...nodes];
    let newEdges = [...edges];

    if (isClosing) {
        const descendants = getDescendants(nodes, edges, nodeId);

        newNodes = newNodes.map((node) => {
            if (descendants.includes(node.id)) {
                return { ...node, hidden: true };
            }
            return node;
        });

        newEdges = newEdges.map((edge) => {
            if (descendants.includes(edge.target) || descendants.includes(edge.source)) {
                return { ...edge, hidden: true };
            }
            return edge;
        });

    } else {
        const directChildrenIds = childEdges.map((e) => e.target);

        newNodes = newNodes.map((node) => {
            if (directChildrenIds.includes(node.id)) {
                return { ...node, hidden: false };
            }
            return node;
        });

        newEdges = newEdges.map((edge) => {
            if (edge.source === nodeId && directChildrenIds.includes(edge.target)) {
                return { ...edge, hidden: false };
            }
            return edge;
        });
    }

    return { nodes: newNodes, edges: newEdges };
};