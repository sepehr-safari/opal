import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing, HousingRequest } from '@/shared/types';

export const useRequestHousing = () => {
  const { ndk } = useNdk();

  const requestHousing = useCallback(
    (housing: Housing) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0.2/housing-request'],
        ['a', housing.housingEvent!.tagAddress()],
        ['s', 'Enabled'],
      ];

      e.publish();
    },
    [ndk],
  );

  const cancelHousingRequest = useCallback(
    (housingRequest: HousingRequest) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [...housingRequest.housingRequestEvent.tags];
      e.removeTag('s');
      e.tags.push(['s', 'Disabled']);

      e.publish();
    },
    [ndk],
  );

  return { requestHousing, cancelHousingRequest };
};
