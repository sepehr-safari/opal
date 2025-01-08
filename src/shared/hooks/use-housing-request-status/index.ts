import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingRequest } from '@/shared/types';

import { housingRequestStatusFromEvent } from './utils';

export const useHousingRequestStatus = (housingRequest: HousingRequest | undefined) => {
  const subId = housingRequest ? `housing-request-status-${housingRequest.id}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingRequestStatus = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const lastEvent = events[events.length - 1];

    const housingRequest = housingRequestStatusFromEvent(lastEvent);

    return housingRequest;
  }, [events, isLoading]);

  useEffect(() => {
    housingRequest &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 1,
            '#T': ['opal/v0.1/housing-request-status'],
            '#a': [housingRequest.housingRequestEvent.tagAddress()],
          },
        ],
      });
  }, [housingRequest, createSubscription]);

  return { housingRequestStatus };
};
