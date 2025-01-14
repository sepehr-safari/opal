import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser, useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { useHousingList, useHousingRequestList, useUpdateHousing } from '@/shared/hooks';
import { Housing, UserRole } from '@/shared/types';

import { HousingRequestList } from '@/features/housing-request-list';

import { PehHousingRequestButton } from '../peh-housing-request-button';

export const HousingListItem = ({
  housing,
  userRole,
}: {
  housing: Housing;
  userRole: UserRole;
}) => {
  const navigate = useNavigate();

  const { activeUser } = useActiveUser();

  const { profile: agencyProfile } = useRealtimeProfile(housing.agencyPubkey);

  const { updateHousing } = useUpdateHousing();

  const { housingList } = useHousingList({ housingId: housing.id });

  const { housingRequestList } = useHousingRequestList(housing);

  const filteredHousingRequestList = useMemo(
    () => housingRequestList?.filter((hr) => hr.status === 'Enabled'),
    [housingRequestList],
  );

  const realtimeHousing =
    housingList === undefined
      ? housing
      : housingList === null || !housingList.length
        ? null
        : housingList[housingList.length - 1];

  const agencyNpub = useMemo(
    () =>
      realtimeHousing ? new NDKUser({ pubkey: realtimeHousing.agencyPubkey }).npub : undefined,
    [realtimeHousing?.agencyPubkey],
  );

  if (!realtimeHousing || realtimeHousing.status === 'Disabled') return null;

  return (
    <div key={realtimeHousing.id}>
      <div className="pb-2 border-b">
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
              {realtimeHousing.availableUnits}/{realtimeHousing.totalUnits} units available
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
                <Button
                  variant="destructive"
                  onClick={() => updateHousing({ ...realtimeHousing, status: 'Disabled' })}
                >
                  Remove Housing Item
                </Button>

                {/* <Button>Edit</Button> */}
              </div>
            </>
          )}

          {userRole == 'agency' &&
            activeUser?.pubkey === realtimeHousing.agencyPubkey &&
            filteredHousingRequestList && (
              <HousingRequestList housingRequestList={filteredHousingRequestList} />
            )}

          {userRole == 'peh' && realtimeHousing && activeUser?.pubkey && (
            <PehHousingRequestButton
              realtimeHousing={realtimeHousing}
              pehPubkey={activeUser.pubkey}
            />
          )}
        </div>
      </div>
    </div>
  );
};
