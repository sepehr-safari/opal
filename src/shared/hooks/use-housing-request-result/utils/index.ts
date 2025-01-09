import { NDKEvent } from '@nostr-dev-kit/ndk';

import { HousingRequestResult } from '@/shared/types';

export const housingRequestResultFromEvent = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const result = event.getMatchingTags('r')?.[0]?.[1] || undefined;
  if (!result) return null;

  return {
    id: dTag,
    result,
    housingRequestResultEvent: event,
  } as HousingRequestResult;
};
