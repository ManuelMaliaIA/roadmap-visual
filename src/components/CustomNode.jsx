import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { timeAgo } from '../utils/time';

const STATUS_CONFIG = {
  done:        { bg: '#f0fdf4', border: '#10b981', accent: '#059669', text: '#064e3b', sub: '#6ee7b7' },
  in_progress: { bg: '#ecfeff', border: '#06b6d4', accent: '#0891b2', text: '#164e63', sub: '#67e8f9' },
  pending:     { bg: '#f8fafc', border: '#cbd5e1', accent: '#64748b', text: '#334155', sub: '#94a3b8' },
  blocked:     { bg: '#fff1f2', border: '#f43f5e', accent: '#e11d48', text: '#881337', sub: '#fda4af' },
};

const PRIORITY_BORDER = {
  high:   '#f43f5e',
  medium: '#f97316',
  low:    null,
};

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
        borderLeft: priorityColor ? `4px solid ${priorityColor}` : `4px solid ${cfg.border}`,
        borderRadius: 10,
        minWidth: 185,
        maxWidth: 225,
        boxShadow: isNext
          ? `0 0 0 3px #0d948840, 0 8px 32px rgba(13,148,136,0.2), 0 2px 8px rgba(0,0,0,0.08)`
          : selected
          ? `0 0 0 2px #06b6d440, 0 2px 8px rgba(0,0,0,0.08)`
          : '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        cursor: 'grab',
        position: 'relative',
        userSelect: 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      {isNext && (
        <div style={{
          position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
          background: '#0d9488', color: '#fff', fontSize: 9, fontWeight: 700,
          padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.08em',
        }}>
          ★ SIGUIENTE ACCIÓN
        </div>
      )}

      <Handle type="target" position={Position.Left}
        style={{ background: '#fff', border: `2px solid ${cfg.border}`, width: 10, height: 10 }} />

      {/* Header */}
      <div style={{ padding: '10px 10px 8px 12px', borderBottom: `1px solid ${cfg.border}40` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent, flexShrink: 0, marginTop: 4 }} />
          <span style={{ color: cfg.text, fontWeight: 700, fontSize: 12.5, lineHeight: 1.35, flex: 1, wordBreak: 'break-word' }}>
            {data.label}
          </span>
          <button
            onClick={e => { e.stopPropagation(); data.onDelete?.(); }}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 2px', flexShrink: 0 }}
            title="Eliminar nodo"
          >×</button>
        </div>
        {data.description && (
          <div style={{ color: cfg.accent, fontSize: 10.5, marginTop: 4, marginLeft: 14, lineHeight: 1.4, opacity: 0.8 }}>
            {data.description}
          </div>
        )}
      </div>

      {/* Notes */}
      <div style={{ padding: '6px 12px 4px' }}>
        <button
          onClick={e => { e.stopPropagation(); setNotesOpen(x => !x); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: data.notes ? cfg.accent : '#cbd5e1', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <span style={{ fontSize: 8 }}>{notesOpen ? '▾' : '▸'}</span>
          {data.notes ? 'Ver notas' : 'Añadir notas'}
        </button>
        {notesOpen && (
          <div
            style={{ marginTop: 6, color: '#64748b', fontSize: 10.5, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word', cursor: 'text' }}
            onDoubleClick={e => { e.stopPropagation(); data.onEdit?.(); }}
          >
            {data.notes || <em style={{ color: '#e2e8f0' }}>Sin notas — doble clic para editar</em>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '4px 12px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9.5, color: cfg.accent, fontWeight: 600 }}>
          <span style={{ opacity: 0.6 }}>● </span>{cfg.label}
        </span>
        {priorityColor && (
          <span style={{ fontSize: 9, color: priorityColor, fontWeight: 700 }}>
            {data.priority === 'high' ? '↑ Alta' : '→ Media'}
          </span>
        )}
        {data.updatedAt && (
          <span style={{ marginLeft: 'auto', fontSize: 9, color: '#cbd5e1' }}>
            {timeAgo(data.updatedAt)}
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Right}
        style={{ background: '#fff', border: `2px solid ${cfg.border}`, width: 10, height: 10 }} />
    </div>
  );
}
