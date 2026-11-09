# Backend — ENCOMP Agenda API

Arquitetura enxuta (3 arquivos de código):

```text
backend/
  index.js           # sobe o servidor, middlewares, /health
  db.js              # conexão SQLite + tabela + seed
  routes/eventos.js  # CRUD de /eventos
  data/agenda.db     # gerado em runtime (não versionar)
```

## Por que separar?

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.js` | entrada da aplicação |
| `db.js` | persistência |
| `routes/eventos.js` | regras HTTP do recurso |

Mesma ideia de projetos maiores, sem excesso de pastas.

## Rodar local

```bash
cd backend
npm install
npm start
```

API em `http://localhost:3000`.

## Endpoints

| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/health` | Health check |
| GET | `/eventos` | Listar |
| POST | `/eventos` | Criar |
| PUT | `/eventos/:id` | Atualizar |
| DELETE | `/eventos/:id` | Remover |

Body: `titulo`, `data`, `local` (obrigatórios) e `status` (opcional).

## Deploy no Render

Root Directory: `backend` · Build: `npm install` · Start: `npm start`
