import { Roadmap } from '../types';

export const mockRoadmaps: Roadmap[] = [
  {
    id: 'html-css-core',
    title: 'HTML & CSS Core',
    description: 'Domina la estructura de accesibilidad web y layouts complejos usando técnicas nativas modernas.',
    icon: '🎨',
    nodes: [
      {
        id: 'html-semantic',
        name: 'HTML Semántico & Accesibilidad (a11y)',
        description: 'Uso correcto de section, article, nav, main, roles ARIA fundamentales y contraste de color accesible.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'html-sem-1', name: 'Reemplazar divs genéricos por nav, main, section y footer semánticos', completed: false },
          { id: 'html-sem-2', name: 'Agregar atributos aria-label y alt descriptivos en elementos interactivos', completed: false },
          { id: 'html-sem-3', name: 'Configurar orden de tabulación nativo usando tabindex y focus states', completed: false }
        ]
      },
      {
        id: 'css-boxmodel',
        name: 'Especificidad y Modelo de Caja',
        description: 'Márgenes colapsados, padding, border, cálculo de box-sizing: border-box y reglas de especificidad CSS.',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['html-semantic'],
        subtasks: [
          { id: 'css-box-1', name: 'Configurar reset CSS universal con box-sizing: border-box', completed: false },
          { id: 'css-box-2', name: 'Resolver problemas de márgenes colapsados en contenedores hermanos', completed: false },
          { id: 'css-box-3', name: 'Calcular peso de especificidad de selectores combinados (!important vs inline vs id)', completed: false }
        ]
      },
      {
        id: 'css-flexbox',
        name: 'Flexbox Flex-Grow, Shrink & Basis',
        description: 'Comportamiento de distribución de espacio unidimensional avanzado y alineación fina en ejes principal y cruzado.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['css-boxmodel'],
        subtasks: [
          { id: 'css-flex-1', name: 'Maquetar un menú de navegación alineado con justify-content y align-items', completed: false },
          { id: 'css-flex-2', name: 'Utilizar flex-grow y flex-shrink para hacer cards adaptables', completed: false },
          { id: 'css-flex-3', name: 'Implementar flex-wrap y manejar el espacio sobrante mediante gap', completed: false }
        ]
      },
      {
        id: 'css-grid',
        name: 'Grid Areas y Responsive Design',
        description: 'Estructuración bidimensional con grid-template-areas, repeat, auto-fit, minmax y media queries específicas.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['css-flexbox'],
        subtasks: [
          { id: 'css-grid-1', name: 'Estructurar una maqueta tipo bento-grid con grid-template-areas', completed: false },
          { id: 'css-grid-2', name: 'Utilizar grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) sin media-queries', completed: false },
          { id: 'css-grid-3', name: 'Alinear tracks individuales usando justify-items, align-items y self', completed: false }
        ]
      },
      {
        id: 'css-variables-animations',
        name: 'Custom Properties & Animaciones Web',
        description: 'Variables CSS reactivas nativas, funciones de aceleración cubic-bezier y animaciones avanzadas optimizadas por GPU.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['css-grid'],
        subtasks: [
          { id: 'css-var-1', name: 'Configurar un sistema de tokens/temas de colores con custom properties (--primary-color)', completed: false },
          { id: 'css-var-2', name: 'Programar una animación de entrada fluida mediante keyframes', completed: false },
          { id: 'css-var-3', name: 'Utilizar will-change y transformaciones 3D para evitar parpadeos en renderizado', completed: false }
        ]
      }
    ]
  },
  {
    id: 'javascript-avanzado',
    title: 'JavaScript Avanzado',
    description: 'Lleva tu JS al límite. Domina asincronía fina, manejo del motor V8 y scoping.',
    icon: '⚡',
    nodes: [
      {
        id: 'js-v8-scopes',
        name: 'Entorno de Ejecución & Scopes',
        description: 'Mesa de juego de JS: Execution Context, Lexical Environment, Temporal Dead Zone de let/const, y closures.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'js-sco-1', name: 'Identificar variables en scope global, funcional y de bloque', completed: false },
          { id: 'js-sco-2', name: 'Crear una función closure para encapsular variables y simular métodos privados', completed: false },
          { id: 'js-sco-3', name: 'Analizar hoisting en funciones declaradas vs expresiones de función', completed: false }
        ]
      },
      {
        id: 'js-event-loop',
        name: 'Event Loop & Task Queue',
        description: 'Funcionamiento del motor V8: Call Stack, Web APIs, Microtask Queue (promesas) y Macrotask Queue (settimeout).',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['js-v8-scopes'],
        subtasks: [
          { id: 'js-loop-1', name: 'Predecir el orden de salida de una ejecución mixta con promesas, setTimeouts y código síncrono', completed: false },
          { id: 'js-loop-2', name: 'Evitar el bloqueo del main thread dividiendo tareas pesadas de computación', completed: false },
          { id: 'js-loop-3', name: 'Entender el orden de procesamiento de requestAnimationFrame vs microtareas', completed: false }
        ]
      },
      {
        id: 'js-async-handlers',
        name: 'Control Asíncrono de Flujo',
        description: 'Manejo en paralelo con Promise.all, Promise.allSettled, Promise.race y control de timeouts de peticiones HTTP.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['js-event-loop'],
        subtasks: [
          { id: 'js-asy-1', name: 'Implementar Promise.all para cargar recursos de forma concurrente', completed: false },
          { id: 'js-asy-2', name: 'Usar Promise.allSettled para que fallos individuales no rompan todo el lote', completed: false },
          { id: 'js-asy-3', name: 'Crear un mecanismo de timeout personalizado de peticiones usando Promise.race', completed: false }
        ]
      },
      {
        id: 'js-prototypes',
        name: 'Herencia Prototípica y This',
        description: 'Modificación de prototipos nativos, encadenamiento, delegación y enlace léxico de this (bind, call, apply).',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['js-v8-scopes'],
        subtasks: [
          { id: 'js-pro-1', name: 'Crear objetos heredados usando Object.create() y constructor functions', completed: false },
          { id: 'js-pro-2', name: 'Enlazar manualmente el contexto this usando bind, call y apply', completed: false },
          { id: 'js-pro-3', name: 'Entender la diferencia del enlace de this en arrow functions vs funciones estándar', completed: false }
        ]
      },
      {
        id: 'js-proxies-generators',
        name: 'Proxies, Reflect & Generators',
        description: 'Metaprogramación en JavaScript: Interceptación de objetos con Proxies, uso de Reflect y flujos perezosos con Generators.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['js-async-handlers', 'js-prototypes'],
        subtasks: [
          { id: 'js-met-1', name: 'Crear un proxy reactivo que intercepte cambios y dispare actualizaciones de UI', completed: false },
          { id: 'js-met-2', name: 'Escribir una función generadora que maneje flujos iterables infinitos de datos', completed: false },
          { id: 'js-met-3', name: 'Utilizar la API Reflect para realizar operaciones seguras y consistentes de metadatos', completed: false }
        ]
      }
    ]
  },
  {
    id: 'typescript-roadmap',
    title: 'TypeScript Avanzado',
    description: 'Añade tipado fuerte estático a tus proyectos. Domina la manipulación de tipos compleja.',
    icon: '🔷',
    nodes: [
      {
        id: 'ts-compiler-config',
        name: 'tsconfig.json & Tipado Estricto',
        description: 'Configuración detallada del compilador: strictNullChecks, noImplicitAny, target y resolución de módulos.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'ts-cfg-1', name: 'Activar strict: true en el archivo tsconfig.json', completed: false },
          { id: 'ts-cfg-2', name: 'Configurar rutas absolutas personalizadas de módulos mediante compilerOptions.paths', completed: false },
          { id: 'ts-cfg-3', name: 'Resolver errores de tipado implícito en librerías de terceros', completed: false }
        ]
      },
      {
        id: 'ts-unions-intersections',
        name: 'Uniones, Intersecciones y Type Guards',
        description: 'Creación de tipos compuestos dinámicos y reducción de tipos en tiempo de ejecución usando checks nativos type-guards.',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['ts-compiler-config'],
        subtasks: [
          { id: 'ts-uni-1', name: 'Definir interfaces con uniones discriminadas usando una propiedad "type" en común', completed: false },
          { id: 'ts-uni-2', name: 'Escribir una función de estrechamiento (User-defined Type Guard) usando el operador "is"', completed: false },
          { id: 'ts-uni-3', name: 'Utilizar el operador "typeof" e "instanceof" para control de flujo dinámico seguro', completed: false }
        ]
      },
      {
        id: 'ts-generics',
        name: 'Tipos Genéricos Avanzados',
        description: 'Restricciones de genéricos (T extends U), genéricos múltiples y abstracción de firmas en funciones complejas.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['ts-unions-intersections'],
        subtasks: [
          { id: 'ts-gen-1', name: 'Crear una función genérica reutilizable que acepte estructuras flexibles de datos', completed: false },
          { id: 'ts-gen-2', name: 'Utilizar restricciones "extends" para limitar el tipo que el genérico puede adoptar', completed: false },
          { id: 'ts-gen-3', name: 'Tipar una clase genérica para persistencia de datos tipados (p. ej., un Repositorio)', completed: false }
        ]
      },
      {
        id: 'ts-mapped-conditional',
        name: 'Mapped Types & Tipos Condicionales',
        description: 'Uso de "keyof", operadores "in", inferencias dinámicas mediante "infer" y bifurcación condicional de firmas de tipos.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['ts-generics'],
        subtasks: [
          { id: 'ts-map-1', name: 'Escribir un tipo mapeado personalizado que transforme propiedades a opcionales y de solo lectura', completed: false },
          { id: 'ts-map-2', name: 'Utilizar tipos condicionales (T extends U ? X : Y) para alternar firmas según parámetros', completed: false },
          { id: 'ts-map-3', name: 'Utilizar la palabra clave "infer" para extraer el tipo de retorno de una función asíncrona', completed: false }
        ]
      },
      {
        id: 'ts-utility-decorators',
        name: 'Utility Types y Decoradores',
        description: 'Uso profundo de Omit, Pick, ReturnType, Parameters y creación de decoradores de clase y propiedad experimentales.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['ts-mapped-conditional'],
        subtasks: [
          { id: 'ts-ut-1', name: 'Simplificar interfaces grandes usando Omit y Pick integrados de TS', completed: false },
          { id: 'ts-ut-2', name: 'Extraer firmas de llamadas complejas con Parameters y ReturnType', completed: false },
          { id: 'ts-ut-3', name: 'Escribir un decorador experimental (@logger) para medir tiempos de ejecución de métodos', completed: false }
        ]
      }
    ]
  },
  {
    id: 'react-roadmap',
    title: 'React & Redux',
    description: 'Domina la arquitectura reactiva basada en componentes y gestores globales de flujo de datos.',
    icon: '⚛️',
    nodes: [
      {
        id: 'react-jsx-props',
        name: 'Ciclo de Vida de Props & State',
        description: 'Inmutabilidad de estado, triggers de re-renderizado, reconciliación del DOM virtual y renderizado condicional.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'react-cy-1', name: 'Actualizar estados complejos usando funciones de callback en setState para evitar condiciones de carrera', completed: false },
          { id: 'react-cy-2', name: 'Utilizar arrays de dependencias correctos y primitivos para prevenir bucles de renderizado', completed: false },
          { id: 'react-cy-3', name: 'Implementar paso de datos seguro de padre a hijo usando interfaces TypeScript estrictas', completed: false }
        ]
      },
      {
        id: 'react-hooks-eff',
        name: 'Hooks Integrados (useMemo/useCallback)',
        description: 'Evitar fugas de memoria con useEffect, memorizar cálculos pesados y estabilizar callbacks de funciones hijo.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['react-jsx-props'],
        subtasks: [
          { id: 'react-h-1', name: 'Optimizar un componente pesado con renderizados innecesarios usando React.memo', completed: false },
          { id: 'react-h-2', name: 'Estabilizar punteros de funciones que se pasan como props usando useCallback', completed: false },
          { id: 'react-h-3', name: 'Manejar la limpieza (cleanup) de timers o WebSockets abiertos dentro de useEffect', completed: false }
        ]
      },
      {
        id: 'react-context-api',
        name: 'State Management con Context API',
        description: 'Creación de proveedores de estado modularizado, hooks personalizados de consumo y prevención de sobre-re-renders.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['react-hooks-eff'],
        subtasks: [
          { id: 'react-ctx-1', name: 'Escribir un ContextProvider para manejar preferencias (como el tema oscuro) globalmente', completed: false },
          { id: 'react-ctx-2', name: 'Crear un Hook personalizado para evitar importaciones directas de useContext y validaciones manuales', completed: false },
          { id: 'react-ctx-3', name: 'Optimizar Context dividiendo el estado y las funciones despachadoras en proveedores independientes', completed: false }
        ]
      },
      {
        id: 'react-redux-toolkit',
        name: 'Redux Toolkit & Slices',
        description: 'Estructura global de almacén (Store), configuración de reducers síncronos y asíncronos con createSlice de RTK.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['react-context-api'],
        subtasks: [
          { id: 'react-red-1', name: 'Configurar el store de Redux utilizando configureStore de Redux Toolkit', completed: false },
          { id: 'react-red-2', name: 'Crear un Slice utilizando createSlice que maneje llamadas síncronas de datos del usuario', completed: false },
          { id: 'react-red-3', name: 'Despachar acciones asíncronas con createAsyncThunk y manejar estados pendientes, completados o fallidos', completed: false }
        ]
      },
      {
        id: 'react-performance-fiber',
        name: 'Optimización Avanzada & React Fiber',
        description: 'Comprensión del motor de reconciliación de React (Fiber), transiciones concurrentes (useTransition) y Suspense.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['react-redux-toolkit'],
        subtasks: [
          { id: 'react-perf-1', name: 'Implementar Lazy Loading de vistas pesadas usando React.lazy y Suspense', completed: false },
          { id: 'react-perf-2', name: 'Manejar estados no bloqueantes en inputs dinámicos usando useTransition', completed: false },
          { id: 'react-perf-3', name: 'Analizar e identificar fugas de memoria y cuellos de botella con React Profiler DevTools', completed: false }
        ]
      }
    ]
  },
  {
    id: 'angular-framework',
    title: 'Frameworks: Angular',
    description: 'Arquitectura empresarial robusta. De directivas simples a control reactivo total.',
    icon: '🔴',
    nodes: [
      {
        id: 'ng-components-base',
        name: 'Estructura de Componentes & Control Flow',
        description: 'Estructuras declarativas modernas con @if, @for, @switch, enrutamiento básico y decorador @Component.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'ng-comp-1', name: 'Migrar directivas estructurales antiguas (*ngIf/*ngFor) a la nueva sintaxis @if y @for', completed: false },
          { id: 'ng-comp-2', name: 'Utilizar enlace de propiedades (property binding) y comunicación con @Input() y @Output()', completed: false },
          { id: 'ng-comp-3', name: 'Configurar rutas de navegación utilizando la API ProvideRouter en componentes standalone', completed: false }
        ]
      },
      {
        id: 'ng-di-services',
        name: 'Inyección de Dependencias Avanzada',
        description: 'Jerarquías de inyectores (element, module, root), inyección mediante constructor vs función inject().',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['ng-components-base'],
        subtasks: [
          { id: 'ng-di-1', name: 'Escribir un servicio standalone inyectable en "root"', completed: false },
          { id: 'ng-di-2', name: 'Utilizar la función inject() de Angular 16+ para inyección limpia de dependencias', completed: false },
          { id: 'ng-di-3', name: 'Manejar proveedores personalizados de tokens usando useValue o useFactory', completed: false }
        ]
      },
      {
        id: 'ng-rxjs-observables',
        name: 'Flujos Reactivos con RxJS',
        description: 'Creación de observables, tuberías reactivas con pipe y operadores de transformación claves (switchMap, mergeMap).',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['ng-di-services'],
        subtasks: [
          { id: 'ng-rx-1', name: 'Crear un flujo de búsqueda asíncrona reactiva usando debounceTime y distinctUntilChanged', completed: false },
          { id: 'ng-rx-2', name: 'Utilizar el operador switchMap para cancelar peticiones de red previas en búsquedas sucesivas', completed: false },
          { id: 'ng-rx-3', name: 'Implementar el pipe async en las plantillas HTML para evitar desuscripciones manuales', completed: false }
        ]
      },
      {
        id: 'ng-signals',
        name: 'Manejo de Estado con Signals',
        description: 'Reactive Signals: signal(), computed(), effect() y su integración con zonas de detección de cambios refinada.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['ng-rxjs-observables'],
        subtasks: [
          { id: 'ng-sig-1', name: 'Declarar señales de estado locales usando signal() y actualizarlas con update()', completed: false },
          { id: 'ng-sig-2', name: 'Definir estados derivados que se recalculen automáticamente con computed()', completed: false },
          { id: 'ng-sig-3', name: 'Ejecutar efectos secundarios vinculados al cambio de señales utilizando la API effect()', completed: false }
        ]
      },
      {
        id: 'ng-guards-lazy',
        name: 'Guards de Navegación y Lazy Loading',
        description: 'Carga perezosa de rutas estructuradas, canActivate, canMatch y optimización del rendimiento en descarga web.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['ng-signals'],
        subtasks: [
          { id: 'ng-grd-1', name: 'Proteger una sección administrativa con guards de ruta funcionales canActivate', completed: false },
          { id: 'ng-grd-2', name: 'Configurar Lazy Loading para componentes y rutas pesadas usando loadComponent', completed: false },
          { id: 'ng-grd-3', name: 'Precargar recursos en segundo plano con la estrategia PreloadAllModules', completed: false }
        ]
      }
    ]
  },
  {
    id: 'nodejs-roadmap',
    title: 'Node.js & Backend',
    description: 'Escribe servidores estables, rápidos y eficientes del lado del servidor utilizando JavaScript/TypeScript.',
    icon: '🟢',
    nodes: [
      {
        id: 'node-modules-fs',
        name: 'File System & Event Emitter',
        description: 'Lectura/escritura asíncrona de archivos localmente, streaming de buffer con fs/promises y el patrón Event Emitter.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'node-fs-1', name: 'Crear o modificar archivos de configuración en disco de forma asíncrona con fs/promises', completed: false },
          { id: 'node-fs-2', name: 'Emitir y escuchar eventos personalizados extendiendo de la clase EventEmitter', completed: false },
          { id: 'node-fs-3', name: 'Entender buffers y streams binarios leyendo archivos línea por línea', completed: false }
        ]
      },
      {
        id: 'node-express-routes',
        name: 'Servidor HTTP Express & Middlewares',
        description: 'Enrutamiento REST, validaciones de cabeceras, parser de JSON, manejo de CORS y capas de middleware defensivas.',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['node-modules-fs'],
        subtasks: [
          { id: 'node-exp-1', name: 'Crear una API RESTful con endpoints GET, POST, PUT y DELETE', completed: false },
          { id: 'node-exp-2', name: 'Escribir un middleware personalizado que valide cabeceras de autorización Bearer', completed: false },
          { id: 'node-exp-3', name: 'Implementar un gestor global de errores en Express que devuelva respuestas JSON formateadas', completed: false }
        ]
      },
      {
        id: 'node-auth-jwt',
        name: 'Autenticación mediante JWT & Bcrypt',
        description: 'Cifrado de contraseñas de usuarios con salting recursivo, generación de JSON Web Tokens y middleware de validación.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['node-express-routes'],
        subtasks: [
          { id: 'node-auth-1', name: 'Cifrar contraseñas con bcrypt.hash() usando un factor de salting seguro (p. ej., 10)', completed: false },
          { id: 'node-auth-2', name: 'Generar y firmar JWTs con payloads de usuario usando jwt.sign()', completed: false },
          { id: 'node-auth-3', name: 'Implementar middleware de verificación de JWT para proteger endpoints de base de datos', completed: false }
        ]
      },
      {
        id: 'node-streams-buffers',
        name: 'Streams en Alta Escala y Descargas',
        description: 'Manejo de memoria óptimo mediante streams de lectura/escritura (Readable, Writable, Transform) evitando cuellos de botella.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['node-auth-jwt'],
        subtasks: [
          { id: 'node-str-1', name: 'Servir un archivo pesado de descarga mediante Streams para optimizar uso de memoria RAM', completed: false },
          { id: 'node-str-2', name: 'Canalizar flujos de entrada y salida con streams utilizando la función pipe()', completed: false },
          { id: 'node-str-3', name: 'Transformar flujos de texto dinámicamente con streams de tipo Transform', completed: false }
        ]
      },
      {
        id: 'node-cluster-workers',
        name: 'Clusterization & Worker Threads',
        description: 'Distribución de carga de procesamiento pesada en múltiples cores de CPU utilizando clústeres nativos y Worker Threads.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['node-streams-buffers'],
        subtasks: [
          { id: 'node-cls-1', name: 'Configurar el módulo "cluster" para levantar múltiples procesos de Express en cores de CPU disponibles', completed: false },
          { id: 'node-cls-2', name: 'Delegar procesamiento matemático síncrono intensivo a un Worker Thread', completed: false },
          { id: 'node-cls-3', name: 'Configurar comunicación bidireccional mediante mensajes asíncronos con parentPort', completed: false }
        ]
      }
    ]
  },
  {
    id: 'java-roadmap',
    title: 'Java & Spring Boot',
    description: 'Desarrollo backend empresarial robusto, seguro y multihilo con el ecosistema de Java.',
    icon: '☕',
    nodes: [
      {
        id: 'java-oop-collections',
        name: 'POO & Java Collections Framework',
        description: 'Herencia, polimorfismo estricto, interfaces funcionales y uso correcto de List, Set, Map e inmutabilidad.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'java-oop-1', name: 'Definir clases con principios sólidos de encapsulación de propiedades (getters/setters)', completed: false },
          { id: 'java-oop-2', name: 'Implementar herencia y polimorfismo sobreescribiendo métodos de clase', completed: false },
          { id: 'java-oop-3', name: 'Seleccionar la colección adecuada en memoria (ArrayList vs LinkedList, HashMap vs HashSet)', completed: false }
        ]
      },
      {
        id: 'java-streams-lambdas',
        name: 'Expresiones Lambda & Stream API',
        description: 'Procesamiento funcional de colecciones de datos, operaciones perezosas intermedias, opcionales (Optional) y coleccionistas.',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['java-oop-collections'],
        subtasks: [
          { id: 'java-str-1', name: 'Filtrar y transformar listas de objetos usando métodos de Streams (.filter(), .map())', completed: false },
          { id: 'java-str-2', name: 'Prevenir errores NullPointerException envolviendo retornos propensos en contenedores Optional', completed: false },
          { id: 'java-str-3', name: 'Escribir expresiones lambda concisas para implementar interfaces funcionales customizadas', completed: false }
        ]
      },
      {
        id: 'java-spring-di',
        name: 'Spring Boot IoC & Inyección',
        description: 'Contenedor de inversión de control (IoC), beans (@Component, @Service, @Repository) e inyección por constructor.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['java-streams-lambdas'],
        subtasks: [
          { id: 'java-spr-1', name: 'Configurar una aplicación Spring Boot autoejecutable usando anotaciones estructurales', completed: false },
          { id: 'java-spr-2', name: 'Implementar inyección de dependencias recomendada basada estrictamente en constructores', completed: false },
          { id: 'java-spr-3', name: 'Registrar Beans de configuración personalizados utilizando la anotación @Bean', completed: false }
        ]
      },
      {
        id: 'java-spring-jpa',
        name: 'Persistencia de Datos con Spring Data JPA',
        description: 'Mapeo objeto-relacional (ORM), relaciones @OneToMany/@ManyToOne, transacciones (@Transactional) y consultas personalizadas.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['java-spring-di'],
        subtasks: [
          { id: 'java-jpa-1', name: 'Mapear entidades relacionales de base de datos mediante JPA (@Entity, @Table, @Id)', completed: false },
          { id: 'java-jpa-2', name: 'Configurar relaciones complejas de uno-a-muchos con carga perezosa (FetchType.LAZY)', completed: false },
          { id: 'java-jpa-3', name: 'Escribir interfaces de repositorio que extiendan JpaRepository para consultas automáticas (Derived Queries)', completed: false }
        ]
      },
      {
        id: 'java-concurrency',
        name: 'Concurrencia, Hilos y Virtual Threads',
        description: 'Manejo de hilos tradicionales, pool de conexiones de base de datos, sincronización y los nuevos Virtual Threads (Project Loom).',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['java-spring-jpa'],
        subtasks: [
          { id: 'java-con-1', name: 'Ejecutar procesos paralelos con hilos tradicionales y pools de tipo ExecutorService', completed: false },
          { id: 'java-con-2', name: 'Implementar bloques de ejecución sincronizados y seguros para hilos (thread-safe)', completed: false },
          { id: 'java-con-3', name: 'Configurar hilos virtuales eficientes de alta concurrencia nativos de Java 21+', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-roadmap',
    title: 'Ciberseguridad Práctica',
    description: 'Aprende a escribir software seguro y a proteger tus sistemas frente a las principales vulnerabilidades (OWASP).',
    icon: '🛡️',
    nodes: [
      {
        id: 'sec-owasp-top10',
        name: 'OWASP Top 10 & Sanitización',
        description: 'Comprensión teórica de inyecciones SQL, Cross-Site Scripting (XSS), rotura de autenticaciones y sanitización de inputs.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'sec-owa-1', name: 'Identificar vectores de ataque de inyección SQL en consultas de texto concatenadas', completed: false },
          { id: 'sec-owa-2', name: 'Sanitizar inputs de usuario de campos HTML para bloquear inyecciones de script malicioso (XSS)', completed: false },
          { id: 'sec-owa-3', name: 'Configurar validaciones estrictas de tamaño y extensiones en cargadores de archivos', completed: false }
        ]
      },
      {
        id: 'sec-cryptography',
        name: 'Criptografía Simétrica y Asimétrica',
        description: 'Uso correcto de algoritmos de cifrado simétrico (AES-256-GCM) y asimétrico (claves públicas/privadas RSA/ECC) y firma digital.',
        difficulty: 'basic',
        xp: 30,
        status: 'locked',
        prerequisites: ['sec-owasp-top10'],
        subtasks: [
          { id: 'sec-cry-1', name: 'Cifrar datos locales usando AES-256-GCM y almacenar llaves de forma segura', completed: false },
          { id: 'sec-cry-2', name: 'Generar pares de llaves RSA de 4096 bits para autenticación por SSH', completed: false },
          { id: 'sec-cry-3', name: 'Escribir un script que valide la integridad de un archivo usando un hash SHA-256', completed: false }
        ]
      },
      {
        id: 'sec-csp-cors',
        name: 'Políticas CSP, CORS & Headers de Seguridad',
        description: 'Configuración detallada de Content Security Policy (CSP), cabeceras de prevención (X-Frame-Options, HSTS) y CORS restringidos.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['sec-cryptography'],
        subtasks: [
          { id: 'sec-csp-1', name: 'Escribir una regla CSP que bloquee scripts externos no confiables en línea (inline scripts)', completed: false },
          { id: 'sec-csp-2', name: 'Configurar cabeceras de seguridad HTTP robustas (p. ej., Helmet en Node.js, Spring Security)', completed: false },
          { id: 'sec-csp-3', name: 'Restringir orígenes permitidos en las políticas CORS de APIs evitando el comodín asterisco (*)', completed: false }
        ]
      },
      {
        id: 'sec-oauth-openid',
        name: 'Protocolos de Autorización (OAuth 2.0)',
        description: 'Entendimiento de Flujos de Autorización (Auth Code Flow), tokens de acceso, tokens de refresco e integración con OpenID Connect.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['sec-csp-cors'],
        subtasks: [
          { id: 'sec-oa-1', name: 'Configurar un flujo de inicio de sesión social confiable de Google o GitHub', completed: false },
          { id: 'sec-oa-2', name: 'Manejar la expiración de Access Tokens usando Refresh Tokens con rotación segura', completed: false },
          { id: 'sec-oa-3', name: 'Extraer y validar claims de perfil de usuario a través del token ID de OpenID Connect', completed: false }
        ]
      },
      {
        id: 'sec-penetration-testing',
        name: 'Auditoría de APIs & Pruebas Dinámicas',
        description: 'Técnicas de análisis estático de código (SAST), pruebas de inyecciones simuladas, análisis dinámico (DAST) y bastionado de sistemas (hardening).',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['sec-oauth-openid'],
        subtasks: [
          { id: 'sec-pen-1', name: 'Escanear una base de código en busca de credenciales expuestas u obsoletas usando herramientas SAST', completed: false },
          { id: 'sec-pen-2', name: 'Realizar auditorías automatizadas de puertos abiertos e inyecciones básicas usando escáneres DAST', completed: false },
          { id: 'sec-pen-3', name: 'Implementar políticas de bastionado de contenedores desactivando el acceso root innecesario', completed: false }
        ]
      }
    ]
  },
  {
    id: 'devops-roadmap',
    title: 'DevOps & Docker',
    description: 'Automatiza despliegues, gestiona contenedores aislados y configura flujos CI/CD estables.',
    icon: '🐳',
    nodes: [
      {
        id: 'devops-linux-cli',
        name: 'Fundamentos de Linux & CLI',
        description: 'Uso de bash/zsh, permisos de archivo (chmod/chown), monitorización de sistema y scripting básico.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'devops-lnx-1', name: 'Escribir un script bash automatizado que realice copias de seguridad de carpetas', completed: false },
          { id: 'devops-lnx-2', name: 'Verificar permisos y configurar accesos exclusivos con chmod 400', completed: false },
          { id: 'devops-lnx-3', name: 'Analizar procesos del sistema y consumo de recursos con top, htop o ps', completed: false }
        ]
      },
      {
        id: 'devops-docker-containers',
        name: 'Dockerización de Aplicaciones',
        description: 'Creación de Dockerfiles eficientes utilizando builds multi-etapa (multi-stage), volúmenes y Docker Compose.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['devops-linux-cli'],
        subtasks: [
          { id: 'devops-doc-1', name: 'Escribir un Dockerfile óptimo con multi-stage build para reducir el peso de la imagen', completed: false },
          { id: 'devops-doc-2', name: 'Montar volúmenes persistentes en contenedores de bases de datos para desarrollo local', completed: false },
          { id: 'devops-doc-3', name: 'Orquestar un entorno multi-contenedor (Frontend + Backend + DB) usando Docker Compose', completed: false }
        ]
      },
      {
        id: 'devops-cicd-github',
        name: 'Pipelines de Integración Continua (CI/CD)',
        description: 'Automatización de tests, linting, compilación y despliegues con GitHub Actions o GitLab CI.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['devops-docker-containers'],
        subtasks: [
          { id: 'devops-ci-1', name: 'Configurar un workflow de GitHub Actions que ejecute pruebas unitarias ante cada pull-request', completed: false },
          { id: 'devops-ci-2', name: 'Integrar validadores de sintaxis (linter) y compilaciones automatizadas en la pipeline', completed: false },
          { id: 'devops-ci-3', name: 'Desplegar automáticamente compilaciones estáticas de Frontend en servicios en la nube', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sql-databases-roadmap',
    title: 'SQL & Bases de Datos',
    description: 'Diseña esquemas relacionales óptimos, normaliza datos y optimiza consultas con índices.',
    icon: '💾',
    nodes: [
      {
        id: 'db-sql-basics',
        name: 'Fundamentos de SQL & DDL',
        description: 'Creación de tablas, claves primarias y foráneas, e inserciones con sintaxis estándar de SQL.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'db-sql-1', name: 'Diseñar un esquema relacional básico usando CREATE TABLE con constraints de tipos', completed: false },
          { id: 'db-sql-2', name: 'Manejar la integridad referencial configurando claves foráneas (Foreign Keys) estrictas', completed: false },
          { id: 'db-sql-3', name: 'Escribir sentencias INSERT, UPDATE y DELETE controlando restricciones de nulidad', completed: false }
        ]
      },
      {
        id: 'db-sql-joins',
        name: 'Consultas Complejas & Joins',
        description: 'Combinaciones de datos estructurados mediante INNER JOIN, LEFT JOIN, agrupaciones (GROUP BY) y funciones de agregación.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['db-sql-basics'],
        subtasks: [
          { id: 'db-join-1', name: 'Combinar registros de múltiples tablas asociativas utilizando INNER JOIN y LEFT JOIN', completed: false },
          { id: 'db-join-2', name: 'Agrupar registros y filtrar totales condicionales usando GROUP BY con HAVING', completed: false },
          { id: 'db-join-3', name: 'Escribir subconsultas y queries anidadas en sentencias de filtrado condicional', completed: false }
        ]
      },
      {
        id: 'db-indexes-optimization',
        name: 'Índices & Optimización de Consultas',
        description: 'Mejora drástica de tiempos de respuesta mediante índices (B-Tree), análisis de planes EXPLAIN y optimización de bloqueos.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['db-sql-joins'],
        subtasks: [
          { id: 'db-opt-1', name: 'Crear índices estratégicos sobre columnas de búsqueda habitual para evitar escaneos de tabla completa', completed: false },
          { id: 'db-opt-2', name: 'Analizar cuellos de botella de velocidad utilizando la sentencia EXPLAIN ANALYZE', completed: false },
          { id: 'db-opt-3', name: 'Implementar transacciones con control de aislamiento (ACID) para prevenir datos corruptos', completed: false }
        ]
      }
    ]
  },
  {
    id: 'ai-prompt-roadmap',
    title: 'AI & Prompt Engineering',
    description: 'Integra Inteligencia Artificial en tus proyectos. Domina APIs de LLMs, embeddings y prompts avanzados.',
    icon: '🤖',
    nodes: [
      {
        id: 'ai-prompt-basics',
        name: 'Ingeniería de Prompts Avanzada',
        description: 'Técnicas de Few-Shot Prompting, Chain of Thought, y configuración de temperaturas/parámetros en LLMs.',
        difficulty: 'basic',
        xp: 30,
        status: 'available',
        prerequisites: [],
        subtasks: [
          { id: 'ai-prm-1', name: 'Diseñar prompts estructurados con Few-Shot ejemplos para formatear respuestas JSON', completed: false },
          { id: 'ai-prm-2', name: 'Guiar el razonamiento lógico del modelo usando prompts Chain-of-Thought (paso a paso)', completed: false },
          { id: 'ai-prm-3', name: 'Controlar la creatividad de la IA modificando parámetros de temperatura, topP y topK', completed: false }
        ]
      },
      {
        id: 'ai-sdk-integration',
        name: 'Integración con SDKs (Gemini/OpenAI)',
        description: 'Uso práctico del SDK @google/genai, llamadas asíncronas, flujos con streaming de texto y subida de archivos.',
        difficulty: 'intermediate',
        xp: 100,
        status: 'locked',
        prerequisites: ['ai-prompt-basics'],
        subtasks: [
          { id: 'ai-sdk-1', name: 'Configurar e instanciar el cliente oficial de Gemini API del lado del servidor de forma segura', completed: false },
          { id: 'ai-sdk-2', name: 'Implementar respuestas en streaming de texto en tiempo real utilizando generators asíncronos', completed: false },
          { id: 'ai-sdk-3', name: 'Enviar entradas multimodales (textos e imágenes simultáneos) al modelo para análisis estructurado', completed: false }
        ]
      },
      {
        id: 'ai-rag-embeddings',
        name: 'Sistemas RAG & Bases de Datos Vectoriales',
        description: 'Arquitectura de generación aumentada por recuperación (RAG), generación de embeddings de texto y búsqueda semántica.',
        difficulty: 'advanced',
        xp: 250,
        status: 'locked',
        prerequisites: ['ai-sdk-integration'],
        subtasks: [
          { id: 'ai-rag-1', name: 'Estructurar fragmentos de documentos (chunks) y generar sus vectores numéricos (embeddings)', completed: false },
          { id: 'ai-rag-2', name: 'Consultar una base de datos vectorial mediante métricas de similitud de coseno para recuperar contexto', completed: false },
          { id: 'ai-rag-3', name: 'Inyectar los fragmentos recuperados en el prompt contextual del LLM para responder preguntas precisas', completed: false }
        ]
      }
    ]
  }
];
