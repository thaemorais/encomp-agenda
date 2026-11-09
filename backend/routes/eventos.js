const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * O que: verifica se já existe evento com o mesmo título E a mesma data.
 * Como: SELECT por titulo + data; no PUT ignora o próprio id.
 * Por quê: permite o mesmo título em dias diferentes, mas não dois iguais no mesmo dia.
 */
function eventoDuplicado(titulo, data, idAtual) {
  const row = db
    .prepare("SELECT id FROM eventos WHERE titulo = ? AND data = ?")
    .get(titulo, data);

  if (!row) return false;
  if (idAtual && row.id === idAtual) return false;
  return true;
}

/**
 * O que: lista todos os eventos.
 * Como: SELECT * ordenado por data; devolve o array em JSON.
 * Por quê: o frontend precisa de um GET para montar a tela inicial e após cada alteração.
 */
router.get("/", (req, res) => {
  const eventos = db.prepare("SELECT * FROM eventos ORDER BY data").all();
  res.json(eventos);
});

/**
 * O que: cria um novo evento.
 * Como: lê o body, valida campos e duplicidade título+data, gera id, INSERT e responde 201.
 * Por quê: é o C do CRUD; status padrão "agendado" evita exigir o campo sempre.
 */
router.post("/", (req, res) => {
  const { titulo, data, local, status } = req.body || {};

  if (!titulo || !data || !local) {
    return res.status(400).json({ erro: "titulo, data e local são obrigatórios" });
  }

  if (eventoDuplicado(titulo, data)) {
    return res
      .status(400)
      .json({ erro: "já existe um evento com este título nesta data" });
  }

  const novo = {
    id: String(Date.now()),
    titulo,
    data,
    local,
    status: status || "agendado",
  };

  db.prepare(
    "INSERT INTO eventos (id, titulo, data, local, status) VALUES (@id, @titulo, @data, @local, @status)",
  ).run(novo);

  res.status(201).json(novo);
});

/**
 * O que: atualiza um evento existente pelo id da URL.
 * Como: valida body e duplicidade título+data, roda UPDATE; se changes === 0, responde 404.
 * Por quê: é o U do CRUD; o front manda PUT quando o formulário já tem eventoId.
 */
router.put("/:id", (req, res) => {
  const { titulo, data, local, status } = req.body || {};

  if (!titulo || !data || !local) {
    return res.status(400).json({ erro: "titulo, data e local são obrigatórios" });
  }

  if (eventoDuplicado(titulo, data, req.params.id)) {
    return res
      .status(400)
      .json({ erro: "já existe um evento com este título nesta data" });
  }

  const info = db
    .prepare(
      "UPDATE eventos SET titulo = ?, data = ?, local = ?, status = ? WHERE id = ?",
    )
    .run(titulo, data, local, status || "agendado", req.params.id);

  if (info.changes === 0) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.json({
    id: req.params.id,
    titulo,
    data,
    local,
    status: status || "agendado",
  });
});

/**
 * O que: remove um evento pelo id.
 * Como: DELETE WHERE id; se nada foi apagado, 404; senão 204 sem body.
 * Por quê: é o D do CRUD; 204 significa sucesso sem conteúdo para devolver.
 */
router.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM eventos WHERE id = ?").run(req.params.id);

  if (info.changes === 0) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.status(204).send();
});

module.exports = router;
