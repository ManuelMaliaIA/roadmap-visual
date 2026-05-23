import { useState, useCallback } from 'react';
import RoadmapFlow from './components/RoadmapFlow';
import NodeModal from './components/NodeModal';
import EditNodeModal from './components/EditNodeModal';
import StatusPanel from './components/StatusPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_PROJECTS } from './data/initialData';
import './App.css';

let nodeCounter = 100;

export default function App() {
  const [projects, setProjects] = useLocalStorage('roadmap-projects', INITIAL_PROJECTS);
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
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

  const handleCreateProject = useCallback(() => {
    const name = newProjectName.trim();
    if (!name) return;
    const id = `proj-${Date.now()}`;
    setProjects(prev => [...prev, { id, name, nodes: [], edges: [] }]);
    setActiveId(id);
    setNewProjectName('');
    setShowNewProjectModal(false);
  }, [newProjectName, setProjects]);

  const handleDeleteProject = useCallback((pid) => {
    if (projects.length <= 1) return;
    const remaining = projects.filter(p => p.id !== pid);
    setProjects(remaining);
    if (activeId === pid) setActiveId(remaining[0].id);
  }, [projects, activeId, setProjects]);

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
          <nav className="tabs">
            {projects.map(p => (
              <div key={p.id} className={`tab ${p.id === activeId ? 'tab-active' : ''}`}>
                <button className="tab-btn" onClick={() => setActiveId(p.id)}>{p.name}</button>
                {projects.length > 1 && (
                  <button className="tab-close" onClick={() => handleDeleteProject(p.id)}>×</button>
                )}
              </div>
            ))}
            <button className="tab-new" onClick={() => setShowNewProjectModal(true)}>+</button>
          </nav>
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

      {/* Body: sidebar + canvas */}
      <div className="body">
        {activeProject && (
          <StatusPanel nodes={activeProject.nodes} onStatusChange={handleStatusChange} />
        )}
        <main className="canvas">
          {activeProject ? (
            <RoadmapFlow
              key={activeProject.id}
              project={activeProject}
              onProjectChange={setProjects}
              onEditNode={setEditingNodeId}
              searchQuery={searchQuery}
            />
          ) : (
            <div className="empty">No hay proyectos. Crea uno con +</div>
          )}
        </main>
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

      {showNewProjectModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Nuevo proyecto</h3>
            <input
              autoFocus value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateProject()}
              placeholder="Nombre del proyecto"
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowNewProjectModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleCreateProject}>Crear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
