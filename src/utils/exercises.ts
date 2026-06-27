export interface PracticalExercise {
  title: string;
  description: string;
  challenge: string;
}

const exercisesMap: Record<string, PracticalExercise> = {
  // HTML & CSS Core
  'html-semantic': {
    title: 'Estructura Semántica de la Taberna',
    description: 'Maquetar una página de inicio para un gremio de aventureros utilizando exclusivamente etiquetas semánticas de HTML5 para estructurar el contenido.',
    challenge: 'Usa <header>, <nav>, <main>, <article>, <aside> y <footer> sin usar ni un solo elemento <div> para organizar las misiones y el tablón de anuncios.'
  },
  'css-boxmodel': {
    title: 'El Escudo de Margen y Relleno',
    description: 'Crear una tarjeta de equipamiento (arma o armadura retro) con bordes dobles, padding responsivo y sombra retro cuidando el desbordamiento.',
    challenge: 'Configura box-sizing: border-box, ajusta márgenes colapsados y añade un borde pixelado usando sombras CSS múltiples sin romper el ancho máximo.'
  },
  'css-flexbox': {
    title: 'Alineación de Aventureros en la Fila',
    description: 'Organizar una barra de navegación del gremio y un listado de perfiles de héroes que se adapten de forma flexible a la pantalla.',
    challenge: 'Crea un contenedor flexible que distribuya el espacio equitativamente, alinee los avatares al centro y use flex-wrap para pantallas angostas.'
  },
  'css-grid': {
    title: 'Cuadrícula del Tesoro (Bento Grid)',
    description: 'Diseñar un tablero de inventario y estadísticas estilo Bento Grid con espacios de diferentes tamaños para items comunes y legendarios.',
    challenge: 'Usa grid-template-columns con repeat() y minmax(), y asigna celdas expandidas usando grid-column o grid-row para los cofres principales.'
  },
  'css-variables-animations': {
    title: 'Poción de Brillo Pulsante',
    description: 'Crear una tarjeta de poción mágica interactiva que cambie de color y pulse suavemente al pasar el cursor usando variables CSS y animaciones.',
    challenge: 'Define variables de color en :root y asócialas a una animación con @keyframes que modifique la opacidad y el escalado de forma infinita.'
  },

  // JavaScript Avanzado
  'js-v8-scopes': {
    title: 'El Calabozo del Ámbito Cerrado',
    description: 'Implementar un generador de identificadores únicos para misiones del gremio usando clausuras (closures) para proteger el contador interno.',
    challenge: 'Escribe una función que retorne otra. La función interna debe incrementar un contador privado e inaccesible desde fuera del ámbito léxico.'
  },
  'js-event-loop': {
    title: 'La Carrera de Eventos (Micro vs Macro)',
    description: 'Crear una simulación de telemetría que demuestre la diferencia de prioridad de ejecución en el Event Loop de V8.',
    challenge: 'Programa un escenario donde muestres en consola el orden exacto de ejecución combinando microtareas (Promise.resolve) y macrotareas (setTimeout).'
  },
  'js-async-handlers': {
    title: 'Petición de Hechizos a la API',
    description: 'Consumir un listado público de monstruos y manejar posibles errores de red de forma asíncrona usando bloques try/catch.',
    challenge: 'Utiliza async/await para consultar la API, implementa un AbortController para cancelar peticiones lentas y muestra un estado de error amigable.'
  },
  'js-prototypes': {
    title: 'La Forja del Prototipo Base',
    description: 'Diseñar un sistema de clases RPG utilizando herencia prototípica o la sintaxis moderna de clases de ES6.',
    challenge: 'Crea la clase Personaje con métodos de ataque, y hereda una subclase Guerrero que añada la estadística de fuerza y modifique el daño final.'
  },
  'js-proxies-generators': {
    title: 'El Centinela del Cofre (Proxies & Generators)',
    description: 'Crear un objeto de inventario vigilado por un Proxy y un generador que emita salas de mazmorra secuencialmente.',
    challenge: 'Usa un Proxy para validar que las estadísticas de un héroe nunca sean negativas, y un Generator (yield) para recorrer salas de una mazmorra una por una.'
  },

  // TypeScript Avanzado
  'ts-compiler-config': {
    title: 'El Guardián del tsconfig.json',
    description: 'Configurar un compilador de TypeScript con reglas estrictas de seguridad de tipos para evitar vulnerabilidades de tipo "any".',
    challenge: 'Habilita strict, noImplicitAny, noImplicitReturns y strictNullChecks en un proyecto local de prueba y resuelve todos los errores de tipado resultantes.'
  },
  'ts-unions-intersections': {
    title: 'La Fusión de Elementos (Uniones discriminadas)',
    description: 'Diseñar un sistema de transacciones bancarias mágicas utilizando tipos de unión discriminada para depósitos, retiros e intercambios.',
    challenge: 'Crea un campo "tipo" literal común y escribe funciones de protección (Type Guards) para procesar de forma segura cada tipo de transacción.'
  },
  'ts-generics': {
    title: 'El Cofre Genérico Recargable',
    description: 'Implementar una clase genérica para almacenar e intercambiar de forma segura cualquier tipo de ítem de aventura.',
    challenge: 'Desarrollar la clase Cofre<T> con restricciones de tipo (T extends BaseItem) para asegurar que todo ítem tenga un peso y un valor.'
  },
  'ts-mapped-conditional': {
    title: 'El Mutador de Tipos Mágicos',
    description: 'Crear tipos complejos mapeados y condicionales para transformar interfaces de personajes del gremio.',
    challenge: 'Define un tipo que convierta todos los atributos de un personaje en opcionales o de solo lectura, o extraiga dinámicamente el tipo de retorno.'
  },
  'ts-utility-decorators': {
    title: 'El Amuleto del Decorador',
    description: 'Escribir decoradores de métodos para auditar las ejecuciones de hechizos y validar el consumo de maná en tiempo de ejecución.',
    challenge: 'Crea un decorador @LogEjecucion que imprima en consola los argumentos suministrados y el tiempo de ejecución del hechizo decorado.'
  },

  // React & Redux
  'react-jsx-props': {
    title: 'Pergamino de Recompensa Reutilizable',
    description: 'Construir un componente de interfaz flexible que renderice cartas con diferente contenido usando props y children.',
    challenge: 'Pasa callbacks interactivos como props y maneja diferentes estilos visuales (común, raro, legendario) según los atributos recibidos.'
  },
  'react-hooks-eff': {
    title: 'El Oráculo del Estado y Efecto',
    description: 'Desarrollar un componente de reloj de arena o temporizador interactivo utilizando useState, useEffect y useRef.',
    challenge: 'Asegúrate de limpiar los intervalos o timeouts en el return de useEffect para prevenir fugas de memoria y re-renders infinitos.'
  },
  'react-context-api': {
    title: 'El Almacén Central del Gremio',
    description: 'Crear un contexto global para coordinar el oro, nivel y misiones activas de tu grupo de aventureros sin prop-drilling.',
    challenge: 'Evita pasar props manualmente proveyendo el estado a nivel superior y consumiéndolo con useContext en la tienda y la ficha de personaje.'
  },
  'react-redux-toolkit': {
    title: 'El Gran Libro de Registro (Redux)',
    description: 'Migrar el estado del inventario y las estadísticas de nivel a un almacén de datos centralizado usando Redux Toolkit.',
    challenge: 'Configura un store, crea un slice con reducers para agregar y eliminar ítems de equipamiento, e intégralo usando useSelector y useDispatch.'
  },
  'react-performance-fiber': {
    title: 'La Forja del Rendimiento',
    description: 'Optimizar una lista masiva de habilidades de héroes evitando renderizados innecesarios del DOM virtual.',
    challenge: 'Utiliza React.memo, useMemo para cálculos pesados de daño, y useCallback para memorizar los controladores de eventos de clics.'
  },

  // Frameworks: Angular
  'ng-components-base': {
    title: 'La Celda Standalone de Angular',
    description: 'Diseñar un componente de barra de experiencia en Angular usando componentes independientes y enlace de datos bidireccional.',
    challenge: 'Vincula propiedades usando @Input() para recibir el progreso y @Output() con EventEmitter para notificar cuando se llena la barra.'
  },
  'ng-di-services': {
    title: 'El Suministrador de Hechizos Inyectables',
    description: 'Crear un servicio de Angular para centralizar las peticiones de curación, daño e historial del gremio.',
    challenge: 'Usa @Injectable con providedIn: "root" e inyecta el servicio en tus componentes mediante inyección de dependencias por constructor.'
  },
  'ng-rxjs-observables': {
    title: 'El Flujo de Eventos del Calabozo',
    description: 'Modelar una oleada de ataques enemigos como un flujo asíncrono reactivo utilizando RxJS.',
    challenge: 'Combina múltiples Subjects y aplica operadores como map, filter y debounceTime para reaccionar solo a ataques críticos.'
  },
  'ng-signals': {
    title: 'Señales de Vida Reactivas',
    description: 'Refactorizar el contador de puntos de vida utilizando Angular Signals para optimizar los ciclos de detección de cambios.',
    challenge: 'Usa signal() para el valor base, computed() para calcular el porcentaje de vida, y effect() para guardar el estado en localStorage.'
  },
  'ng-guards-lazy': {
    title: 'La Fortaleza Cerrada (Guards & Lazy Loading)',
    description: 'Bloquear el acceso a la mazmorra de nivel alto configurando un CanActivate Guard y módulos de carga diferida.',
    challenge: 'Define rutas anidadas en el enrutador de Angular, carga perezosamente el módulo del calabozo y verifica el nivel del héroe en el Guard.'
  },

  // Node.js & Backend
  'node-modules-fs': {
    title: 'El Escribano de Bitácoras (fs Module)',
    description: 'Crear un script de consola que escriba informes de misiones completadas en archivos físicos de texto plano.',
    challenge: 'Usa fs.promises para leer archivos de bitácora, concatenar la nueva aventura, y crear directorios de reportes organizados.'
  },
  'node-express-routes': {
    title: 'El Tablón de Anuncios API',
    description: 'Desarrollar una API REST con Express para listar, añadir y eliminar misiones de entrenamiento del gremio.',
    challenge: 'Implementa peticiones GET, POST y DELETE, maneja parámetros de consulta y valida que el cuerpo de la petición contenga campos correctos.'
  },
  'node-auth-jwt': {
    title: 'La Llave Criptográfica JWT',
    description: 'Proteger las rutas de misiones ultra-secretas del gremio mediante autenticación por JSON Web Token.',
    challenge: 'Escribe un middleware en Express que verifique la firma del token enviado en las cabeceras HTTP y rechace peticiones no firmadas.'
  },
  'node-streams-buffers': {
    title: 'El Canalizador de Pergaminos (Streams)',
    description: 'Procesar archivos masivos de telemetría de batalla leyendo fragmentos (chunks) sin saturar la memoria RAM.',
    challenge: 'Utiliza fs.createReadStream, conéctalo a un Stream de transformación para capitalizar los textos, y escribe la salida usando Streams.'
  },
  'node-cluster-workers': {
    title: 'El Ejército de Clones (Cluster & Workers)',
    description: 'Delegar el cálculo de rutas de calabozo complejas a múltiples hilos de ejecución paralelos en Node.',
    challenge: 'Usa el módulo Cluster para levantar subprocesos en cada núcleo de CPU, o Worker Threads para computar tareas pesadas sin bloquear la API.'
  },

  // Java & Spring Boot
  'java-oop-collections': {
    title: 'El Clasificador de Hechizos en Java',
    description: 'Diseñar una jerarquía de clases de conjuros y organizarlos en colecciones ordenadas en Java utilizando la JDK.',
    challenge: 'Usa un TreeSet implementando la interfaz Comparable para ordenar hechizos por su coste de maná de menor a mayor.'
  },
  'java-streams-lambdas': {
    title: 'El Filtro del Alquimista (Java Streams)',
    description: 'Procesar inventarios masivos de ingredientes mágicos usando lambdas y la API de Streams en Java 8+.',
    challenge: 'Filtra pociones raras, asocia sus precios usando map, y calcula el costo total usando reduce() u Collectors.summingDouble().'
  },
  'java-spring-di': {
    title: 'La Forja de Componentes Spring',
    description: 'Configurar la inyección de servicios de batalla utilizando las anotaciones @Component y @Autowired de Spring Boot.',
    challenge: 'Registra beans personalizados con @Bean y utiliza perfiles (@Profile) de Spring para alternar entre simulación local y base de datos.'
  },
  'java-spring-jpa': {
    title: 'Mapeador de Mazmorras Relacionales (JPA)',
    description: 'Diseñar entidades JPA para guardar el historial de aventuras y monstruos derrotados en base de datos PostgreSQL.',
    challenge: 'Establece relaciones @ManyToOne entre Héroe e Historial, y escribe consultas personalizadas utilizando @Query de Spring Data.'
  },
  'java-concurrency': {
    title: 'El Simulador de Batallas Multihilo',
    description: 'Ejecutar ataques paralelos de hilos enemigos controlando condiciones de carrera y exclusión mutua en Java.',
    challenge: 'Implementa la simulación usando ExecutorService y protege los puntos de vida del jefe utilizando AtomicInteger o bloques synchronized.'
  },

  // Ciberseguridad Práctica
  'sec-owasp-top10': {
    title: 'El Escudo Anti-Inyecciones (OWASP)',
    description: 'Sanitizar campos de formulario para bloquear inyecciones SQL y ataques Cross-Site Scripting (XSS).',
    challenge: 'Reemplaza consultas de texto concatenadas por consultas parametrizadas (Prepared Statements) y escapa inputs de HTML peligrosos.'
  },
  'sec-cryptography': {
    title: 'El Cofre Cifrado con Llave AES',
    description: 'Encriptar las bitácoras secretas del gremio utilizando criptografía simétrica AES-256-GCM.',
    challenge: 'Genera un vector de inicialización (IV) único para cada mensaje, realiza el cifrado y almacena la etiqueta de autenticación segura.'
  },
  'sec-csp-cors': {
    title: 'El Guardián del Puente CORS',
    description: 'Configurar políticas CORS estrictas y reglas CSP que impidan fugas de información a servidores hostiles.',
    challenge: 'Bloquea orígenes comodín (*) en Express, define cabeceras con Helmet y escribe una regla CSP que prohíba scripts inline.'
  },
  'sec-oauth-openid': {
    title: 'El Pasaporte del Aventurero (OAuth)',
    description: 'Integrar un inicio de sesión social mediante el flujo de código de autorización de Google o GitHub.',
    challenge: 'Intercambia el código temporal por un token de acceso en tu backend y decodifica las credenciales de perfil del usuario de forma segura.'
  },
  'sec-penetration-testing': {
    title: 'El Explorador de Brechas (Auditoría)',
    description: 'Escanear un proyecto de backend en busca de puertos abiertos, librerías obsoletas y variables de entorno expuestas.',
    challenge: 'Utiliza herramientas de análisis estático (SAST) locales, corrige alertas de dependencias y configura contenedores sin root.'
  },

  // DevOps & Docker
  'devops-linux-cli': {
    title: 'El Guardián de Procesos Bash',
    description: 'Automatizar la copia de seguridad de las bases de datos de misiones y verificar el espacio disponible en disco.',
    challenge: 'Escribe un script en bash que genere un tar.gz del inventario, valide permisos con chmod, y reporte alertas si el disco supera el 90%.'
  },
  'devops-docker-containers': {
    title: 'La Armadura del Contenedor (Docker)',
    description: 'Escribir un Dockerfile óptimo multi-etapa para desplegar una aplicación React en producción con tamaño reducido.',
    challenge: 'Separa la etapa de compilación de node de la etapa de ejecución final con nginx-alpine para reducir la imagen a menos de 50MB.'
  },
  'devops-cicd-github': {
    title: 'El Mensajero Automatizado (CI/CD)',
    description: 'Configurar un flujo de trabajo en GitHub Actions para compilar y validar pruebas unitarias.',
    challenge: 'Crea un archivo workflow .yml que lance pruebas unitarias ante cada pull request e impida fusiones de código con fallos.'
  },

  // SQL & Bases de Datos
  'db-sql-basics': {
    title: 'La Estructura Relacional Base',
    description: 'Diseñar las tablas relacionales para almacenar personajes, misiones y logros del gremio con restricciones estrictas.',
    challenge: 'Define claves primarias, claves foráneas con ON DELETE CASCADE, y restricciones de tipo CHECK para el nivel (>= 1).'
  },
  'db-sql-joins': {
    title: 'El Historiador del Gremio (JOINS)',
    description: 'Escribir una consulta SQL compleja que calcule las ganancias totales de oro de cada héroe agrupando datos.',
    challenge: 'Une múltiples tablas asociativas usando LEFT/INNER JOIN, agrupa por héroe con GROUP BY, y filtra resultados con HAVING.'
  },
  'db-indexes-optimization': {
    title: 'El Acelerador de Consultas',
    description: 'Crear índices de búsqueda rápida y analizar planes de ejecución lenta en PostgreSQL.',
    challenge: 'Ejecuta EXPLAIN ANALYZE sobre una consulta pesada, crea un índice B-Tree sobre la columna de búsqueda y mide la ganancia de velocidad.'
  },

  // AI & Prompt Engineering
  'ai-prompt-basics': {
    title: 'El Domador de Prompts',
    description: 'Diseñar instrucciones complejas que obliguen a la IA a razonar y responder en un formato estrictamente válido.',
    challenge: 'Escribe un prompt con ejemplos Few-Shot y técnicas de Chain-of-Thought para obligar al modelo a retornar un JSON estructurado.'
  },
  'ai-sdk-integration': {
    title: 'La Conexión con el Oráculo (Gemini)',
    description: 'Conectar un servidor Express de forma segura con la SDK de Gemini usando variables de entorno secretas.',
    challenge: 'Instancia el cliente GoogleGenAI y expón un endpoint de chat asíncrono con respuestas en tiempo real mediante streaming.'
  },
  'ai-rag-embeddings': {
    title: 'La Biblioteca del Gremio (RAG)',
    description: 'Estructurar documentos de misiones, generar vectores con Gemini API y consultar coincidencias semánticas.',
    challenge: 'Divide textos de misiones en bloques, computa sus embeddings de vectores y busca los más cercanos calculando la similitud del coseno.'
  }
};

const defaultExercise = (nodeName: string): PracticalExercise => ({
  title: `Práctica Recomendada: ${nodeName}`,
  description: `Crea un mini-proyecto práctico para consolidar tus conocimientos de ${nodeName} de forma práctica y autónoma.`,
  challenge: 'Escribe una aplicación o utilidad que use esta habilidad de principio a fin, valida su funcionamiento y compártela.'
});

export function getPracticalExerciseForNode(nodeId: string, nodeName: string): PracticalExercise {
  const custom = exercisesMap[nodeId];
  if (custom) return custom;
  return defaultExercise(nodeName);
}
