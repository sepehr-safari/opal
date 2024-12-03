import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing } from '@/shared/types';

const housingFromEvent = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const name = event.getMatchingTags('name')?.[0]?.[1] || undefined;
  if (!name) return null;

  const description = event.getMatchingTags('description')?.[0]?.[1] || undefined;
  if (!description) return null;

  const location = event.getMatchingTags('location')?.[0]?.[1] || undefined;
  if (!location) return null;

  const isAvailableStr = event.getMatchingTags('isAvailable')?.[0]?.[1] || undefined;
  if (!isAvailableStr) return null;

  const isAvailable = isAvailableStr === 'true';

  const contact = event.getMatchingTags('contact')?.[0]?.[1] || undefined;
  if (!contact) return null;

  return {
    id: dTag,
    name,
    description,
    location,
    isAvailable,
    contact,
    housingEvent: event,
  } as Housing;
};

export const useHousingList = () => {
  const subId = 'housing';

  const { createSubscription, removeSubscription, isLoading, events } = useSubscription(subId);

  const housingList = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    return events.reduce((list: Housing[], event) => {
      const housing = housingFromEvent(event);
      if (housing) {
        list.push(housing);
      }
      return list;
    }, []);
  }, [events, isLoading]);

  useEffect(() => {
    createSubscription([
      { kinds: [NDKKind.AppSpecificData], limit: 100, '#t': ['opal/v0/housing'] },
    ]);

    return () => {
      removeSubscription();
    };
  }, [createSubscription, removeSubscription]);

  return { housingList };
};
