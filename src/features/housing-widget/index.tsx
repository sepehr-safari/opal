import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser, useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import {
  useHousingApplicationListByHousing,
  useHousingItemByEventAddress,
  useMutateHousing,
} from '@/shared/hooks';
import { Housing, UserRole } from '@/shared/types';

import { HousingApplicationList } from '@/features/housing-application-list';

import { PehApplicationForm } from './components';

export const HousingWidget = ({ housing, userRole }: { housing: Housing; userRole: UserRole }) => {
  const navigate = useNavigate();

  const { activeUser } = useActiveUser();

  const { profile: agencyProfile } = useRealtimeProfile(housing.agencyPubkey);

  const { removeHousing } = useMutateHousing();

  const { housingItem } = useHousingItemByEventAddress({
    housingEventAddress: housing.housingEvent?.tagAddress().toString(),
  });

  const { housingApplicationListByHousing } = useHousingApplicationListByHousing({
    housingEventAddress: housing.housingEvent?.tagAddress().toString(),
  });

  const filteredHousingApplicationList = useMemo(
    () => housingApplicationListByHousing?.filter((a) => a.status === 'Applied'),
    [housingApplicationListByHousing],
  );

  const realtimeHousing =
    housingItem === undefined ? housing : housingItem === null ? null : housingItem;

  const agencyNpub = useMemo(
    () =>
      realtimeHousing ? new NDKUser({ pubkey: realtimeHousing.agencyPubkey }).npub : undefined,
    [realtimeHousing?.agencyPubkey],
  );

  if (!realtimeHousing || realtimeHousing.status === 'NotAvailable') return null;

  return (
    <div key={realtimeHousing.id}>
      <div className="p-4 border rounded-sm shadow-md bg-background transition-colors duration-500 ease-out hover:border-primary/30">
        <div className="flex flex-col gap-1 justify-center">
          {agencyProfile && (
            <p className="text-sm text-muted-foreground">
              <button
                className="hover:underline hover:text-primary"
                onClick={() => navigate(`/profile/${agencyNpub}`)}
              >
                {activeUser?.pubkey === realtimeHousing.agencyPubkey ? 'You' : agencyProfile.name}
              </button>
            </p>
          )}

          <b>{realtimeHousing.name}</b>

          <p>{realtimeHousing.description}</p>
          <p>{realtimeHousing.location}</p>

          <div>
            <p>
              {realtimeHousing.availableUnitsMale}/{realtimeHousing.totalUnits} units available
              [Male]
            </p>
            <p>
              {realtimeHousing.availableUnitsFemale}/{realtimeHousing.totalUnits} units available
              [Female]
            </p>
            <p>
              {realtimeHousing.availableUnitsNonBinary}/{realtimeHousing.totalUnits} units available
              [Non-binary]
            </p>
            <p>Maximum stay allowed: {realtimeHousing.maxStay} days</p>
          </div>

          <div>
            <p>{realtimeHousing.contactPhone}</p>
            {realtimeHousing.contactEmail && <p>{realtimeHousing.contactEmail}</p>}
            {realtimeHousing.contactFullname && <p>{realtimeHousing.contactFullname}</p>}
            {realtimeHousing.contactPosition && <p>{realtimeHousing.contactPosition}</p>}
          </div>

          {userRole == 'agency' && activeUser?.pubkey === realtimeHousing.agencyPubkey && (
            <>
              <div className="flex gap-1">
                <Button variant="destructive" onClick={() => removeHousing(realtimeHousing)}>
                  Remove Housing Item
                </Button>

                {/* <Button>Edit</Button> */}
              </div>
            </>
          )}

          {userRole == 'agency' &&
            activeUser?.pubkey === realtimeHousing.agencyPubkey &&
            filteredHousingApplicationList && (
              <HousingApplicationList housingApplicationList={filteredHousingApplicationList} />
            )}

          {userRole == 'peh' && realtimeHousing && activeUser?.pubkey && (
            <PehApplicationForm realtimeHousing={realtimeHousing} pehPubkey={activeUser.pubkey} />
          )}
        </div>
      </div>
    </div>
  );
};
