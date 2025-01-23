import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplicationReview } from '@/shared/types';
import { parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewListByHousingAndAgency = ({
  housingEventAddress,
  agencyPubkey,
}: {
  housingEventAddress: string | undefined;
  agencyPubkey: string | undefined;
}) => {
  const subId = housingEventAddress
    ? `housing-application-review-list-by-housing-and-agency-${housingEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewListByHousingAndAgency = useMemo(() => {
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
    if (!housingEventAddress || !agencyPubkey) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: [agencyPubkey],
          '#T': ['opal/v0.21/housing-application-review'],
          '#h': [housingEventAddress],
        },
      ],
    });
  }, [agencyPubkey, housingEventAddress, createSubscription]);

  return { housingApplicationReviewListByHousingAndAgency };
};
