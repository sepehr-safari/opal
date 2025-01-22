import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplicationReview } from '@/shared/types';
import { parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewListByAgency = ({
  agencyPubkey,
}: {
  agencyPubkey: string | undefined;
}) => {
  const subId = agencyPubkey
    ? `housing-application-review-list-by-agency-${agencyPubkey}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewListByAgency = useMemo(() => {
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
    agencyPubkey &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 100,
            authors: [agencyPubkey],
            '#T': ['opal/v0.21/housing-application-review'],
          },
        ],
      });
  }, [createSubscription, agencyPubkey]);

  return { housingApplicationReviewListByAgency };
};
