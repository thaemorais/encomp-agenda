# Materiais de aula

## Slides (teoria breve → prática do projeto)

| Arquivo | Uso |
|---------|-----|
| [slides-backend.pdf](slides-backend.pdf) | Dia 1: conceitos + encaminha para o código |
| [slides-frontend.pdf](slides-frontend.pdf) | Dia 2: conceitos + encaminha para o código |
| `.md` correspondentes | Fonte editável (Marp) |

Apresentar no navegador:

```bash
npx @marp-team/marp-cli -s docs/aulas/slides-backend.md
npx @marp-team/marp-cli -s docs/aulas/slides-frontend.md
```

Regenerar PDF:

```bash
npx @marp-team/marp-cli docs/aulas/slides-backend.md --pdf -o docs/aulas/slides-backend.pdf
npx @marp-team/marp-cli docs/aulas/slides-frontend.md --pdf -o docs/aulas/slides-frontend.pdf
```

## Roteiros (um PDF por aula)

| Arquivo | Uso |
|---------|-----|
| [roteiro-backend.pdf](roteiro-backend.pdf) | Instrutor no dia 1 (blocos, checklist, cola) |
| [roteiro-frontend.pdf](roteiro-frontend.pdf) | Instrutor no dia 2 (blocos, checklist, cola) |
| `.md` correspondentes | Fonte editável |

```bash
npx md-to-pdf docs/aulas/roteiro-backend.md --config-file docs/aulas/md-to-pdf-config.js
npx md-to-pdf docs/aulas/roteiro-frontend.md --config-file docs/aulas/md-to-pdf-config.js
```

## Extra

[roteiro-aulas.pdf](roteiro-aulas.pdf) é a versão antiga unificada (dias 1+2). Prefira os roteiros separados acima.
