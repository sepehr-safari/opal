import { NDKEvent } from '@nostr-dev-kit/ndk';
import { z } from 'zod';

export type UserRole = 'agency' | 'peh';

export const housingSchema = z.object({
  id: z.string().optional(),
  agencyPubkey: z.string().optional(),
  housingEvent: z.instanceof(NDKEvent).optional(),
  status: z.string(),
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  location: z.string().min(1, { message: 'Required' }),
  totalUnits: z.coerce.number().int().min(1, { message: 'Must be at least 1' }),
  availableUnits: z.coerce.number().int().min(0, { message: 'Must be at least 0' }),
  maxStay: z.coerce.number().int().min(1, { message: 'Must be at least 1' }),
  contactPhone: z
    .string()
    .min(1, { message: 'Required' })
    .regex(/^\+/, { message: 'Phone number must start with a +' }),
  contactFullname: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPosition: z.string().optional(),
});

export type Housing = z.infer<typeof housingSchema>;

export type HousingRequest = {
  id: string;
  pehPubkey: string;
  status: string;
  housingRequestEvent: NDKEvent;
};

export type HousingRequestResult = {
  id: string;
  result: string;
  housingRequestResultEvent: NDKEvent;
};
