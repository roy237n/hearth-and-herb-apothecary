import { z } from 'zod';
export const contactSchema = z.object({ name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254), subject: z.string().trim().min(1).max(200), message: z.string().trim().min(1).max(5000), website: z.string().max(0).default('') });
export const chatStartSchema = contactSchema.pick({ name: true, email: true, website: true });
export const capabilitySchema = z.object({ id: z.string().uuid(), token: z.string().regex(/^[a-f0-9]{64}$/) });
export const chatSendSchema = capabilitySchema.extend({ body: z.string().trim().min(1).max(2000) });
export function safeHttps(value: string) { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : undefined; } catch { return undefined; } }
