// Los 18 productos conservan los datos del catálogo HTML original.
export const productos = [
  {
    "codigo": "CN001",
    "grupo": "consultas",
    "nombre": "Primera consulta nutricional",
    "modalidad": "Presencial · 50 min",
    "descripcion": "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
    "precio": 35000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "CN002",
    "grupo": "consultas",
    "nombre": "Control nutricional (seguimiento)",
    "modalidad": "Presencial · 30 min",
    "descripcion": "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
    "precio": 25000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "CN003",
    "grupo": "consultas",
    "nombre": "Control nutricional quincenal",
    "modalidad": "Presencial · 30 min",
    "descripcion": "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses.",
    "precio": 22000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "CN004",
    "grupo": "consultas",
    "nombre": "Teleconsulta nutricional",
    "modalidad": "Online (video) · 30 min",
    "descripcion": "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    "precio": 20000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "CN005",
    "grupo": "consultas",
    "nombre": "Consulta de urgencia / reagendada",
    "modalidad": "Presencial · 30 min",
    "descripcion": "Para pacientes que requieren atención fuera de su control habitual.",
    "precio": 28000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "PL001",
    "grupo": "planes",
    "nombre": "Plan pérdida de peso (1 mes)",
    "modalidad": "Presencial · 1 mes",
    "descripcion": "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.",
    "precio": 65000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "PL002",
    "grupo": "planes",
    "nombre": "Plan pérdida de peso (3 meses)",
    "modalidad": "Presencial · 3 meses",
    "descripcion": "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo.",
    "precio": 170000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "PL003",
    "grupo": "planes",
    "nombre": "Plan nutrición deportiva (1 mes)",
    "modalidad": "Presencial · 1 mes",
    "descripcion": "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos.",
    "precio": 70000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "PL004",
    "grupo": "planes",
    "nombre": "Plan control diabetes / hipertensión",
    "modalidad": "Presencial · Duración no especificada",
    "descripcion": "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.",
    "precio": 75000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "PL005",
    "grupo": "planes",
    "nombre": "Plan alimentación vegetariana/vegana",
    "modalidad": "Presencial · Duración no especificada",
    "descripcion": "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales.",
    "precio": 68000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "PL006",
    "grupo": "planes",
    "nombre": "Plan alimentación infantil (2-12 años)",
    "modalidad": "Presencial · Duración no especificada",
    "descripcion": "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.",
    "precio": 65000,
    "imagen": "/imagenes/control-peso.jpg",
    "alt": "Ensalada de hojas verdes con palta, granada y semillas"
  },
  {
    "codigo": "EV001",
    "grupo": "evaluaciones",
    "nombre": "Antropometría completa",
    "modalidad": "Presencial · 20 min",
    "descripcion": "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.",
    "precio": 18000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "EV002",
    "grupo": "evaluaciones",
    "nombre": "Bioimpedanciometría",
    "modalidad": "Presencial · 15 min",
    "descripcion": "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
    "precio": 12000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "EV003",
    "grupo": "evaluaciones",
    "nombre": "Encuesta de hábitos alimentarios",
    "modalidad": "Presencial · 20 min",
    "descripcion": "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
    "precio": 10000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "EV004",
    "grupo": "evaluaciones",
    "nombre": "Análisis de exámenes de laboratorio",
    "modalidad": "Presencial · 20 min",
    "descripcion": "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
    "precio": 15000,
    "imagen": "/imagenes/metabolica.jpg",
    "alt": "Plato con huevo, palta, tomates y verduras variadas"
  },
  {
    "codigo": "TG001",
    "grupo": "talleres",
    "nombre": "Taller de alimentación saludable",
    "modalidad": "Presencial (grupo) · 90 min",
    "descripcion": "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas.",
    "precio": 15000,
    "imagen": "/imagenes/deportiva.jpg",
    "alt": "Ingredientes variados organizados en recipientes"
  },
  {
    "codigo": "TG002",
    "grupo": "talleres",
    "nombre": "Taller de cocina nutritiva",
    "modalidad": "Presencial (grupo) · 120 min",
    "descripcion": "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas.",
    "precio": 20000,
    "imagen": "/imagenes/deportiva.jpg",
    "alt": "Ingredientes variados organizados en recipientes"
  },
  {
    "codigo": "TG003",
    "grupo": "talleres",
    "nombre": "Taller nutrición para deportistas",
    "modalidad": "Presencial (grupo) · 90 min",
    "descripcion": "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas.",
    "precio": 18000,
    "imagen": "/imagenes/deportiva.jpg",
    "alt": "Ingredientes variados organizados en recipientes"
  }
];
