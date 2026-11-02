import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'
import { env } from '../config/env.js'

const migrationsPath = fileURLToPath(new URL('./migrations', import.meta.url))
fs.mkdirSync(path.dirname(env.DATABASE_PATH), { recursive: true })
const sqlite = new Database(env.DATABASE_PATH)

sqlite.exec('CREATE TABLE IF NOT EXISTS __migrations (name TEXT PRIMARY KEY, executed_at TEXT NOT NULL)')

const migrationFiles = fs
  .readdirSync(migrationsPath)
  .filter((file) => file.endsWith('.sql'))
  .sort()

for (const migrationFile of migrationFiles) {
  const exists = sqlite
    .prepare('SELECT 1 FROM __migrations WHERE name = ? LIMIT 1')
    .get(migrationFile)

  if (exists) {
    continue
  }

  const sql = fs.readFileSync(path.join(migrationsPath, migrationFile), 'utf-8')
  sqlite.exec(sql)
  sqlite
    .prepare('INSERT INTO __migrations(name, executed_at) VALUES (?, ?)')
    .run(migrationFile, new Date().toISOString())
}

sqlite.close()
