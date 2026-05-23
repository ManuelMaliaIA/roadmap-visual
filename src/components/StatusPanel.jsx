import { useState } from 'react';

const COLS = [
  { status: 'done',        label: 'Hecho',     color: '#22c55e', dim: '#052e16' },
  { status: 'in_progress', label: 'En curso',  color: '#eab308', dim: '#1c1502' },
  { status: 'pending',     label: 'Pendiente', color: '#71717a', dim: '#111113' },
  { status: 'blocked',     label: 'Bloqueado', color: '#ef4444', dim: '#1c0505' },
];

export default function StatusPanel({ nodes, onStatusChange }) {
  const [draggingId, setDraggingId] = useState(null);
  const [overStatus, setOverStatus] = useState(null);

  const grouped = Object.fromEntries(
    COLS.map(c => [c.status, nodes.filter(n => n.data.status === c.status)])
  );

  return (
    <aside style={{
      width: 192,
      background: '#0c0c0e',
      borderRight: '1px solid #1c1c1f',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
    }}>
      <div style={{ padding: '14px 14px 6px', fontSize: 10, color: '#3f3f46', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Estados
      </div>

      {COLS.map(({ status, label, color, dim }) => (
        <div
          key={status}
          onDrop={e => {
            e.preventDefault();
            if (draggingId) onStatusChange(draggingId, status);
            setDraggingId(null);
            setOverStatus(null);
          }}
          onDragOver={e => { e.preventDefault(); setOverStatus(status); }}
          onDragLeave={() => setOverStatus(null)}
          style={{
            flex: 1,
            minHeight: 90,
            borderLeft: `2px solid ${overStatus === status ? color : 'transparent'}`,
            background: overStatus === status ? dim : 'transparent',
            transition: 'background 0.12s, border-color 0.12s',
            padding: '8px 10px',
          }}
        >
          {/* Column header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color, fontWeight: 600 }}>{label}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#3f3f46' }}>
              {grouped[status].length}
            </span>
          </div>

          {/* Node chips */}
          {grouped[status].map(node => (
            <div
              key={node.id}
              draggable
              onDragStart={e => {
                setDraggingId(node.id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={() => { setDraggingId(null); setOverStatus(null); }}
              style={{
                background: draggingId === node.id ? dim : '#18181b',
                border: `1px solid ${draggingId === node.id ? color : '#27272a'}`,
                borderRadius: 5,
                padding: '5px 8px',
                marginBottom: 4,
                fontSize: 11,
                color: draggingId === node.id ? color : '#a1a1aa',
                cursor: 'grab',
                opacity: draggingId === node.id ? 0.5 : 1,
                transition: 'opacity 0.1s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={`${node.data.label} — arrastra a otra columna para cambiar estado`}
            >
              {node.data.label}
            </div>
          ))}

          {grouped[status].length === 0 && (
            <div style={{
              border: `1px dashed ${overStatus === status ? color : '#27272a'}`,
              borderRadius: 5, padding: '8px 6px', textAlign: 'center',
              fontSize: 10, color: '#3f3f46',
            }}>
              Suelta aquí
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
