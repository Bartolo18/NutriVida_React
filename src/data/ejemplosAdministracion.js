// Son los mismos ejemplos ficticios de administracion.html. No hay base de datos.
export const productosEjemplo = [
  { codigo: 'CN001', nombre: 'Primera consulta nutricional', precio: 35000, stock: 10, categoria: 'Consulta' },
  { codigo: 'PL001', nombre: 'Plan pérdida de peso (1 mes)', precio: 65000, stock: 5, categoria: 'Plan' },
  { codigo: 'EV001', nombre: 'Antropometría completa', precio: 18000, stock: 8, categoria: 'Evaluación' },
];

export const usuariosEjemplo = [
  { nombre: 'Camila', apellidos: 'Soto', correo: 'admin@duoc.cl', perfil: 'Administrador' },
  { nombre: 'Diego', apellidos: 'Rojas', correo: 'vendedor@duoc.cl', perfil: 'Vendedor' },
  { nombre: 'Andrea', apellidos: 'Muñoz', correo: 'cliente@gmail.com', perfil: 'Cliente' },
];

export const solicitudesEjemplo = [
  { codigo: 'S001', servicio: 'Primera consulta', estado: 'Pendiente', paciente: 'Andrea Muñoz', jornada: 'mañana', motivo: 'solicitar información sobre una primera atención' },
  { codigo: 'S002', servicio: 'Evaluación', estado: 'Pendiente', paciente: 'Tomás Pérez', jornada: 'tarde', motivo: 'consultar por una evaluación nutricional' },
];
