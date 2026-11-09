const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

/**
 * O que: prepara a pasta e o arquivo do banco SQLite.
 * Como: se data/ não existe, cria; abre (ou cria) agenda.db com better-sqlite3.
 * Por quê: centralizar a persistência aqui deixa index.js só com HTTP e routes só com CRUD.
 */
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const db = new Database(path.join(dataDir, "agenda.db"));

/**
 * O que: garante que a tabela eventos existe.
 * Como: CREATE TABLE IF NOT EXISTS com os campos do recurso.
 * Por quê: na primeira execução (ou após apagar o .db) o schema já fica pronto.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS eventos (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    data TEXT NOT NULL,
    local TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'agendado'
  )
`);

/**
 * O que: popula o banco com 2 eventos de exemplo se estiver vazio.
 * Como: conta linhas; se for 0, faz dois INSERTs.
 * Por quê: a turma já vê dados no primeiro GET, sem precisar cadastrar na mão.
 */
if (db.prepare("SELECT COUNT(*) AS n FROM eventos").get().n === 0) {
  db.prepare(
    "INSERT INTO eventos (id, titulo, data, local, status) VALUES (?, ?, ?, ?, ?)",
  ).run("1", "Abertura", "2026-10-23", "Auditório", "agendado");
  db.prepare(
    "INSERT INTO eventos (id, titulo, data, local, status) VALUES (?, ?, ?, ?, ?)",
  ).run("2", "Minicurso Frontend", "2026-10-24", "Lab 1", "agendado");
}

// Exporta a conexão para as rotas usarem nas queries
module.exports = db;
