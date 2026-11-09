# Roteiro — Aula de Frontend (4h)

**Projeto:** ENCOMP Agenda · consumir a API  
**Arquivos:** `index.html` · `css/styles.css` · `js/app.js` (curtos)  
**Premissa:** URL da API no quadro (`API_BASE`)

---

## Objetivo

Digitar juntos uma página que lista, cria, edita e exclui eventos com `fetch`. Sem framework.

---

## Pré-requisitos

- [ ] Live Server ou `npx serve` (não use `file://`)
- [ ] Thunder Client para conferir a API
- [ ] URL do Render no quadro

---

## Bloco 1 — Teoria (0:00–0:15)

Slides `slides-frontend.pdf`.

- `fetch`, DOM, CORS, mapa tela ↔ HTTP
- Estrutura dos 3 arquivos

**Depois:** prática.

---

## Bloco 2 — HTML (0:15–0:45)

- `h1`, `#msg`, formulário (`titulo`, `data`, `local`, `status`)
- hidden `eventoId`, lista `#lista`
- usar `name` nos campos

**Saída:** página estática.

---

## Bloco 3 — CSS curto (0:45–1:15)

- centralizar `main`, form em grid, `li` simples
- botões salvar / editar / excluir

**Saída:** UI legível.

---

## Bloco 4 — Listar (1:15–2:00)

- `API_BASE` + `carregar()` com `GET /eventos`
- montar `li` no DOM

**Saída:** dados na tela.

---

## Bloco 5 — Criar e editar (2:00–2:50)

- `form.onsubmit` → POST ou PUT
- botão Editar preenche o form
- mostrar erro 400 em `#msg`

**Saída:** salvar pelo browser.

---

## Bloco 6 — Excluir + fechar (2:50–4:00)

- botão Excluir + `confirm` + DELETE
- buffer para quem atrasou
- recap: request → API → JSON → DOM

**Entrega:** front falando com a API.

---

## Checklist

- [ ] Lista carrega
- [ ] Criar / editar / excluir ok
- [ ] Erro da API aparece em `#msg`

## Cola

```js
const API_BASE = "https://SUA-URL.onrender.com";
```

| Tela | Método | Caminho |
|------|--------|---------|
| Lista | GET | `/eventos` |
| Novo | POST | `/eventos` |
| Editar | PUT | `/eventos/:id` |
| Excluir | DELETE | `/eventos/:id` |
