import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing } from '@/shared/types';

export const useRequestHousing = () => {
  const { ndk } = useNdk();

  const requestHousing = useCallback(
    (housing: Housing) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0/housing-request'],
        ['a', housing.housingEvent.tagAddress()],
        ['s', 'Enabled'],
      ];

      e.publish();
    },
    [ndk],
  );

  return { requestHousing };
};
