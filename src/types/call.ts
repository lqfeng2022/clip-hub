// types/call.ts
export const STATES = ['idle', 'thinking', 'speaking', 'responded'] as const
export type CallState = typeof STATES[number]