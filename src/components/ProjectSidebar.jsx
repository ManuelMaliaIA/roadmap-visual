import { useState } from 'react';

export default function ProjectSidebar({ projects, activeId, onSelect, onCreate, onDelete }) {
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    onCreate(name);
    setNewName('');
    setAdding(false);
  }

  if (collapsed) {
    return (
      <div style={{ width: 36, background: '#e8f2f2', borderRight: '1px solid #cde0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 8, flexShrink: 0 }}>
        <button onClick={() => setCollapsed(false)} title="Expandir" style={iconBtn}>›</button>
        {projects.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)} title={p.name}
            style={{ width: 6, height: 6, borderRadius: '50%', cursor: 'pointer', background: p.id === activeId ? '#06b6d4' : '#cbd5e1' }} />
        ))}
      </div>
    );
  }

  return (
    <aside style={{ width: 210, background: '#e8f2f2', borderRight: '1px solid #cde0e0', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '13px 12px 10px', borderBottom: '1px solid #cde0e0', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>Proyectos</span>
        <button onClick={() => setCollapsed(true)} style={iconBtn} title="Colapsar">‹</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
        {projects.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: p.id === activeId ? '#ecfeff' : 'transparent', borderLeft: `2px solid ${p.id === activeId ? '#06b6d4' : 'transparent'}`, cursor: 'pointer', transition: 'background 0.12s' }}
          >
            <span style={{ flex: 1, fontSize: 12.5, color: p.id === activeId ? '#0e7490' : '#64748b', fontWeight: p.id === activeId ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.name}
            </span>
            {projects.length > 1 && (
              <button onClick={e => { e.stopPropagation(); onDelete(p.id); }} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 14, padding: '0 2px', lineHeight: 1 }} title="Eliminar">×</button>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 10px 12px', borderTop: '1px solid #cde0e0', flexShrink: 0 }}>
        {adding ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setAdding(false); setNewName(''); } }}
              placeholder="Nombre…"
              style={{ flex: 1, background: '#deeaea', border: '1px solid #cde0e0', borderRadius: 6, padding: '6px 8px', color: '#334155', fontSize: 12, outline: 'none', minWidth: 0 }}
            />
            <button onClick={handleCreate} style={{ ...iconBtn, color: '#06b6d4', fontSize: 16 }}>✓</button>
          </div>
        ) : (
          <button onClick={() => setAdding(true)}
            style={{ width: '100%', background: 'none', border: '1px dashed #cbd5e1', borderRadius: 6, padding: '7px 0', color: '#94a3b8', cursor: 'pointer', fontSize: 12, transition: 'color 0.12s, border-color 0.12s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#06b6d4'; e.currentTarget.style.borderColor = '#06b6d4'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
          >
            + Nuevo proyecto
          </button>
        )}
      </div>
    </aside>
  );
}

const iconBtn = { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, padding: '0 4px', lineHeight: 1, display: 'flex', alignItems: 'center' };
