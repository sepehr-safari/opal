import { CircleXIcon, EditIcon } from 'lucide-react';
import { useActiveUser } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';

import {
  useHousingList,
  useHousingRequestList,
  useRealtimeProfile,
  useUpdateHousing,
} from '@/shared/hooks';
import { Housing, UserRole } from '@/shared/types';

import { HousingRequestList } from '@/features/housing-request-list';

import { PehHousingRequestButton } from './components';

export const HousingListItem = ({
  housing,
  userRole,
}: {
  housing: Housing;
  userRole: UserRole;
}) => {
  const { activeUser } = useActiveUser();

  const { profile } = useRealtimeProfile(housing.agencyPubkey);

  const { updateHousing } = useUpdateHousing();

  const { housingList } = useHousingList(housing.id);

  const { housingRequestList } = useHousingRequestList(housing);

  const realtimeHousing =
    housingList === undefined
      ? housing
      : housingList === null || !housingList.length
        ? null
        : housingList[housingList.length - 1];

  if (!realtimeHousing || realtimeHousing.status === 'Disabled') return null;

  return (
    <div key={realtimeHousing.id}>
      <div className="pb-2">
        <div className="flex items-center justify-between">
          <b>{realtimeHousing.name}</b>

          {userRole == UserRole.Agency && activeUser?.pubkey === realtimeHousing.agencyPubkey ? (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => updateHousing({ ...realtimeHousing, status: 'Disabled' })}
              >
                <CircleXIcon size={18} />
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <EditIcon size={18} />
              </Button>
            </div>
          ) : (
            realtimeHousing &&
            activeUser?.pubkey && (
              <PehHousingRequestButton
                realtimeHousing={realtimeHousing}
                pehPubkey={activeUser.pubkey}
              />
            )
          )}
        </div>

        <p>{realtimeHousing.description}</p>
        <p>{realtimeHousing.location}</p>

        {/* {userRole == UserRole.Agency && <p>{realtimeHousing.status}</p>} */}

        <div className="flex items-center justify-between">
          <p>{realtimeHousing.contact}</p>

          {profile && (
            <p className="text-sm text-muted-foreground">
              <span className="">by: </span>
              <button className="hover:underline hover:text-primary">
                {activeUser?.pubkey === realtimeHousing.agencyPubkey ? 'You' : profile.name}
              </button>
            </p>
          )}
        </div>

        {userRole == UserRole.Agency && housingRequestList && (
          <HousingRequestList housingRequestList={housingRequestList} />
        )}
      </div>

      <Separator />
    </div>
  );
};
