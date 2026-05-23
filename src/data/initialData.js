export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'E-Commerce Store',
    nodes: [
      { id: 'n1', type: 'roadmapNode', position: { x: 100, y: 80 }, data: { label: 'Diseño UI/UX', status: 'done', description: 'Wireframes y mockups en Figma', notes: '' } },
      { id: 'n2', type: 'roadmapNode', position: { x: 350, y: 80 }, data: { label: 'Setup Proyecto', status: 'done', description: 'Vite + React + TypeScript', notes: '' } },
      { id: 'n3', type: 'roadmapNode', position: { x: 600, y: 80 }, data: { label: 'Catálogo de Productos', status: 'in_progress', description: 'Listado, filtros y búsqueda', notes: 'Pendiente decidir si usar React Query o Zustand para el estado global del catálogo.' } },
      { id: 'n4', type: 'roadmapNode', position: { x: 600, y: 240 }, data: { label: 'Carrito de Compras', status: 'pending', description: 'Gestión de items y cantidades', notes: '' } },
      { id: 'n5', type: 'roadmapNode', position: { x: 350, y: 240 }, data: { label: 'Pasarela de Pago', status: 'blocked', description: 'Integración Stripe', notes: 'Bloqueado por falta de credenciales de Stripe en producción. Contactar con el equipo de finanzas.' } },
      { id: 'n6', type: 'roadmapNode', position: { x: 100, y: 240 }, data: { label: 'Deploy Producción', status: 'pending', description: 'Vercel + CI/CD pipeline', notes: '' } },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2' },
      { id: 'e2-3', source: 'n2', target: 'n3' },
      { id: 'e3-4', source: 'n3', target: 'n4' },
      { id: 'e4-5', source: 'n4', target: 'n5' },
      { id: 'e5-6', source: 'n5', target: 'n6' },
    ],
  },
  {
    id: 'proj-2',
    name: 'Dashboard Analytics',
    nodes: [
      { id: 'm1', type: 'roadmapNode', position: { x: 100, y: 80 }, data: { label: 'Requisitos & Specs', status: 'done', description: 'Definición de KPIs y métricas clave', notes: '' } },
      { id: 'm2', type: 'roadmapNode', position: { x: 350, y: 80 }, data: { label: 'Modelo de Datos', status: 'done', description: 'Esquema BD + relaciones', notes: '' } },
      { id: 'm3', type: 'roadmapNode', position: { x: 600, y: 80 }, data: { label: 'API Backend', status: 'done', description: 'Endpoints REST con Node + Express', notes: '' } },
      { id: 'm4', type: 'roadmapNode', position: { x: 600, y: 240 }, data: { label: 'Gráficas & Charts', status: 'in_progress', description: 'Recharts — líneas, barras, pie', notes: 'Revisar si Recharts o Victory Charts tiene mejor soporte para tooltips personalizados.' } },
      { id: 'm5', type: 'roadmapNode', position: { x: 350, y: 240 }, data: { label: 'Filtros Temporales', status: 'pending', description: 'Rango de fechas y comparativas', notes: '' } },
      { id: 'm6', type: 'roadmapNode', position: { x: 100, y: 240 }, data: { label: 'Exportar Reportes', status: 'pending', description: 'PDF y CSV desde el dashboard', notes: '' } },
    ],
    edges: [
      { id: 'em1-2', source: 'm1', target: 'm2' },
      { id: 'em2-3', source: 'm2', target: 'm3' },
      { id: 'em3-4', source: 'm3', target: 'm4' },
      { id: 'em4-5', source: 'm4', target: 'm5' },
      { id: 'em5-6', source: 'm5', target: 'm6' },
    ],
  },
];
