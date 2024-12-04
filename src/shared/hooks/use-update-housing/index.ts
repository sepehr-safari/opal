import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing } from '@/shared/types';

export const useUpdateHousing = () => {
  const { ndk } = useNdk();

  const updateHousing = useCallback(
    (housing: Omit<Housing, 'agencyPubkey' | 'housingEvent'>) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['d', housing.id],
        ['T', 'opal/v0/housing'],
        ['N', housing.name],
        ['description', housing.description],
        ['location', housing.location],
        ['s', housing.status],
        ['contact', housing.contact],
      ];

      e.publish();
    },
    [ndk],
  );

  return { updateHousing };
};
