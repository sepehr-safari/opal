import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing } from '@/shared/types';

export const useAddHousing = () => {
  const { ndk } = useNdk();

  const addHousing = useCallback(
    (housing: Omit<Housing, 'id'>) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const _h = new NDKEvent(ndk);
      _h.kind = NDKKind.AppSpecificData;
      _h.tags = [
        ['t', 'opal/v0/housing'],
        ['name', housing.name],
        ['description', housing.description],
        ['location', housing.location],
        ['isAvailable', housing.isAvailable.toString()],
        ['contact', housing.contact],
      ];

      _h.publish();
    },
    [ndk],
  );

  return { addHousing };
};
