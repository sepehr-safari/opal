import { NDKEvent } from '@nostr-dev-kit/ndk';

import { HousingApplication } from '@/shared/types';

export const parseHousingApplication = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  return {
    eventAddress: event.tagAddress(),
    housingEventAddress: dTag,
    ndkEvent: event,
    status,
  } as HousingApplication;
};
