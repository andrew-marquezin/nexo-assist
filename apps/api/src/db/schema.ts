import { categoryValues, conversationStatusValues, priorityValues, roleValues, ticketTypeValues } from '@nexo-assist/shared'
import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role', { enum: roleValues }).notNull().default('employee')
})

export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  ownerUserId: integer('owner_user_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type', { enum: ticketTypeValues }).notNull(),
  category: text('category', { enum: categoryValues }).notNull(),
  priority: text('priority', { enum: priorityValues }).notNull(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  dueAt: integer('due_at', { mode: 'timestamp_ms' })
})

export const kbArticles = sqliteTable('kb_articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  category: text('category', { enum: categoryValues }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
})

export const conversations = sqliteTable('conversations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  status: text('status', { enum: conversationStatusValues }).notNull().default('agent'),
  assignedAnalystId: integer('assigned_analyst_id').references(() => users.id),
  messageCount: integer('message_count').notNull().default(0)
})

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id),
  role: text('role').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull()
})

export const agentSteps = sqliteTable('agent_steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  messageId: integer('message_id')
    .notNull()
    .references(() => messages.id),
  action: text('action').notNull(),
  understanding: text('understanding').notNull(),
  confidence: integer('confidence').notNull(),
  reasoning: text('reasoning').notNull(),
  payload: text('payload', { mode: 'json' }).$type<Record<string, unknown> | null>(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull()
})

export const conversationsRelations = relations(conversations, ({ many }) => ({
  messages: many(messages)
}))
