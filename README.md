# PsyBot - Monorepo

PsyBot es una herramienta de asistencia conversacional para psicólogos profesionales, basada en inteligencia artificial. Este repositorio contiene tanto el **frontend** como el **backend** del proyecto en un solo monorepo.

---

## Estructura del repositorio

/client # Aplicación frontend (React + Vite)
/backend # API backend (Flask)
/docker-compose.yml # Orquestación de servicios (DB, backend, frontend)
/README.md # Este archivo

yaml
Copiar
Editar

---

## Variables de entorno

### Cliente (`/client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```
Backend (/backend/.env)
```env

# OpenRouter API configuration
OPENROUTER_API_KEY=tu_api_key_aqui
OPENROUTER_API_BASE=https://openrouter.ai/api/v1

# Database configuration
DB_NAME=psybdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Flask configuration
FLASK_ENV=development

# JWT configuration
JWT_SECRET=una_clave_secreta_segura

# CORS configuration
CLIENT_ORIGIN=http://localhost:5173
```

Requisitos previos
Node.js (v16+ recomendado)

Python 3.9+

Docker y Docker Compose (opcional pero recomendado para desarrollo)

Instalación y ejecución
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/tu-usuario/psybot.git
cd psybot
2. Levantar servicios con Docker Compose
Esto levantará base de datos, backend y frontend:

bash
Copiar
Editar
docker-compose up --build
Nota: Asegúrate de tener los archivos .env configurados correctamente.

URLs y puertos por defecto
Frontend: http://localhost:3000

Backend: http://localhost:5000

PostgreSQL: puerto 5432 (Docker)
