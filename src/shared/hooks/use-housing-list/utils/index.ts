import { NDKEvent } from '@nostr-dev-kit/ndk';

import { Housing } from '@/shared/types';

export const housingFromEvent = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const name = event.getMatchingTags('N')?.[0]?.[1] || undefined;
  if (!name) return null;

  const description = event.getMatchingTags('description')?.[0]?.[1] || undefined;
  if (!description) return null;

  const location = event.getMatchingTags('location')?.[0]?.[1] || undefined;
  if (!location) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  const contact = event.getMatchingTags('contact')?.[0]?.[1] || undefined;
  if (!contact) return null;

  // contact should be a string starting with a + and followed by numbers
  if (!contact.match(/^\+\d+$/)) return null;

  return {
    id: dTag,
    agencyPubkey: event.pubkey,
    name,
    description,
    location,
    status,
    contact,
    housingEvent: event,
  } as Housing;
};
