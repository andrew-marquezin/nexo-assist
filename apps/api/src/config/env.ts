import path from 'node:path'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_PATH: z.string().default('./data/nexo.db'),
  SESSION_SECRET: z.string().min(1).default('dev-session-secret'),
  LLM_PROVIDER: z.string().default(''),
  LLM_MODEL: z.string().default(''),
  LLM_API_KEY: z.string().default('')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${parsed.error.message}`)
}

export const env = {
  ...parsed.data,
  DATABASE_PATH: path.resolve(process.cwd(), parsed.data.DATABASE_PATH)
}
