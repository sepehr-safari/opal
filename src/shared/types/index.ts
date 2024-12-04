import { NDKEvent } from '@nostr-dev-kit/ndk';

export enum UserRole {
  Peh = 'peh',
  Agency = 'agency',
}

export type Housing = {
  id: string;
  agencyPubkey: string;
  name: string;
  description: string;
  location: string;
  status: string;
  contact: string;
  housingEvent: NDKEvent;
};
