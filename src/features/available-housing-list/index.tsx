import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';
import { useMemo } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { useAllHousingList, useHousingListByAgency, useUserRole } from '@/shared/hooks';
import { Housing } from '@/shared/types';

import { HousingWidget } from '@/features/housing-widget';

export const View = ({
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
    return <p>You need to set up your role before you can view housing</p>;
  }

  if (housingList === undefined) {
    return <Spinner />;
  }

  if (housingList === null) {
    return <p>No housing available</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {housingList.map((housing) => (
        <HousingWidget key={housing.id} housing={housing} userRole={role} />
      ))}
    </div>
  );
};

export const AllAvailableHousingList = () => {
  const { activeUser } = useActiveUser();

  const { allHousingList } = useAllHousingList();

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <View housingList={allHousingList} activeUserPubkey={activeUser.pubkey} />
    </>
  );
};

export const AvailableHousingListByAgency = ({ agencyNpub }: { agencyNpub?: string }) => {
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
};
