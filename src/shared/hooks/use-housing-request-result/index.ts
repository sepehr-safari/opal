import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingRequest } from '@/shared/types';

import { housingRequestResultFromEvent } from './utils';

export const useHousingRequestResult = (housingRequest: HousingRequest | null | undefined) => {
  const subId = housingRequest ? `housing-request-result-${housingRequest.id}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingRequestResult = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const lastEvent = events[events.length - 1];

    const housingRequest = housingRequestResultFromEvent(lastEvent);

    return housingRequest;
  }, [events, isLoading]);

  useEffect(() => {
    housingRequest &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 1,
            '#T': ['opal/v0.1/housing-request-result'],
            '#a': [housingRequest.housingRequestEvent.tagAddress()],
          },
        ],
      });
  }, [housingRequest, createSubscription]);

  return { housingRequestResult };
};
