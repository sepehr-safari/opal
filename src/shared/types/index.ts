import { NDKEvent } from '@nostr-dev-kit/ndk';

export type UserRole = 'agency' | 'peh';

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

export type HousingRequest = {
  id: string;
  pehPubkey: string;
  status: string;
  housingRequestEvent: NDKEvent;
};

export type HousingRequestStatus = {
  id: string;
  status: string;
  housingRequestStatusEvent: NDKEvent;
};
