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
      <div style={{
        width: 36, background: '#060a0a', borderRight: '1px solid #0f2020',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '10px 0', gap: 8, flexShrink: 0,
      }}>
        <button onClick={() => setCollapsed(false)} title="Expandir proyectos" style={iconBtn}>›</button>
        {projects.map(p => (
          <div key={p.id} onClick={() => onSelect(p.id)} title={p.name}
            style={{ width: 6, height: 6, borderRadius: '50%', cursor: 'pointer', background: p.id === activeId ? '#06b6d4' : '#0f2828', transition: 'background 0.15s' }}
          />
        ))}
      </div>
    );
  }

  return (
    <aside style={{
      width: 210, background: '#060a0a', borderRight: '1px solid #0f2020',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '13px 12px 10px', borderBottom: '1px solid #0f2020', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#1e4040', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>
          Proyectos
        </span>
        <button onClick={() => setCollapsed(true)} style={iconBtn} title="Colapsar">‹</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: p.id === activeId ? '#071e1e' : 'transparent',
              borderLeft: `2px solid ${p.id === activeId ? '#06b6d4' : 'transparent'}`,
              cursor: 'pointer', transition: 'background 0.12s',
            }}
          >
            <span style={{
              flex: 1, fontSize: 12.5,
              color: p.id === activeId ? '#e2e8f0' : '#4b7280',
              fontWeight: p.id === activeId ? 600 : 400,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {p.name}
            </span>
            {projects.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); onDelete(p.id); }}
                style={{ background: 'none', border: 'none', color: '#1e4040', cursor: 'pointer', fontSize: 14, padding: '0 2px', lineHeight: 1, flexShrink: 0 }}
                title="Eliminar proyecto"
              >×</button>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 10px 12px', borderTop: '1px solid #0f2020', flexShrink: 0 }}>
        {adding ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              autoFocus value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setAdding(false); setNewName(''); } }}
              placeholder="Nombre…"
              style={{ flex: 1, background: '#0a1414', border: '1px solid #0f2828', borderRadius: 6, padding: '6px 8px', color: '#e2e8f0', fontSize: 12, outline: 'none', minWidth: 0 }}
            />
            <button onClick={handleCreate} style={{ ...iconBtn, color: '#06b6d4', fontSize: 16 }}>✓</button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            style={{ width: '100%', background: 'none', border: '1px dashed #0f2828', borderRadius: 6, padding: '7px 0', color: '#1e4040', cursor: 'pointer', fontSize: 12, transition: 'color 0.12s, border-color 0.12s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#06b6d4'; e.currentTarget.style.borderColor = '#0d9488'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#1e4040'; e.currentTarget.style.borderColor = '#0f2828'; }}
          >
            + Nuevo proyecto
          </button>
        )}
      </div>
    </aside>
  );
}

const iconBtn = {
  background: 'none', border: 'none', color: '#1e4040', cursor: 'pointer',
  fontSize: 18, padding: '0 4px', lineHeight: 1, display: 'flex', alignItems: 'center',
};
