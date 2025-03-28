import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplication, OpalTag } from '@/shared/types';
import { parseHousingApplication } from '@/shared/utils';

export const useHousingApplicationListByHousing = ({
  housingEventAddress,
}: {
  housingEventAddress: string | undefined;
}) => {
  const subId = housingEventAddress
    ? `housing-application-list-by-housing-${housingEventAddress}`
    : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationListByHousing = useMemo(() => {
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
    if (!housingEventAddress) {
      return;
    }

    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 100,
          '#T': [OpalTag.HousingApplication],
          '#d': [housingEventAddress],
        },
      ],
    });
  }, [housingEventAddress, createSubscription]);

  return { housingApplicationListByHousing };
};
