import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';
import { memo, useMemo, useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { useAllHousingList, useHousingListByAgency, useUserRole } from '@/shared/hooks';
import { Gender, Housing } from '@/shared/types';

import { HousingWidget } from '@/features/housing-widget';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

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
  const [since, setSince] = useState(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
  const [gender, setGender] = useState<'all' | Gender>('all');

  const { activeUser } = useActiveUser();

  const { allHousingList } = useAllHousingList({ since: Math.floor(since.getTime() / 1000) });

  const availableHousingList = useMemo(
    () =>
      allHousingList === undefined
        ? undefined
        : allHousingList === null || allHousingList.length === 0
          ? null
          : allHousingList
              .filter((h) => h.status === 'Available')
              .filter((h) => {
                switch (gender) {
                  case 'all':
                    return true;
                  case 'male':
                    return h.availableUnitsMale > 0;
                  case 'female':
                    return h.availableUnitsFemale > 0;
                  case 'non-binary':
                    return h.availableUnitsNonBinary > 0;
                  default:
                    return false;
                }
              }),
    [allHousingList, gender],
  );

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <div className="p-4 border rounded-md shadow-md bg-background">
        <b>Filters</b>

        <div>
          <label htmlFor="since">Since: </label>
          <input
            type="date"
            id="since"
            name="since"
            value={since.toISOString().split('T')[0]}
            onChange={(e) => setSince(new Date(e.target.value))}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="gender">Gender: </label>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{gender?.toString()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="non-binary">Non-binary</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
