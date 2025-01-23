import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { Housing, HousingApplication, OpalTag } from '@/shared/types';

export const useMutateHousing = () => {
  const { ndk } = useNdk();

  const addHousing = useCallback(
    (housing: Omit<Housing, 'id' | 'agencyPubkey' | 'housingEvent'>) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', OpalTag.Housing],
        ['N', housing.name],
        ['description', housing.description],
        ['location', housing.location],
        ['s', housing.status],
        ['contactPhone', housing.contactPhone],
        ['contactEmail', housing.contactEmail || ''],
        ['contactFullname', housing.contactFullname || ''],
        ['contactPosition', housing.contactPosition || ''],
        ['totalUnits', housing.totalUnits.toString()],
        ['availableUnits', housing.availableUnits.toString()],
        ['maxStay', housing.maxStay.toString()],
      ];

      e.publish();
    },
    [ndk],
  );

  const updateHousing = useCallback(
    (housing: Omit<Housing, 'agencyPubkey' | 'housingEvent'>) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['d', housing.id!],
        ['T', OpalTag.Housing],
        ['N', housing.name],
        ['description', housing.description],
        ['location', housing.location],
        ['s', housing.status],
        ['contactPhone', housing.contactPhone],
        ['contactEmail', housing.contactEmail || ''],
        ['contactFullname', housing.contactFullname || ''],
        ['contactPosition', housing.contactPosition || ''],
        ['totalUnits', housing.totalUnits.toString()],
        ['availableUnits', housing.availableUnits.toString()],
        ['maxStay', housing.maxStay.toString()],
      ];

      e.publish();
    },
    [ndk],
  );

  const removeHousing = useCallback(
    (housing: Housing) => {
      updateHousing({ ...housing, status: 'NotAvailable' });
    },
    [updateHousing],
  );

  const applyHousing = useCallback(
    ({ housing, stayDuration, ssn }: { housing: Housing; stayDuration: number; ssn: number }) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', OpalTag.HousingApplication],
        ['d', housing.housingEvent!.tagAddress()],
        ['p', housing.housingEvent!.pubkey],
        ['ssn', ssn.toString()],
        ['stayDuration', stayDuration.toString()],
        ['s', 'Applied'],
      ];

      e.publish();
    },
    [ndk],
  );

  const withdrawHousingApplication = useCallback(
    (housingApplication: HousingApplication) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [...housingApplication.ndkEvent!.tags];
      e.removeTag('s');
      e.tags.push(['s', 'NotApplied']);

      e.publish();
    },
    [ndk],
  );

  const approveHousingApplication = useCallback(
    (housingApplication: HousingApplication) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', OpalTag.HousingApplicationReview],
        ['d', housingApplication.eventAddress!],
        ['h', housingApplication.housingEventAddress!],
        ['p', housingApplication.ndkEvent!.pubkey],
        ['s', 'Approved'],
      ];

      e.publish();
    },
    [ndk],
  );

  const rejectHousingApplication = useCallback(
    (housingApplication: HousingApplication) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', OpalTag.HousingApplicationReview],
        ['d', housingApplication.eventAddress!],
        ['h', housingApplication.housingEventAddress!],
        ['p', housingApplication.ndkEvent!.pubkey],
        ['s', 'Rejected'],
      ];

      e.publish();
    },
    [ndk],
  );

  const stallHousingApplication = useCallback(
    (housingApplication: HousingApplication) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const e = new NDKEvent(ndk);
      e.kind = NDKKind.AppSpecificData;
      e.tags = [
        ['T', OpalTag.HousingApplicationReview],
        ['d', housingApplication.eventAddress!],
        ['h', housingApplication.housingEventAddress!],
        ['p', housingApplication.ndkEvent!.pubkey],
        ['s', 'Stalled'],
      ];

      e.publish();
    },
    [ndk],
  );

  return {
    addHousing,
    updateHousing,
    removeHousing,
    approveHousingApplication,
    rejectHousingApplication,
    stallHousingApplication,
    applyHousing,
    withdrawHousingApplication,
  };
};
