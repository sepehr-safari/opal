import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing } from '@/shared/types';
import { parseHousing } from '@/shared/utils';

export const useHousingListByAgency = ({ agencyPubkey }: { agencyPubkey: string | undefined }) => {
  const subId = agencyPubkey ? `housing-list-by-agency-${agencyPubkey}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingListByAgency = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const list = events.reduce((list: Housing[], event) => {
      const housing = parseHousing(event);
      if (housing) {
        list.push(housing);
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
            '#T': ['opal/v0.21/housing'],
          },
        ],
      });
  }, [agencyPubkey, createSubscription]);

  return { housingListByAgency };
};
