import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing } from '@/shared/types';

export const useAddHousing = () => {
  const { ndk } = useNdk();

  const addHousing = useCallback(
    (housing: Omit<Housing, 'id' | 'agencyPubkey' | 'housingEvent'>) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0.2/housing'],
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

  return { addHousing };
};
