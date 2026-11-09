---
marp: true
title: ENCOMP — Frontend · Teoria e prática
paginate: true
theme: default
style: |
  section { font-family: "Segoe UI", system-ui, sans-serif; }
  h1, h2 { color: #0f6b5c; }
  code { background: #eef6f4; color: #0b5347; }
  table { font-size: 0.88em; }
---

<!-- _paginate: false -->

# ENCOMP Agenda
## Frontend · consumindo a API

Teoria rápida → prática no projeto

**4h** · HTML · CSS · JavaScript · `fetch`

---

# O projeto de hoje

A **API já existe** (URL no quadro).

Vamos montar a página da agenda que:

- lista eventos
- cria, edita e exclui via `fetch`
- mostra loading, vazio e erro

Sem React. Sem bundler. Vanilla.

---

# Teoria 1 · Arquitetura

```text
index.html + styles.css + app.js
              │
              │  fetch(API_BASE + "/eventos")
              ▼
         API (Render)
              │
              ▼
           SQLite
```

`API_BASE` = URL que o instrutor colocou no quadro.

---

# Teoria 2 · Tela ↔ HTTP

| Na interface | Método | Caminho |
|--------------|--------|---------|
| Ver lista | GET | `/eventos` |
| Salvar novo | POST | `/eventos` |
| Atualizar | PUT | `/eventos/:id` |
| Excluir | DELETE | `/eventos/:id` |

O front monta a request e redesenha o DOM com a resposta.

---

# Teoria 3 · fetch + DOM

```js
const res = await fetch(`${API_BASE}/eventos`);
const dados = await res.json();
```

Fluxo:

1. API devolve JSON  
2. JS vira HTML (lista)  
3. Clique → novo `fetch` → atualiza a tela  

Sempre tratar `res.ok` e erros.

---

# Teoria 4 · CORS e como abrir o front

Front em `localhost` · API em outro domínio.

A API já libera CORS. O browser ainda exige HTTP.

**Não usem `file://`.**  
Usem **Live Server** ou `npx serve` na pasta `frontend`.

---

# Da teoria à prática

Só **3 arquivos** curtos:

1. `index.html` (form + lista)
2. `styles.css` (básico)
3. `app.js` (`fetch` + DOM)

Ordem: HTML → CSS → listar → salvar → editar/excluir

---

# Hora da prática

1. Colem a URL do quadro em `API_BASE`
2. Live Server ou `npx serve` (não `file://`)
3. Digitem junto comigo

**Primeiro passo:** HTML do formulário + `#lista`.

Vamos ao código.
