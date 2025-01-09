import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { HousingRequest } from '@/shared/types';

export const useManageHousingRequest = () => {
  const { ndk } = useNdk();

  const approveHousingRequest = useCallback(
    (housingRequest: HousingRequest) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0.2/housing-request-result'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['r', 'Approved'],
      ];

      e.publish();
    },
    [ndk],
  );

  const rejectHousingRequest = useCallback(
    (housingRequest: HousingRequest) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0.2/housing-request-result'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['r', 'Rejected'],
      ];

      e.publish();
    },
    [ndk],
  );

  const stallHousingRequest = useCallback(
    (housingRequest: HousingRequest) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', 'opal/v0.2/housing-request-result'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['r', 'Stalled'],
      ];

      e.publish();
    },
    [ndk],
  );

  return { approveHousingRequest, rejectHousingRequest, stallHousingRequest };
};
