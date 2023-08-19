# Podcaster app - by Manuel López Camarena

App desarrollada con las siguientes versiones:
```
npm 9.5.1
Nodejs 18.16.0
```

## Tecnologías y librerías usadas
* React 18
* MUI Material 5.14
* React Router 6.15
* React-Redux 8.1
* Redux-Saga 1.2
* React-Toastify 9.1.3
* Dayjs 1.11
* React Testing Library 14.0
* Cypress 12.17
* Vitest 0.34
* Vite 4.4

## Cómo usar la aplicación

En primer lugar y antes de todo, será necesario el siguiente comando para instalar todas las dependencias.

``` 
npm install
```

#### Ejecutar la aplicación en modo desarrollo
``` 
npm run dev
```

#### Ejecutar la aplicación en modo producción
``` 
npm run build
npm run preview
```

#### Ejecutar los tests e2e
``` 
npm run cypress
```

#### Ejecutar los tests unitarios
``` 
npm run test
```

#### Ejecutar los tests unitarios con cobertura
``` 
npm run dev:coverage
```


También podrán encontrar la aplicación desplegada en el siguiente link:

[LinkPlaceholder]()

## Arquitectura

La aplicación ha sido desarrollada en React, usando Vite como entorno de desarrollo y bundler del proyecto. Tomé esta decisión debido a la popularidad que Vite está ganando en los últimos meses, siendo ya el competidor más fuerte que ha tenido Webpack, herramienta estándar para estas tareas.

Se ha seguido una arquitectura basada en Flux usando Redux y Redux-Sagas para el control de efectos (en este caso, las llamadas a la API y el control de estas con otras acciones).
Debido a las condiciones dadas para la prueba técnica, podrían haberse usado otras alternativas a Redux y Sagas, como por ejemplo, React Query o useSWR para la gestión de peticiones y ContextAPI para la gestión de estados, estas librerías también habrían ofrecido una solución fácil para el requerimiento de la caché.

En mi caso, esta caché es gestionada directamente en Redux, guardando la info de cada petición en la lista y en cada podcast de la lista cuando se traigan los detalles la primera vez. De esta forma, como el estado de Redux se persiste con Redux-Persist, sólo harán las peticiones si ese lastFetch no existe o han pasado más de 24h. Esta técnica se conoce como **Redux caching**.

Quizás, la arquitectura de Redux puede llegar a ser un poco compleja y extensa para una aplicación de esta envergadura, pero aporta varias facilidades como el ser muy escalable para el desarrollo de nuevas funcionalidades, aporta separación de responsabilidades, y sigue un flujo de datos unidireccional, lo que hace que sea fácilmente mantenible.

La estructura de directorios seguida es la siguiente:

- **src/**
   - **\_\_tests\_\_/**: contendrá todos los tests unitarios de la app
   - **components/**: contendrá todos los componentes con lógica de la app
   - **lib/**: contendrá diversos directorios con funcionalidades de la app
      - **components-ui/**: contendrá componentes visuales o con lógica mínima de la app, estos son usados en conjunto a otros o de forma extendida en src/components
      - **config/**: contendrá ficheros de configuración, en este caso, sólo el archivo de la versión.
      - **constants/**: contendrá ficheros constantes usadas en toda la app
      - **hocs/**: contendrá High Order Components con funcionalidad extra a los wrappers necesarios
      - **hooks/**: contendrá diversos hooks personalizados
      - **models/**: contendrá todos los modelos y/o tipos usados en la app
      - **store/**: contendrá directorios para todas las entidades usadas en la arquitectura de Redux, como slices, selectores, sagas, servicios... y el archivo de inicialización de la store.
      - **utils/**: contendrá una serie de ficheros con diversas utilidades y operaciones lógicas más extensas y complejas para evitar este código en los componentes, y que sea reutilizable.
- **cypress/**: contendrá toda la estructura de directorios necesaria para los tests e2e
- **public/**: contendrá fuentes e imágenes usadas en la app.

## Detalles a mencionar

- Se han introducido ligeras mejoras de estilo en la app en base al diseño propuesto.
- Se pedía que el spinner superior de la derecha, en la barra de navegación, apareciese cada vez que se hace una navegación en la aplicación, pero al ser una SPA, esto pierde un poco el sentido ya que lo que es la navegación en cliente es instantánea, por lo tanto, este spinner se muestra en la carga de datos de una pantalla a otra (se muestra también otro spinner). No obstante, si se quiere mostrar también cuando navega, existe un componente creado en ``src/lib/hocs/`` llamado **NavigationControllerWrapper**, que es un componente que gestiona este comportamiento, para que sea efectivo, habría que usarlo como Wrapper en el elemento de la ruta raíz en la definición de enroutamiento, que está en el componente ``src/components/Router``.
- Se han configurado entornos y variables de entorno, quizás no útil en esta app, ya que la información a guardar en estas variables como las URL de las API son las mismas en ambos entornos, pero de esta manera, ya es usable si se quiere escalar. Para marcar en qué entorno estamos, si arrancamos la app en el entorno de desarrollo, aparecerá un Banner con la versión en la que estamos e indicando que estamos en dicho entorno, mientras que esto no aparecerá en producción.