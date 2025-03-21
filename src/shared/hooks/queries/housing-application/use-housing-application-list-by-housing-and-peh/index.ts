import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplication, OpalTag } from '@/shared/types';
import { parseHousingApplication } from '@/shared/utils';

export const useHousingApplicationListByHousingAndPeh = ({
  housingEventAddress,
  pehPubkey,
}: {
  housingEventAddress: string | undefined;
  pehPubkey: string | undefined;
}) => {
  const subId = housingEventAddress
    ? `housing-application-list-by-housing-and-peh-${housingEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationListByHousingAndPeh = useMemo(() => {
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
    if (!housingEventAddress || !pehPubkey) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          authors: [pehPubkey],
          '#T': [OpalTag.HousingApplication],
          '#d': [housingEventAddress],
        },
      ],
    });
  }, [housingEventAddress, pehPubkey, createSubscription]);

  return { housingApplicationListByHousingAndPeh };
};
