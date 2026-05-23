import { Handle, Position } from '@xyflow/react';

const STATUS_CONFIG = {
  done:        { bg: '#052e16', border: '#22c55e', accent: '#22c55e', label: 'Hecho' },
  in_progress: { bg: '#1c1502', border: '#ca8a04', accent: '#eab308', label: 'En curso' },
  pending:     { bg: '#111113', border: '#3f3f46', accent: '#71717a', label: 'Pendiente' },
  blocked:     { bg: '#1c0505', border: '#dc2626', accent: '#ef4444', label: 'Bloqueado' },
};

const PRIORITY_BORDER = { high: '#ef4444', medium: '#f97316' };

export default function CustomNode({ data, selected }) {
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
        borderRadius: 10, minWidth: 175, maxWidth: 220,
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

      <div style={{ padding: '10px 10px 10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent, flexShrink: 0, marginTop: 4 }} />
          <span style={{ color: '#fafafa', fontWeight: 600, fontSize: 12.5, lineHeight: 1.35, flex: 1, wordBreak: 'break-word' }}>{data.label}</span>
          <button onClick={e => { e.stopPropagation(); data.onDelete?.(); }} style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: '0 2px', flexShrink: 0 }} title="Eliminar">×</button>
        </div>
        {data.description && (
          <div style={{ color: '#52525b', fontSize: 10.5, marginTop: 5, marginLeft: 14, lineHeight: 1.4 }}>{data.description}</div>
        )}
        <div style={{ marginTop: 8, marginLeft: 14 }}>
          <span style={{ fontSize: 9.5, color: cfg.accent, fontWeight: 600 }}>{cfg.label}</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#27272a', border: '2px solid #3f3f46', width: 10, height: 10 }} />
    </div>
  );
}
