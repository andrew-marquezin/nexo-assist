# Nexo Assist

Esqueleto inicial do Nexo Assist (service desk de TI).

## Pré-requisitos

- Node.js 22+
- npm 10+
- Docker + Docker Compose (opcional)

## Rodando localmente

1. Copie as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
2. Preencha ao menos `SESSION_SECRET` no `.env`.
3. Instale dependências:
   ```bash
   npm install
   ```
4. Rode migrações e seed:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Suba API + Web com hot reload:
   ```bash
   npm run dev
   ```

- Web: http://localhost:5173
- API health: http://localhost:3000/api/health

## Docker

### Produção-like (container único)

```bash
docker compose up --build
```

### Desenvolvimento (web + api separados)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Estrutura

```text
apps/
  api/
    src/
      agent/
      config/
      db/
      lib/
      middleware/
      routes/
      services/
      server.ts
  web/
packages/
  shared/
```

## Scripts principais

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
- `npm run db:migrate`
- `npm run db:seed`

## Decisões de arquitetura (inicial)

- Monorepo com npm workspaces (`apps/web`, `apps/api`, `packages/shared`).
- Contratos básicos compartilhados via `packages/shared` com enums/tipos e schemas zod.
- API em Express + TypeScript com validação de env por zod.
- Persistência preparada para SQLite + Drizzle com migração SQL inicial.
- Em produção, o Express serve os estáticos do build do web no mesmo container.
