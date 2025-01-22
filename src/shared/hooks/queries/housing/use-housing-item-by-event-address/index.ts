import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { parseEventAddress, parseHousing } from '@/shared/utils';

export const useHousingItemByEventAddress = ({
  housingEventAddress,
}: {
  housingEventAddress: string | undefined;
}) => {
  const subId = housingEventAddress
    ? `housing-item-by-event-address-${housingEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingItem = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const lastEvent = events[events.length - 1];

    return parseHousing(lastEvent);
  }, [events, isLoading]);

  useEffect(() => {
    if (!housingEventAddress) {
      return;
    }

    const parsedEventAddress = parseEventAddress(housingEventAddress);
    if (!parsedEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: [parsedEventAddress.pubkey],
          '#T': ['opal/v0.21/housing'],
          '#d': [parsedEventAddress.identifier],
        },
      ],
    });
  }, [housingEventAddress, createSubscription]);

  return { housingItem };
};
