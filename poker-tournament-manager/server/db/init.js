const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'tournament.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function runMigrations(db) {
  const migrationsDir = path.join(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) return;
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    try {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      db.exec(sql);
    } catch (e) {
      if (e.message && (e.message.includes('duplicate column') || e.message.includes('already exists'))) {
        // Migration already applied, skip
      } else {
        throw e;
      }
    }
  }
}

function initDb() {
  ensureDataDir();
  const db = new Database(DB_PATH);
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  runMigrations(db);
  return db;
}

let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = initDb();
  }
  return dbInstance;
}

module.exports = { initDb, getDb, DB_PATH };
