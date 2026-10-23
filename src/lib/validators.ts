import { z } from 'zod';

/**
 * Validation messages are returned as translation keys and resolved in the
 * form component, so errors follow the selected language.
 */
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, { message: 'name' }).max(120),
    phone: z
      .string()
      .trim()
      .refine((value) => value.replace(/\D/g, '').length >= 7, { message: 'phone' }),
    guests: z
      .string()
      .trim()
      .min(1, { message: 'guests' })
      .refine((value) => Number(value) >= 1 && Number(value) <= 20, { message: 'guests' }),
    message: z.string().trim().max(1200).optional().or(z.literal('')),
    /** Honeypot — humans never see it, bots fill it. Must stay empty. */
    company: z.string().max(0).optional().or(z.literal('')),
  });

export type EnquiryValues = z.infer<typeof enquirySchema>;
