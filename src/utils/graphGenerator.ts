import dagre from 'dagre';
import { Position, type Node, type Edge } from 'reactflow';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 100;

const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    existingNodesMap: Map<string, { x: number, y: number }>,
    direction: 'LR' | 'TB',
    shouldPreserveLocation: boolean // Nuovo flag!
) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // Impostiamo la direzione dinamica
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        // Se dobbiamo preservare la posizione (es. aggiornamento dati), usiamo la vecchia.
        // Se stiamo ruotando (shouldPreserveLocation = false), ricalcoliamo tutto.
        const oldPos = existingNodesMap.get(node.id);

        if (shouldPreserveLocation && oldPos) {
            return {
                ...node,
                // Aggiorniamo comunque le "maniglie" (punti di connessione)
                targetPosition: direction === 'LR' ? Position.Left : Position.Top,
                sourcePosition: direction === 'LR' ? Position.Right : Position.Bottom,
                position: { x: oldPos.x, y: oldPos.y },
            };
        }

        // Calcolo nuova posizione (+400px solo se orizzontale, altrimenti +100 per verticale)
        const nodeWithPosition = dagreGraph.node(node.id);
        const offsetX = direction === 'LR' ? 400 : 100;

        return {
            ...node,
            targetPosition: direction === 'LR' ? Position.Left : Position.Top,
            sourcePosition: direction === 'LR' ? Position.Right : Position.Bottom,
            position: {
                x: nodeWithPosition.x - NODE_WIDTH / 2 + offsetX,
                y: nodeWithPosition.y - NODE_HEIGHT / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

// --- MAIN FUNCTION ---
export const jsonToGraph = (
    jsonString: string,
    currentNodes: Node[] = [],
    direction: 'LR' | 'TB' = 'LR', // Parametro direzione
    preserveLocation: boolean = true // Parametro memoria
) => {
    let data;
    try {
        data = JSON.parse(jsonString);
    } catch (e) {
        console.error("JSON Non valido", e);
        return { nodes: [], edges: [] };
    }

    const existingNodesMap = new Map(
        currentNodes.map((n) => [n.id, { x: n.position.x, y: n.position.y }])
    );

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const traverse = (obj: any, parentPath: string | null = null, myKey: string = 'root') => {
        const currentPath = parentPath ? `${parentPath}.${myKey}` : myKey;
        const isObject = typeof obj === 'object' && obj !== null;
        const isArray = Array.isArray(obj);

        let displayValue = '';
        if (isArray) displayValue = `[Array: ${obj.length}]`;
        else if (isObject) displayValue = '{Object}';
        else displayValue = String(obj);

        nodes.push({
            id: currentPath,
            type: 'custom',
            data: { label: myKey, value: displayValue },
            position: { x: 0, y: 0 },
        });

        if (parentPath !== null) {
            edges.push({
                id: `e-${parentPath}-${currentPath}`,
                source: parentPath,
                target: currentPath,
                animated: true,
                style: { stroke: '#6366f1' },
            });
        }

        if (isObject) {
            Object.entries(obj).forEach(([key, value]) => traverse(value, currentPath, key));
        }
    };

    traverse(data);

    return getLayoutedElements(nodes, edges, existingNodesMap, direction, preserveLocation);
};