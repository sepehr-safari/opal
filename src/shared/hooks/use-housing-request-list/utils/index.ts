import { HousingRequest } from '@/shared/types';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export const housingRequestFromEvent = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  return {
    id: dTag,
    pehPubkey: event.pubkey,
    status,
    housingRequestEvent: event,
  } as HousingRequest;
};
