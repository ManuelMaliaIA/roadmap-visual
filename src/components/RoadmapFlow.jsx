import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

function PaneDoubleClick({ onCreateAt }) {
  const { screenToFlowPosition } = useReactFlow();
  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      onDoubleClick={e => {
        if (e.target.closest('.react-flow__node')) return;
        onCreateAt(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
      }}
    />
  );
}

const nodeTypes = { roadmapNode: CustomNode };

function findNextActionId(nodes, edges) {
  const prevMap = {};
  edges.forEach(e => {
    if (!prevMap[e.target]) prevMap[e.target] = [];
    prevMap[e.target].push(e.source);
  });
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  for (const node of nodes) {
    if (node.data.status !== 'pending') continue;
    const preds = prevMap[node.id] ?? [];
    if (preds.every(pid => byId[pid]?.data?.status === 'done')) return node.id;
  }
  return null;
}

export default function RoadmapFlow({ project, onProjectChange, onEditNode, onCreateAt, searchQuery }) {
  const enrichedNodes = useMemo(() => {
    const nextId = findNextActionId(project.nodes, project.edges);
    const q = searchQuery?.trim().toLowerCase();
    return project.nodes
      .filter(n => !q || n.data.label.toLowerCase().includes(q) || n.data.description?.toLowerCase().includes(q))
      .map(n => ({
        ...n,
        data: {
          ...n.data,
          isNextAction: n.id === nextId,
          onEdit: () => onEditNode(n.id),
          onDelete: () => onProjectChange(prev => prev.map(p =>
            p.id !== project.id ? p : {
              ...p,
              nodes: p.nodes.filter(node => node.id !== n.id),
              edges: p.edges.filter(e => e.source !== n.id && e.target !== n.id),
            }
          )),
        },
      }));
  }, [project, onProjectChange, onEditNode, searchQuery]);

  const [nodes, setNodes, onNodesChange] = useNodesState(enrichedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(project.edges);

  useEffect(() => { setNodes(enrichedNodes); }, [enrichedNodes]);
  useEffect(() => { setEdges(project.edges); }, [project.edges]);

  const onConnect = useCallback(params => {
    const newEdge = { ...params, id: `e${params.source}-${params.target}` };
    setEdges(eds => addEdge(newEdge, eds));
    onProjectChange(prev => prev.map(p =>
      p.id !== project.id ? p : { ...p, edges: addEdge(newEdge, p.edges) }
    ));
  }, [project.id, onProjectChange]);

  const onNodeDragStop = useCallback((_, node) => {
    onProjectChange(prev => prev.map(p =>
      p.id !== project.id ? p : {
        ...p,
        nodes: p.nodes.map(n => n.id !== node.id ? n : { ...n, position: node.position }),
      }
    ));
  }, [project.id, onProjectChange]);

  const stats = useMemo(() => {
    const total = project.nodes.length;
    const done = project.nodes.filter(n => n.data.status === 'done').length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [project.nodes]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Progress bar */}
      <div style={{ padding: '8px 18px', background: '#060a0a', borderBottom: '1px solid #0f2020', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ color: '#1e4040', fontSize: 11 }}>
            <strong style={{ color: '#94a3b8' }}>{stats.done}/{stats.total}</strong> completados
          </span>
          <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: 11 }}>{stats.pct}%</span>
        </div>
        <div style={{ background: '#0a1a1a', borderRadius: 99, height: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${stats.pct}%`,
            background: 'linear-gradient(90deg, #0d9488, #06b6d4)',
            borderRadius: 99, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Flow canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{
            style: { stroke: '#3f3f46', strokeWidth: 2 },
            markerEnd: { type: 'arrowclosed', color: '#3f3f46' },
          }}
        >
          {onCreateAt && <PaneDoubleClick onCreateAt={onCreateAt} />}
          <Background color="#0d3030" gap={22} size={1.5} style={{ background: '#080c0c' }} />
          <Controls style={{ background: '#0a1414', border: '1px solid #0f2828', borderRadius: 8 }} />
          <MiniMap
            nodeColor={n => {
              if (n.data?.status === 'done') return '#10b981';
              if (n.data?.status === 'in_progress') return '#06b6d4';
              if (n.data?.status === 'blocked') return '#f43f5e';
              return '#334155';
            }}
            style={{ background: '#080c0c', border: '1px solid #0f2020', borderRadius: 8 }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
