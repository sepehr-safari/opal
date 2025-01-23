import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { HousingApplication, OpalTag } from '@/shared/types';
import { parseHousingApplication } from '@/shared/utils';

export const useHousingApplicationListByAgency = ({
  agencyPubkey,
}: {
  agencyPubkey: string | undefined;
}) => {
  const subId = agencyPubkey ? `housing-application-list-by-agency-${agencyPubkey}` : undefined;

  const { createSubscription, isLoading, events } = useSubscription(subId);

  const housingApplicationListByAgency = useMemo(() => {
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
    agencyPubkey &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 100,
            '#T': [OpalTag.HousingApplication],
            '#p': [agencyPubkey],
          },
        ],
      });
  }, [createSubscription, agencyPubkey]);

  return { housingApplicationListByAgency };
};
