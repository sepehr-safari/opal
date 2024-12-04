import { CircleXIcon, EditIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';

import {
  useHousingList,
  useHousingRequestList,
  useRealtimeProfile,
  useRequestHousing,
  useUpdateHousing,
} from '@/shared/hooks';
import { Housing, UserRole } from '@/shared/types';

import { HousingRequestList } from '@/features/housing-request-list';

export const HousingListItem = ({
  housing,
  userRole,
}: {
  housing: Housing;
  userRole: UserRole;
}) => {
  const { profile } = useRealtimeProfile(housing.agencyPubkey);

  const { updateHousing } = useUpdateHousing();

  const { housingList } = useHousingList(housing.id);

  const { housingRequestList } = useHousingRequestList(housing);

  const { requestHousing } = useRequestHousing();

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

          {userRole == UserRole.Agency ? (
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
            <Button
              variant="default"
              size="sm"
              disabled={realtimeHousing.status !== 'Enabled'}
              onClick={() => requestHousing(housing)}
            >
              {realtimeHousing.status === 'Enabled' ? 'Request' : 'Unavailable'}
            </Button>
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
              <button className="hover:underline hover:text-primary">{profile.name}</button>
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
