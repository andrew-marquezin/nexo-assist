import { z } from 'zod'

export const roleValues = ['employee', 'analyst'] as const
export type Role = (typeof roleValues)[number]

export const ticketTypeValues = ['incident', 'request'] as const
export type TicketType = (typeof ticketTypeValues)[number]

export const categoryValues = ['hardware', 'software', 'access', 'network', 'other'] as const
export type Category = (typeof categoryValues)[number]

export const priorityValues = ['low', 'medium', 'high', 'critical'] as const
export type Priority = (typeof priorityValues)[number]

export const conversationStatusValues = ['agent', 'waiting_analyst', 'analyst', 'closed'] as const
export type ConversationStatus = (typeof conversationStatusValues)[number]

export const healthResponseSchema = z.object({
  status: z.literal('ok')
})

export const ticketSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string()
})

export type HealthResponse = z.infer<typeof healthResponseSchema>
export type TicketSummary = z.infer<typeof ticketSummarySchema>
