const D = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'E-Commerce Store',
    nodes: [
      { id: 'n1', type: 'roadmapNode', position: { x: 100, y: 80 },  data: { label: 'Diseño UI/UX',          status: 'done',        priority: 'high',   description: 'Wireframes y mockups en Figma',          notes: '',                                                                                                                          updatedAt: D(10) } },
      { id: 'n2', type: 'roadmapNode', position: { x: 350, y: 80 },  data: { label: 'Setup Proyecto',         status: 'done',        priority: 'medium', description: 'Vite + React + TypeScript',               notes: '',                                                                                                                          updatedAt: D(8)  } },
      { id: 'n3', type: 'roadmapNode', position: { x: 600, y: 80 },  data: { label: 'Catálogo de Productos',  status: 'in_progress', priority: 'high',   description: 'Listado, filtros y búsqueda',             notes: 'Pendiente decidir si usar React Query o Zustand para el estado global del catálogo.',                                          updatedAt: D(1)  } },
      { id: 'n4', type: 'roadmapNode', position: { x: 600, y: 240 }, data: { label: 'Carrito de Compras',     status: 'pending',     priority: 'medium', description: 'Gestión de items y cantidades',           notes: '',                                                                                                                          updatedAt: D(5)  } },
      { id: 'n5', type: 'roadmapNode', position: { x: 350, y: 240 }, data: { label: 'Pasarela de Pago',       status: 'blocked',     priority: 'high',   description: 'Integración Stripe',                      notes: 'Bloqueado por falta de credenciales de Stripe en producción. Contactar con el equipo de finanzas.',                            updatedAt: D(2)  } },
      { id: 'n6', type: 'roadmapNode', position: { x: 100, y: 240 }, data: { label: 'Deploy Producción',      status: 'pending',     priority: 'low',    description: 'Vercel + CI/CD pipeline',                 notes: '',                                                                                                                          updatedAt: D(5)  } },
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
      { id: 'm1', type: 'roadmapNode', position: { x: 100, y: 80 },  data: { label: 'Requisitos & Specs',  status: 'done',        priority: 'medium', description: 'Definición de KPIs y métricas clave',    notes: '', updatedAt: D(14) } },
      { id: 'm2', type: 'roadmapNode', position: { x: 350, y: 80 },  data: { label: 'Modelo de Datos',     status: 'done',        priority: 'high',   description: 'Esquema BD + relaciones',                 notes: '', updatedAt: D(12) } },
      { id: 'm3', type: 'roadmapNode', position: { x: 600, y: 80 },  data: { label: 'API Backend',         status: 'done',        priority: 'high',   description: 'Endpoints REST con Node + Express',       notes: '', updatedAt: D(7)  } },
      { id: 'm4', type: 'roadmapNode', position: { x: 600, y: 240 }, data: { label: 'Gráficas & Charts',   status: 'in_progress', priority: 'high',   description: 'Recharts — líneas, barras, pie',          notes: 'Revisar si Recharts o Victory Charts tiene mejor soporte para tooltips personalizados.', updatedAt: D(0) } },
      { id: 'm5', type: 'roadmapNode', position: { x: 350, y: 240 }, data: { label: 'Filtros Temporales',  status: 'pending',     priority: 'medium', description: 'Rango de fechas y comparativas',          notes: '', updatedAt: D(7)  } },
      { id: 'm6', type: 'roadmapNode', position: { x: 100, y: 240 }, data: { label: 'Exportar Reportes',   status: 'pending',     priority: 'low',    description: 'PDF y CSV desde el dashboard',            notes: '', updatedAt: D(7)  } },
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
