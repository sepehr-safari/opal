import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplication, OpalTag } from '@/shared/types';
import { parseHousingApplication } from '@/shared/utils';

export const useHousingApplicationListByPeh = ({
  pehPubkey,
}: {
  pehPubkey: string | undefined;
}) => {
  const subId = pehPubkey ? `housing-application-list-by-peh-${pehPubkey}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationListByPeh = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const list = events.reduce((list: HousingApplication[], event) => {
      const housingApplication = parseHousingApplication(event);
      if (housingApplication) {
        list.push(housingApplication);
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
            authors: [pehPubkey],
            '#T': [OpalTag.HousingApplication],
          },
        ],
      });
  }, [createSubscription, pehPubkey]);

  return { housingApplicationListByPeh };
};
