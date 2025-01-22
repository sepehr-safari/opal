import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplicationReview } from '@/shared/types';
import { parseHousingApplicationReview } from '@/shared/utils';

export const useHousingApplicationReviewListByPeh = ({
  pehPubkey,
}: {
  pehPubkey: string | undefined;
}) => {
  const subId = pehPubkey ? `housing-application-review-list-by-peh-${pehPubkey}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationReviewListByPeh = useMemo(() => {
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
    pehPubkey &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 100,
            '#T': ['opal/v0.21/housing-application-review'],
            '#p': [pehPubkey],
          },
        ],
      });
  }, [createSubscription, pehPubkey]);

  return { housingApplicationReviewListByPeh };
};
