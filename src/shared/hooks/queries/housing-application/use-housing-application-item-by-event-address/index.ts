import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { OpalTag } from '@/shared/types';
import { parseEventAddress, parseHousingApplication } from '@/shared/utils';

export const useHousingApplicationItemByEventAddress = ({
  housingApplicationEventAddress,
}: {
  housingApplicationEventAddress: string | undefined;
}) => {
  const subId = housingApplicationEventAddress
    ? `housing-application-list-by-event-address-${housingApplicationEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationItem = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const lastEvent = events[events.length - 1];

    return parseHousingApplication(lastEvent);
  }, [events, isLoading]);

  useEffect(() => {
    if (!housingApplicationEventAddress) {
      return;
    }

    const parsedEventAddress = parseEventAddress(housingApplicationEventAddress);
    if (!parsedEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: [parsedEventAddress.pubkey],
          '#T': [OpalTag.HousingApplication],
          '#d': [parsedEventAddress.identifier],
        },
      ],
    });
  }, [housingApplicationEventAddress, createSubscription]);

  return { housingApplicationItem };
};
