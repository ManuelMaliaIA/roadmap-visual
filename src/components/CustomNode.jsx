import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { timeAgo } from '../utils/time';

const STATUS_CONFIG = {
  done:        { bg: '#022c22', border: '#10b981', accent: '#10b981', label: 'Hecho' },
  in_progress: { bg: '#071e26', border: '#06b6d4', accent: '#06b6d4', label: 'En curso' },
  pending:     { bg: '#0d1117', border: '#334155', accent: '#64748b', label: 'Pendiente' },
  blocked:     { bg: '#1f0a0e', border: '#f43f5e', accent: '#f43f5e', label: 'Bloqueado' },
};

const PRIORITY_BORDER = { high: '#f43f5e', medium: '#f97316', low: null };

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
        border: `1.5px solid ${isNext ? '#0d9488' : selected ? '#06b6d4' : cfg.border}`,
        borderLeft: priorityColor ? `4px solid ${priorityColor}` : undefined,
        borderRadius: 10, minWidth: 185, maxWidth: 225,
        boxShadow: isNext
          ? '0 0 0 2px #080c0c, 0 0 0 4px #0d9488, 0 12px 40px rgba(13,148,136,0.3)'
          : selected ? '0 0 0 2px #06b6d4' : '0 2px 14px rgba(0,0,0,0.5)',
        cursor: 'grab', position: 'relative', userSelect: 'none', transition: 'box-shadow 0.2s',
      }}
    >
      {isNext && (
        <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', background: '#0d9488', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>
          ★ SIGUIENTE ACCIÓN
        </div>
      )}
      <Handle type="target" position={Position.Left} style={{ background: '#0f2020', border: '2px solid #1e3a3a', width: 10, height: 10 }} />

      <div style={{ padding: '10px 10px 8px 12px', borderBottom: `1px solid ${cfg.border}30` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent, flexShrink: 0, marginTop: 4 }} />
          <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 12.5, lineHeight: 1.35, flex: 1, wordBreak: 'break-word' }}>{data.label}</span>
          <button onClick={e => { e.stopPropagation(); data.onDelete?.(); }} style={{ background: 'none', border: 'none', color: '#1e3a3a', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 2px', flexShrink: 0 }} title="Eliminar">×</button>
        </div>
        {data.description && <div style={{ color: '#4b7280', fontSize: 10.5, marginTop: 4, marginLeft: 14, lineHeight: 1.4 }}>{data.description}</div>}
      </div>

      <div style={{ padding: '6px 12px 4px' }}>
        <button onClick={e => { e.stopPropagation(); setNotesOpen(x => !x); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: data.notes ? '#64748b' : '#1e3a3a', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 8 }}>{notesOpen ? '▾' : '▸'}</span>
          {data.notes ? 'Ver notas' : 'Añadir notas'}
        </button>
        {notesOpen && (
          <div onDoubleClick={e => { e.stopPropagation(); data.onEdit?.(); }} style={{ marginTop: 6, color: '#4b7280', fontSize: 10.5, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'text' }}>
            {data.notes || <em style={{ color: '#1e3a3a' }}>Sin notas — doble clic para editar</em>}
          </div>
        )}
      </div>

      <div style={{ padding: '4px 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9.5, color: cfg.accent, fontWeight: 600 }}><span style={{ opacity: 0.7 }}>● </span>{cfg.label}</span>
        {priorityColor && <span style={{ fontSize: 9, color: priorityColor, fontWeight: 600 }}>{data.priority === 'high' ? '↑ Alta' : '→ Media'}</span>}
        {data.updatedAt && <span style={{ marginLeft: 'auto', fontSize: 9, color: '#1e3a3a' }}>{timeAgo(data.updatedAt)}</span>}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#0f2020', border: '2px solid #1e3a3a', width: 10, height: 10 }} />
    </div>
  );
}
