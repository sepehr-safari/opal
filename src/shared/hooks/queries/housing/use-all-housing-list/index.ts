import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { Housing, OpalTag } from '@/shared/types';
import { parseHousing } from '@/shared/utils';

export const useAllHousingList = (opts?: { since?: number | undefined }) => {
  const subId = opts?.since ? `all-housing-list-since-${opts?.since}` : 'all-housing-list';

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const allHousingList = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || events.length === 0) return null;

    const list = events.reduce((list: Housing[], event) => {
      const housing = parseHousing(event);
      if (housing) {
        list.push(housing);
      }
      return list;
    }, []);

    return list.length > 0 ? list : null;
  }, [events, isLoading]);

  useEffect(() => {
    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          '#T': [OpalTag.Housing],
          since: opts?.since,
        },
      ],
    });
  }, [createSubscription, opts?.since]);

  return { allHousingList };
};
