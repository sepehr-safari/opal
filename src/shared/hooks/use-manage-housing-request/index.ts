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
        ['T', 'opal/v0.1/housing-request-status'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['s', 'Approved'],
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
        ['T', 'opal/v0.1/housing-request-status'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['s', 'Rejected'],
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
        ['T', 'opal/v0.1/housing-request-status'],
        ['a', housingRequest.housingRequestEvent.tagAddress()],
        ['s', 'Stalled'],
      ];

      e.publish();
    },
    [ndk],
  );

  return { approveHousingRequest, rejectHousingRequest, stallHousingRequest };
};
