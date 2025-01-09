import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing, HousingRequest } from '@/shared/types';

import { housingRequestFromEvent } from './utils';

export const useHousingRequestList = (housing: Housing, pehPubkey?: string) => {
  const subId = `housing-requests-${housing.id}-${pehPubkey}`;

  const { createSubscription, isLoading, events } = useSubscription(subId);

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
    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: pehPubkey ? [pehPubkey] : undefined,
          '#T': ['opal/v0.2/housing-request'],
          '#a': [housing.housingEvent.tagAddress()],
        },
      ],
    });
  }, [housing, pehPubkey, createSubscription]);

  return { housingRequestList };
};
