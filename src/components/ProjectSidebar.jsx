import { useState } from 'react';

export default function ProjectSidebar({ projects, activeId, onSelect, onCreate, onDelete, onRename, onDuplicate }) {
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    onCreate(name);
    setNewName('');
    setAdding(false);
  }

  function startRename(p) {
    setRenamingId(p.id);
    setRenameValue(p.name);
  }

  function commitRename() {
    const name = renameValue.trim();
    if (name && renamingId) onRename(renamingId, name);
    setRenamingId(null);
    setRenameValue('');
  }

  if (collapsed) {
    return (
      <div style={{ width: 36, background: '#0c0c0e', borderRight: '1px solid #1c1c1f', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 8, flexShrink: 0 }}>
        <button onClick={() => setCollapsed(false)} title="Expandir" style={iconBtn}>›</button>
        {projects.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)} title={p.name}
            style={{ width: 6, height: 6, borderRadius: '50%', cursor: 'pointer', background: p.id === activeId ? '#7c3aed' : '#27272a' }} />
        ))}
      </div>
    );
  }

  return (
    <aside style={{ width: 210, background: '#0c0c0e', borderRight: '1px solid #1c1c1f', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '13px 12px 10px', borderBottom: '1px solid #1c1c1f', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#3f3f46', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>Proyectos</span>
        <button onClick={() => setCollapsed(true)} style={iconBtn} title="Colapsar">‹</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
        {projects.map(p => {
          const isActive = p.id === activeId;
          const isHovered = hoveredId === p.id;
          const isRenaming = renamingId === p.id;
          const showActions = (isActive || isHovered) && !isRenaming;

          return (
            <div key={p.id}
              onClick={() => { if (!isRenaming) onSelect(p.id); }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 8px 8px 12px', background: isActive ? '#18181b' : 'transparent', borderLeft: `2px solid ${isActive ? '#7c3aed' : 'transparent'}`, cursor: 'pointer', transition: 'background 0.12s' }}
            >
              {isRenaming ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); }}
                  onBlur={commitRename}
                  onClick={e => e.stopPropagation()}
                  style={{ flex: 1, background: '#27272a', border: '1px solid #7c3aed', borderRadius: 4, padding: '2px 6px', color: '#fafafa', fontSize: 12, outline: 'none', minWidth: 0 }}
                />
              ) : (
                <span style={{ flex: 1, fontSize: 12.5, color: isActive ? '#fafafa' : '#71717a', fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
              )}

              {showActions && (
                <>
                  <button onClick={e => { e.stopPropagation(); startRename(p); }} title="Renombrar"
                    style={smBtn}>✎</button>
                  <button onClick={e => { e.stopPropagation(); onDuplicate(p.id); }} title="Duplicar"
                    style={smBtn}>⧉</button>
                  {projects.length > 1 && (
                    <button onClick={e => { e.stopPropagation(); onDelete(p.id); }} title="Eliminar"
                      style={smBtn}>×</button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '8px 10px 12px', borderTop: '1px solid #1c1c1f', flexShrink: 0 }}>
        {adding ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setAdding(false); setNewName(''); } }}
              placeholder="Nombre…"
              style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fafafa', fontSize: 12, outline: 'none', minWidth: 0 }}
            />
            <button onClick={handleCreate} style={{ ...iconBtn, color: '#7c3aed', fontSize: 16 }}>✓</button>
          </div>
        ) : (
          <button onClick={() => setAdding(true)}
            style={{ width: '100%', background: 'none', border: '1px dashed #27272a', borderRadius: 6, padding: '7px 0', color: '#3f3f46', cursor: 'pointer', fontSize: 12, transition: 'color 0.12s, border-color 0.12s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = '#52525b'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3f3f46'; e.currentTarget.style.borderColor = '#27272a'; }}
          >
            + Nuevo proyecto
          </button>
        )}
      </div>
    </aside>
  );
}

const iconBtn = { background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: 18, padding: '0 4px', lineHeight: 1, display: 'flex', alignItems: 'center' };
const smBtn   = { background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: 13, padding: '0 2px', lineHeight: 1, flexShrink: 0 };
