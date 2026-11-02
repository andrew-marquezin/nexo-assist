import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { env } from '../config/env.js'
import * as schema from './schema.js'

const databaseDirectory = path.dirname(env.DATABASE_PATH)
fs.mkdirSync(databaseDirectory, { recursive: true })

const sqlite = new Database(env.DATABASE_PATH)
export const db = drizzle(sqlite, { schema })
