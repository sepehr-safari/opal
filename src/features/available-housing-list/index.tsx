import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';
import { useMemo } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { useHousingList, useUserRole } from '@/shared/hooks';
import { Housing } from '@/shared/types';

import { HousingListItem } from './components';

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
        <HousingListItem key={housing.id} housing={housing} userRole={role} />
      ))}
    </div>
  );
};

export const AvailableHousingList = ({ agencyNpub }: { agencyNpub?: string }) => {
  const { activeUser } = useActiveUser();

  const agencyPubkey = useMemo(
    () => (agencyNpub ? new NDKUser({ npub: agencyNpub }).pubkey : undefined),
    [agencyNpub],
  );

  const { housingList } = useHousingList({ agencyPubkey });

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <View housingList={housingList} activeUserPubkey={activeUser.pubkey} />
    </>
  );
};
