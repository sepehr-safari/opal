import { NDKEvent } from '@nostr-dev-kit/ndk';

import { HousingApplicationReview } from '@/shared/types';
import { getHTag } from '@/shared/utils';

export const parseHousingApplicationReview = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  const hTag = getHTag(event);
  if (!hTag) return null;

  return {
    eventAddress: event.tagAddress(),
    status,
    housingEventAddress: hTag,
    housingApplicationEventAddress: dTag,
    ndkEvent: event,
  } as HousingApplicationReview;
};
