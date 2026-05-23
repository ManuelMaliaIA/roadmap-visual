import { useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'done',        label: 'Hecho' },
  { value: 'in_progress', label: 'En curso' },
  { value: 'pending',     label: 'Pendiente' },
  { value: 'blocked',     label: 'Bloqueado' },
];

const PRIORITY_OPTIONS = [
  { value: 'high',   label: '↑ Alta',  color: '#ef4444' },
  { value: 'medium', label: '→ Media', color: '#f97316' },
  { value: 'low',    label: '↓ Baja',  color: '#52525b' },
];

export default function EditNodeModal({ node, onClose, onSave }) {
  const [label, setLabel] = useState(node.data.label);
  const [description, setDescription] = useState(node.data.description ?? '');
  const [notes, setNotes] = useState(node.data.notes ?? '');
  const [status, setStatus] = useState(node.data.status);
  const [priority, setPriority] = useState(node.data.priority ?? 'low');

  function handleSubmit(e) {
    e.preventDefault();
    if (!label.trim()) return;
    onSave({ label: label.trim(), description: description.trim(), notes, status, priority });
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: '#111113', border: '1px solid #27272a', borderRadius: 14, padding: 28, width: 420, boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}>
        <h3 style={{ margin: '0 0 22px', color: '#fafafa', fontSize: 15, fontWeight: 700 }}>Editar nodo</h3>

        <label style={lbl}>Nombre</label>
        <input autoFocus value={label} onChange={e => setLabel(e.target.value)} style={inp} required />

        <label style={lbl}>Descripción corta</label>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Subtítulo visible en la tarjeta" style={inp} />

        <label style={lbl}>Estado</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={inp}>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <label style={lbl}>Prioridad</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {PRIORITY_OPTIONS.map(o => (
            <button key={o.value} type="button" onClick={() => setPriority(o.value)}
              style={{ flex: 1, padding: '8px 0', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 600, background: priority === o.value ? `${o.color}20` : '#0c0c0e', border: `1.5px solid ${priority === o.value ? o.color : '#27272a'}`, color: priority === o.value ? o.color : '#52525b', transition: 'all 0.12s' }}
            >{o.label}</button>
          ))}
        </div>

        <label style={lbl}>Notas</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Apuntes, recordatorios, detalles…"
          style={{ ...inp, resize: 'vertical', minHeight: 90, lineHeight: 1.5 }} />

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button type="button" onClick={onClose}
            style={{ flex: 1, padding: '9px 0', background: '#18181b', border: '1px solid #27272a', borderRadius: 7, color: '#71717a', cursor: 'pointer', fontSize: 13 }}>
            Cancelar
          </button>
          <button type="submit"
            style={{ flex: 2, padding: '9px 0', background: '#7c3aed', border: 'none', borderRadius: 7, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

const lbl = { display: 'block', color: '#52525b', fontSize: 11, marginBottom: 5, marginTop: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' };
const inp = { width: '100%', background: '#0c0c0e', border: '1px solid #27272a', borderRadius: 7, padding: '9px 12px', color: '#fafafa', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
