import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { parseEventAddress, parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewItemByEventAddress = ({
  housingApplicationReviewEventAddress,
}: {
  housingApplicationReviewEventAddress: string | undefined;
}) => {
  const subId = housingApplicationReviewEventAddress
    ? `housing-application-review-list-by-event-address-${housingApplicationReviewEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewItem = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const lastEvent = events[events.length - 1];

    return parseHousingApplicationReview(lastEvent);
  }, [events, isLoading]);

  useEffect(() => {
    if (!housingApplicationReviewEventAddress) {
      return;
    }

    const parsedEventAddress = parseEventAddress(housingApplicationReviewEventAddress);
    if (!parsedEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: [parsedEventAddress.pubkey],
          '#T': ['opal/v0.21/housing-application-review'],
          '#d': [parsedEventAddress.identifier],
        },
      ],
    });
  }, [housingApplicationReviewEventAddress, createSubscription]);

  return { housingApplicationReviewItem };
};
