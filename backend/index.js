const express = require("express");
const cors = require("cors");
require("./db"); // sobe o SQLite (cria tabela/seed) antes das rotas
const eventosRouter = require("./routes/eventos");

const app = express();
const PORT = process.env.PORT || 3000;

// Permite o frontend (outra origem) chamar esta API no browser
app.use(cors());
// Lê o body JSON das requisições POST/PUT e coloca em req.body
app.use(express.json());

/**
 * O que: health check da API.
 * Como: responde JSON { ok: true } com status 200.
 * Por quê: serve para testar se o servidor está no ar (local ou Render) sem depender do CRUD.
 */
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Encaminha tudo que começa com /eventos para o arquivo de rotas do recurso
app.use("/eventos", eventosRouter);

/**
 * O que: inicia o servidor HTTP.
 * Como: escuta na PORT (env no Render, ou 3000 no PC).
 * Por quê: sem listen a API não recebe requisições.
 */
app.listen(PORT, () => {
  console.log(`API em http://localhost:${PORT}`);
});
