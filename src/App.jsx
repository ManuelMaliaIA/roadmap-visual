import { useState, useCallback } from 'react';
import RoadmapFlow from './components/RoadmapFlow';
import NodeModal from './components/NodeModal';
import EditNodeModal from './components/EditNodeModal';
import StatusPanel from './components/StatusPanel';
import ProjectSidebar from './components/ProjectSidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_PROJECTS } from './data/initialData';
import './App.css';

let nodeCounter = 100;

export default function App() {
  const [projects, setProjects] = useLocalStorage('roadmap-projects', INITIAL_PROJECTS);
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeProject = projects.find(p => p.id === activeId);
  const editingNode = editingNodeId ? activeProject?.nodes.find(n => n.id === editingNodeId) : null;

  const handleAddNode = useCallback(({ label, description, status }) => {
    const id = `custom-${++nodeCounter}`;
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : {
        ...p,
        nodes: [...p.nodes, {
          id, type: 'roadmapNode',
          position: { x: 160 + Math.random() * 280, y: 140 + Math.random() * 180 },
          data: { label, description, status, notes: '', priority: 'medium', updatedAt: new Date().toISOString() },
        }],
      }
    ));
  }, [activeId, setProjects]);

  const handleSaveNode = useCallback((id, updates) => {
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : {
        ...p,
        nodes: p.nodes.map(n => n.id !== id ? n : { ...n, data: { ...n.data, ...updates, updatedAt: new Date().toISOString() } }),
      }
    ));
  }, [activeId, setProjects]);

  const handleStatusChange = useCallback((nodeId, newStatus) => {
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : {
        ...p,
        nodes: p.nodes.map(n => n.id !== nodeId ? n : { ...n, data: { ...n.data, status: newStatus, updatedAt: new Date().toISOString() } }),
      }
    ));
  }, [activeId, setProjects]);

  const handleCreateProject = useCallback((name) => {
    const id = `proj-${Date.now()}`;
    setProjects(prev => [...prev, { id, name, nodes: [], edges: [] }]);
    setActiveId(id);
  }, [setProjects]);

  const handleDeleteProject = useCallback((pid) => {
    if (projects.length <= 1) return;
    const remaining = projects.filter(p => p.id !== pid);
    setProjects(remaining);
    if (activeId === pid) setActiveId(remaining[0].id);
  }, [projects, activeId, setProjects]);

  const handleCreateNodeAt = useCallback((position) => {
    const id = `custom-${++nodeCounter}`;
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : {
        ...p,
        nodes: [...p.nodes, {
          id, type: 'roadmapNode', position,
          data: { label: 'Nuevo paso', description: '', status: 'pending', notes: '', priority: 'medium', updatedAt: new Date().toISOString() },
        }],
      }
    ));
    setEditingNodeId(id);
  }, [activeId, setProjects]);

  const handleRenameProject = useCallback((id, name) => {
    setProjects(prev => prev.map(p => p.id !== id ? p : { ...p, name }));
  }, [setProjects]);

  const handleDuplicateProject = useCallback((id) => {
    const source = projects.find(p => p.id === id);
    if (!source) return;
    const newId = `proj-${Date.now()}`;
    const ts = Date.now();
    const idMap = {};
    const newNodes = source.nodes.map(n => {
      const nid = `${n.id}-c${ts}`;
      idMap[n.id] = nid;
      return { ...n, id: nid };
    });
    const newEdges = source.edges.map(e => ({
      ...e,
      id: `${e.id}-c${ts}`,
      source: idMap[e.source] ?? e.source,
      target: idMap[e.target] ?? e.target,
    }));
    setProjects(prev => [...prev, { id: newId, name: `${source.name} (copia)`, nodes: newNodes, edges: newEdges }]);
    setActiveId(newId);
  }, [projects, setProjects]);

  const handleReset = useCallback(() => {
    if (!window.confirm('¿Resetear todos los proyectos al estado inicial?')) return;
    setProjects(INITIAL_PROJECTS);
    setActiveId(INITIAL_PROJECTS[0].id);
  }, [setProjects]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="logo">Roadmap</span>
          {activeProject && (
            <span className="active-project-name">{activeProject.name}</span>
          )}
        </div>
        <div className="header-right">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Buscar nodo…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Nodo</button>
          <button className="btn btn-ghost" onClick={handleReset} title="Resetear datos">↺</button>
        </div>
      </header>

      {/* Body: proyecto sidebar | canvas | status panel */}
      <div className="body">
        <ProjectSidebar
          projects={projects}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={handleCreateProject}
          onDelete={handleDeleteProject}
          onRename={handleRenameProject}
          onDuplicate={handleDuplicateProject}
        />

        <main className="canvas">
          {activeProject ? (
            <RoadmapFlow
              key={activeProject.id}
              project={activeProject}
              onProjectChange={setProjects}
              onEditNode={setEditingNodeId}
              onCreateAt={handleCreateNodeAt}
              searchQuery={searchQuery}
            />
          ) : (
            <div className="empty">Crea un proyecto desde el panel izquierdo</div>
          )}
        </main>

        {activeProject && (
          <StatusPanel nodes={activeProject.nodes} onStatusChange={handleStatusChange} />
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <NodeModal onClose={() => setShowAddModal(false)} onAdd={handleAddNode} />
      )}

      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onClose={() => setEditingNodeId(null)}
          onSave={updates => {
            handleSaveNode(editingNodeId, updates);
            setEditingNodeId(null);
          }}
        />
      )}
    </div>
  );
}
