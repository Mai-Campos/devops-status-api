# DevOps Status API

API REST desarrollada con NestJS y TypeScript para registrar y consultar el estado de servicios.

Este proyecto sirve como laboratorio práctico para aprender Docker, CI/CD, despliegue y observabilidad.

## Tecnologías

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Docker
- Docker Compose
- pnpm

## Funcionalidades

- Registrar comprobaciones de servicios.
- Consultar todas las comprobaciones.
- Consultar una comprobación por ID.
- Obtener estadísticas de los servicios.

## Requisitos

- Docker Engine
- Docker Compose
- Git

## Ejecutar el proyecto

Construir las imágenes e iniciar los servicios:

```bash
docker compose up -d --build
```

Comprobar el estado de los contenedores:

```bash
docker compose ps
```

Consultar los logs de la API:

```bash
docker compose logs --tail=50 api
```

Probar el endpoint de comprobaciones:

```bash
curl -i http://localhost:3000/checks
```

## Detener los servicios

```bash
docker compose down
```

## Objetivo de aprendizaje

Construir progresivamente un flujo DevOps que incluya integración continua, construcción automatizada de imágenes Docker, despliegue y monitorización.
