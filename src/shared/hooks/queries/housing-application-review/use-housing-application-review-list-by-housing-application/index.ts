import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplicationReview } from '@/shared/types';
import { parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewListByHousingApplication = ({
  housingApplicationEventAddress,
}: {
  housingApplicationEventAddress: string | undefined;
}) => {
  const subId = housingApplicationEventAddress
    ? `housing-application-review-list-by-housing-application-${housingApplicationEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewListByHousingApplication = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const list = events.reduce((list: HousingApplicationReview[], event) => {
      const housingApplicationReview = parseHousingApplicationReview(event);
      if (housingApplicationReview) {
        list.push(housingApplicationReview);
      }
      return list;
    }, []);

    return list.length ? list : null;
  }, [events, isLoading]);

  useEffect(() => {
    if (!housingApplicationEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          '#T': ['opal/v0.21/housing-application-review'],
          '#d': [housingApplicationEventAddress],
        },
      ],
    });
  }, [housingApplicationEventAddress, createSubscription]);

  return { housingApplicationReviewListByHousingApplication };
};
