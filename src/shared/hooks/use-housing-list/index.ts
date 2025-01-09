import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing } from '@/shared/types';

import { housingFromEvent } from './utils';

export const useHousingList = (params?: { housingId?: string; agencyPubkey?: string }) => {
  const subId = `housing-${params?.housingId}-${params?.agencyPubkey}`;

  const { createSubscription, isLoading, events } = useSubscription(subId);

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
    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: params?.agencyPubkey ? [params?.agencyPubkey] : undefined,
          '#T': ['opal/v0.2/housing'],
          '#d': params?.housingId ? [params?.housingId] : undefined,
          '#s': !params?.housingId ? ['Enabled'] : undefined,
        },
      ],
    });
  }, [params?.housingId, params?.agencyPubkey, createSubscription]);

  return { housingList };
};
