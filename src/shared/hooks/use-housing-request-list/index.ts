import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing, HousingRequest } from '@/shared/types';

import { housingRequestFromEvent } from './utils';

export const useHousingRequestList = (housing: Housing) => {
  const subId = `housing-requests-${housing.id}`;

  const { createSubscription, removeSubscription, isLoading, events } = useSubscription(subId);

  const housingRequestList = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const list = events.reduce((list: HousingRequest[], event) => {
      const housingRequest = housingRequestFromEvent(event);
      if (housingRequest) {
        list.push(housingRequest);
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
        '#T': ['opal/v0/housing-request'],
        '#a': [housing.housingEvent.tagAddress()],
        '#s': ['Enabled'],
      },
    ]);

    return () => {
      removeSubscription();
    };
  }, [housing, createSubscription, removeSubscription]);

  return { housingRequestList };
};
