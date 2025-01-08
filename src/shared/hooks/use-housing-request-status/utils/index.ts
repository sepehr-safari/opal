import { NDKEvent } from '@nostr-dev-kit/ndk';

import { HousingRequestStatus } from '@/shared/types';

export const housingRequestStatusFromEvent = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  return {
    id: dTag,
    status,
    housingRequestStatusEvent: event,
  } as HousingRequestStatus;
};
