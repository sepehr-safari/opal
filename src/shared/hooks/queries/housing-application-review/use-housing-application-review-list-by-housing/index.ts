import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplicationReview, OpalTag } from '@/shared/types';
import { parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewListByHousing = ({
  housingEventAddress,
}: {
  housingEventAddress: string | undefined;
}) => {
  const subId = housingEventAddress
    ? `housing-application-review-list-by-housing-${housingEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewListByHousing = useMemo(() => {
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
    if (!housingEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          '#T': [OpalTag.HousingApplicationReview],
          '#h': [housingEventAddress],
        },
      ],
    });
  }, [housingEventAddress, createSubscription]);

  return { housingApplicationReviewListByHousing };
};
