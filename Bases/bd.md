# Configuración de la Base de Datos para ProTactics

## **Tablas y Relaciones**

### **1. Tabla: Usuarios**
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'usuario', -- 'usuario', 'administrador'
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);
```

### 2. Tabla: Entrenamientos
```sql

CREATE TABLE entrenamientos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    titulo VARCHAR(100) NOT NULL,
    tipo_deporte VARCHAR(50) NOT NULL, -- Ejemplo: 'fútbol', 'natación'
    descripcion TEXT,
    duracion INTERVAL NOT NULL,
    distancia FLOAT,
    desnivel_acumulado FLOAT,
    calorias_quemadas FLOAT,
    inicio TIMESTAMP NOT NULL,
    fin TIMESTAMP,
    visibilidad VARCHAR(20) DEFAULT 'publico', -- 'publico', 'privado', 'amigos'
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);
```

### 3. Tabla: Etiquetas
```sql
CREATE TABLE etiquetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);
```
### 4. Relación: Entrenamientos y Etiquetas
```sql

CREATE TABLE entrenamiento_etiquetas (
    entrenamiento_id INTEGER NOT NULL REFERENCES entrenamientos(id),
    etiqueta_id INTEGER NOT NULL REFERENCES etiquetas(id),
    PRIMARY KEY (entrenamiento_id, etiqueta_id)
);
```
### 5. Tabla: Plantillas de Entrenamientos
```sql

CREATE TABLE plantillas_entrenamientos (
    id SERIAL PRIMARY KEY,
    tipo_deporte VARCHAR(50) NOT NULL,
    nombre_plantilla VARCHAR(100) NOT NULL,
    campos JSONB NOT NULL, -- Configuración específica en formato JSON
    creado_en TIMESTAMP DEFAULT NOW()
);
```
### 6. Relación: Entrenamientos y Plantillas
```sql

CREATE TABLE asignacion_plantillas (
    entrenamiento_id INTEGER NOT NULL REFERENCES entrenamientos(id),
    plantilla_id INTEGER NOT NULL REFERENCES plantillas_entrenamientos(id),
    PRIMARY KEY (entrenamiento_id, plantilla_id)
);
```
### 7. Tabla: Registros de Progreso
```sql

CREATE TABLE registros_progreso (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    entrenamiento_id INTEGER NOT NULL REFERENCES entrenamientos(id),
    nombre_metrica VARCHAR(50) NOT NULL,
    valor_metrica FLOAT NOT NULL,
    registrado_en TIMESTAMP DEFAULT NOW()
);
```
### 8. Tabla: Detalles de Entrenamientos
```sql

CREATE TABLE detalles_entrenamientos (
    id SERIAL PRIMARY KEY,
    entrenamiento_id INTEGER NOT NULL REFERENCES entrenamientos(id),
    numero_vuelta INTEGER NOT NULL,
    tiempo_vuelta INTERVAL NOT NULL,
    velocidad_media FLOAT,
    velocidad_maxima FLOAT,
    frecuencia_cardiaca_media INTEGER,
    frecuencia_cardiaca_maxima INTEGER,
    potencia FLOAT,
    cadencia INTEGER
);
```
### 9. Tabla: Comentarios
```sql

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    entrenamiento_id INTEGER NOT NULL REFERENCES entrenamientos(id),
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    contenido TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);
```
### 10. Tabla: Actividades Recientes
```sql

CREATE TABLE actividades_recientes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    descripcion TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);
```
### 11. Tabla: Estadísticas Globales
```sql

CREATE TABLE estadisticas_globales (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    distancia_total FLOAT,
    tiempo_total INTERVAL,
    entrenamientos_totales INTEGER,
    desnivel_total FLOAT,
    calorias_totales FLOAT,
    entrenamientos_mensuales INTEGER DEFAULT 0,
    distancia_mensual FLOAT DEFAULT 0
);
```
### 12. Tabla: Seguimientos
```sql

CREATE TABLE seguimientos (
    seguidor_id INTEGER NOT NULL REFERENCES usuarios(id),
    seguido_id INTEGER NOT NULL REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (seguidor_id, seguido_id)
);
```
