import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { timeAgo } from '../utils/time';

const STATUS_CONFIG = {
  done:        { bg: '#052e16', border: '#22c55e', accent: '#22c55e', label: 'Hecho' },
  in_progress: { bg: '#1c1502', border: '#ca8a04', accent: '#eab308', label: 'En curso' },
  pending:     { bg: '#111113', border: '#3f3f46', accent: '#71717a', label: 'Pendiente' },
  blocked:     { bg: '#1c0505', border: '#dc2626', accent: '#ef4444', label: 'Bloqueado' },
};

const PRIORITY_BORDER = { high: '#ef4444', medium: '#f97316', low: null };

export default function CustomNode({ data, selected }) {
  const [notesOpen, setNotesOpen] = useState(false);
  const cfg = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.pending;
  const isNext = data.isNextAction;
  const priorityColor = PRIORITY_BORDER[data.priority] ?? null;

  return (
    <div
      onDoubleClick={e => { e.stopPropagation(); data.onEdit?.(); }}
      style={{
        background: cfg.bg,
        border: `1.5px solid ${isNext ? '#7c3aed' : selected ? '#6366f1' : cfg.border}`,
        borderLeft: priorityColor ? `4px solid ${priorityColor}` : undefined,
        borderRadius: 10, minWidth: 185, maxWidth: 225,
        boxShadow: isNext
          ? '0 0 0 2px #09090b, 0 0 0 4px #7c3aed, 0 12px 40px rgba(124,58,237,0.3)'
          : selected ? '0 0 0 2px #6366f1' : '0 2px 14px rgba(0,0,0,0.5)',
        cursor: 'grab', position: 'relative', userSelect: 'none', transition: 'box-shadow 0.2s',
      }}
    >
      {isNext && (
        <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', background: '#7c3aed', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>
          ★ SIGUIENTE ACCIÓN
        </div>
      )}

      <Handle type="target" position={Position.Left} style={{ background: '#27272a', border: '2px solid #3f3f46', width: 10, height: 10 }} />

      <div style={{ padding: '10px 10px 8px 12px', borderBottom: `1px solid ${cfg.border}30` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent, flexShrink: 0, marginTop: 4 }} />
          <span style={{ color: '#fafafa', fontWeight: 600, fontSize: 12.5, lineHeight: 1.35, flex: 1, wordBreak: 'break-word' }}>{data.label}</span>
          <button onClick={e => { e.stopPropagation(); data.onDelete?.(); }} style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 2px', flexShrink: 0 }} title="Eliminar">×</button>
        </div>
        {data.description && <div style={{ color: '#71717a', fontSize: 10.5, marginTop: 4, marginLeft: 14, lineHeight: 1.4 }}>{data.description}</div>}
      </div>

      <div style={{ padding: '6px 12px 4px' }}>
        <button onClick={e => { e.stopPropagation(); setNotesOpen(x => !x); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: data.notes ? '#a1a1aa' : '#3f3f46', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 8 }}>{notesOpen ? '▾' : '▸'}</span>
          {data.notes ? 'Ver notas' : 'Añadir notas'}
        </button>
        {notesOpen && (
          <div onDoubleClick={e => { e.stopPropagation(); data.onEdit?.(); }} style={{ marginTop: 6, color: '#71717a', fontSize: 10.5, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'text' }}>
            {data.notes || <em style={{ color: '#27272a' }}>Sin notas — doble clic para editar</em>}
          </div>
        )}
      </div>

      <div style={{ padding: '4px 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9.5, color: cfg.accent, fontWeight: 600 }}><span style={{ opacity: 0.7 }}>● </span>{cfg.label}</span>
        {priorityColor && <span style={{ fontSize: 9, color: priorityColor, fontWeight: 600 }}>{data.priority === 'high' ? '↑ Alta' : '→ Media'}</span>}
        {data.updatedAt && <span style={{ marginLeft: 'auto', fontSize: 9, color: '#27272a' }}>{timeAgo(data.updatedAt)}</span>}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#27272a', border: '2px solid #3f3f46', width: 10, height: 10 }} />
    </div>
  );
}
