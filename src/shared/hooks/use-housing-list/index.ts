import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing } from '@/shared/types';

import { housingFromEvent } from './utils';

export const useHousingList = (housingId?: string) => {
  const subId = `housing-${housingId}`;

  const { createSubscription, removeSubscription, isLoading, events } = useSubscription(subId);

  const housingList = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const list = events.reduce((list: Housing[], event) => {
      const housing = housingFromEvent(event);
      if (housing) {
        list.push(housing);
      }
      return list;
    }, []);

    return list.length ? list : null;
  }, [events, isLoading]);

  useEffect(() => {
    createSubscription([
      {
        kinds: [NDKKind.AppSpecificData],
        limit: 100,
        '#T': ['opal/v0.1/housing'],
        '#d': housingId ? [housingId] : undefined,
        '#s': !housingId ? ['Enabled'] : undefined,
      },
    ]);

    return () => {
      removeSubscription();
    };
  }, [housingId, createSubscription, removeSubscription]);

  return { housingList };
};
