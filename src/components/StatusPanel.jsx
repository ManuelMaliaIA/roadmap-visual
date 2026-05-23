import { useState } from 'react';

const COLS = [
  { status: 'done',        label: 'Hecho',     color: '#10b981', dim: '#f0fdf4' },
  { status: 'in_progress', label: 'En curso',  color: '#06b6d4', dim: '#ecfeff' },
  { status: 'pending',     label: 'Pendiente', color: '#94a3b8', dim: '#f8fafc' },
  { status: 'blocked',     label: 'Bloqueado', color: '#f43f5e', dim: '#fff1f2' },
];

const iconBtn = { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, padding: '0 4px', lineHeight: 1, display: 'flex', alignItems: 'center' };

export default function StatusPanel({ nodes, onStatusChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [overStatus, setOverStatus] = useState(null);

  const grouped = Object.fromEntries(COLS.map(c => [c.status, nodes.filter(n => n.data.status === c.status)]));

  if (collapsed) {
    return (
      <div style={{ width: 36, background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 8, flexShrink: 0 }}>
        <button onClick={() => setCollapsed(false)} style={iconBtn} title="Expandir">‹</button>
        {COLS.map(({ status, color }) => (
          <div key={status} title={`${grouped[status].length} en ${status}`}
            style={{ width: 6, height: 6, borderRadius: '50%', background: grouped[status].length > 0 ? color : '#e2e8f0' }} />
        ))}
      </div>
    );
  }

  return (
    <aside style={{ width: 192, background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '13px 12px 10px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <button onClick={() => setCollapsed(true)} style={iconBtn} title="Colapsar">›</button>
        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 6 }}>Estados</span>
      </div>

      {COLS.map(({ status, label, color, dim }) => (
        <div key={status}
          onDrop={e => { e.preventDefault(); if (draggingId) onStatusChange(draggingId, status); setDraggingId(null); setOverStatus(null); }}
          onDragOver={e => { e.preventDefault(); setOverStatus(status); }}
          onDragLeave={() => setOverStatus(null)}
          style={{ flex: 1, minHeight: 90, borderLeft: `2px solid ${overStatus === status ? color : 'transparent'}`, background: overStatus === status ? dim : 'transparent', transition: 'background 0.12s, border-color 0.12s', padding: '8px 10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color, fontWeight: 600 }}>{label}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#cbd5e1' }}>{grouped[status].length}</span>
          </div>

          {grouped[status].map(node => (
            <div key={node.id} draggable
              onDragStart={e => { setDraggingId(node.id); e.dataTransfer.effectAllowed = 'move'; }}
              onDragEnd={() => { setDraggingId(null); setOverStatus(null); }}
              style={{ background: draggingId === node.id ? dim : '#fff', border: `1px solid ${draggingId === node.id ? color : '#e2e8f0'}`, borderRadius: 5, padding: '5px 8px', marginBottom: 4, fontSize: 11, color: draggingId === node.id ? color : '#64748b', cursor: 'grab', opacity: draggingId === node.id ? 0.5 : 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              title={`${node.data.label} — arrastra para cambiar estado`}
            >
              {node.data.label}
            </div>
          ))}

          {grouped[status].length === 0 && (
            <div style={{ border: `1px dashed ${overStatus === status ? color : '#e2e8f0'}`, borderRadius: 5, padding: '8px 6px', textAlign: 'center', fontSize: 10, color: '#cbd5e1' }}>
              Suelta aquí
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
