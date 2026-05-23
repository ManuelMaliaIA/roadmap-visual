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
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#1e293b', borderRadius: 12, padding: 28, width: 360,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid #334155',
        }}
      >
        <h3 style={{ margin: '0 0 20px', color: '#f1f5f9', fontSize: 16 }}>Añadir nodo</h3>

        <label style={labelStyle}>Nombre del paso</label>
        <input
          autoFocus
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="ej. Diseño UI/UX"
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Descripción (opcional)</label>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="ej. Wireframes en Figma"
          style={inputStyle}
        />

        <label style={labelStyle}>Estado inicial</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En curso</option>
          <option value="done">Hecho</option>
          <option value="blocked">Bloqueado</option>
        </select>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancelar</button>
          <button type="submit" style={submitBtnStyle}>Añadir</button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 4, marginTop: 14 };
const inputStyle = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: 6, padding: '8px 10px', color: '#f1f5f9', fontSize: 13,
  boxSizing: 'border-box', outline: 'none',
};
const cancelBtnStyle = {
  flex: 1, padding: '9px 0', background: '#334155', border: 'none',
  borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: 13,
};
const submitBtnStyle = {
  flex: 2, padding: '9px 0', background: '#3b82f6', border: 'none',
  borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700,
};
