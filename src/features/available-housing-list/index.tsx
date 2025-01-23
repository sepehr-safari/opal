import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';
import { memo, useMemo } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { useAllHousingList, useHousingListByAgency, useUserRole } from '@/shared/hooks';
import { Housing } from '@/shared/types';

import { HousingWidget } from '@/features/housing-widget';

export const View = memo(
  ({
    housingList,
    activeUserPubkey,
  }: {
    housingList: Housing[] | null | undefined;
    activeUserPubkey: string;
  }) => {
    const { role } = useUserRole(activeUserPubkey);

    if (role === undefined) {
      return <Spinner />;
    }

    if (role === null) {
      return (
        <div className="p-4 border rounded-md shadow-md bg-background">
          <p>You need to set up your role before you can view housing</p>;
        </div>
      );
    }

    if (housingList === undefined) {
      return <Spinner />;
    }

    if (housingList === null || housingList.length === 0) {
      return (
        <div className="p-4 border rounded-md shadow-md bg-background">
          <p>There are no available housing items</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {housingList.map((housing) => (
          <HousingWidget key={housing.id} housing={housing} userRole={role} />
        ))}
      </div>
    );
  },
);

export const AllAvailableHousingList = memo(() => {
  const { activeUser } = useActiveUser();

  const { allHousingList } = useAllHousingList();

  const availableHousingList = useMemo(
    () =>
      allHousingList === undefined
        ? undefined
        : allHousingList === null || allHousingList.length === 0
          ? null
          : allHousingList.filter((h) => h.status === 'Available'),
    [allHousingList],
  );

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <View housingList={availableHousingList} activeUserPubkey={activeUser.pubkey} />
    </>
  );
});

export const AvailableHousingListByAgency = memo(({ agencyNpub }: { agencyNpub?: string }) => {
  const { activeUser } = useActiveUser();

  const agencyPubkey = useMemo(
    () => (agencyNpub ? new NDKUser({ npub: agencyNpub }).pubkey : undefined),
    [agencyNpub],
  );

  const { housingListByAgency } = useHousingListByAgency({ agencyPubkey });

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <View housingList={housingListByAgency} activeUserPubkey={activeUser.pubkey} />
    </>
  );
});
