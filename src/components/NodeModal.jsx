import { useState } from 'react';

export default function NodeModal({ onClose, onAdd }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  function handleSubmit(e) {
    e.preventDefault();
    if (!label.trim()) return;
    onAdd({ label: label.trim(), description: description.trim(), status });
    onClose();
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: '#111113', border: '1px solid #27272a', borderRadius: 12, padding: 28, width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
        <h3 style={{ margin: '0 0 20px', color: '#fafafa', fontSize: 15, fontWeight: 700 }}>Añadir nodo</h3>

        <label style={lbl}>Nombre del paso</label>
        <input autoFocus value={label} onChange={e => setLabel(e.target.value)} placeholder="ej. Diseño UI/UX" style={inp} required />

        <label style={lbl}>Descripción (opcional)</label>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="ej. Wireframes en Figma" style={inp} />

        <label style={lbl}>Estado inicial</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={inp}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En curso</option>
          <option value="done">Hecho</option>
          <option value="blocked">Bloqueado</option>
        </select>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '9px 0', background: '#18181b', border: '1px solid #27272a', borderRadius: 6, color: '#71717a', cursor: 'pointer', fontSize: 13 }}>Cancelar</button>
          <button type="submit" style={{ flex: 2, padding: '9px 0', background: '#7c3aed', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>Añadir</button>
        </div>
      </form>
    </div>
  );
}

const lbl = { display: 'block', color: '#52525b', fontSize: 11, marginBottom: 5, marginTop: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' };
const inp = { width: '100%', background: '#0c0c0e', border: '1px solid #27272a', borderRadius: 6, padding: '8px 10px', color: '#fafafa', fontSize: 13, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };
