import { NDKEvent } from '@nostr-dev-kit/ndk';
import { z } from 'zod';

export type UserRole = 'agency' | 'peh';

export const housingSchema = z.object({
  id: z.string().optional(),
  agencyPubkey: z.string().optional(),
  housingEvent: z.instanceof(NDKEvent).optional(),
  status: z.enum(['Available', 'NotAvailable']),
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  location: z.string().min(1, { message: 'Required' }),
  totalUnits: z.coerce.number().int().min(1, { message: 'Must be at least 1' }),
  availableUnits: z.coerce.number().int().min(0, { message: 'Must be at least 0' }),
  maxStay: z.coerce.number().int().min(1, { message: 'Must be at least 1' }),
  contactPhone: z.string().min(1, { message: 'Required' }),
  contactFullname: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPosition: z.string().optional(),
});

export type Housing = z.infer<typeof housingSchema>;

export const housingApplicationSchema = z.object({
  eventAddress: z.string().optional(),
  status: z.enum(['Applied', 'NotApplied']),
  housingEventAddress: z.string().optional(),
  ndkEvent: z.instanceof(NDKEvent).optional(),
  stayDuration: z.coerce.number().int().min(1, { message: 'Must be at least 1' }),
});

export type HousingApplication = z.infer<typeof housingApplicationSchema>;

export type HousingApplicationReview = {
  eventAddress: string;
  status: 'Approved' | 'Rejected' | 'Stalled';
  housingEventAddress: string;
  housingApplicationEventAddress: string;
  ndkEvent: NDKEvent;
};

export enum OpalTag {
  Housing = 'opal/v0.23/housing',
  HousingApplication = 'opal/v0.23/housing-application',
  HousingApplicationReview = 'opal/v0.23/housing-application-review',
  UserRole = 'opal/v0.23/user-role',
}
