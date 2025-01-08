import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { useHousingRequestList, useHousingRequestStatus, useRequestHousing } from '@/shared/hooks';

import { Housing } from '@/shared/types';
import { cn } from '@/shared/utils';

export const PehHousingRequestButton = ({
  realtimeHousing,
  pehPubkey,
}: {
  realtimeHousing: Housing;
  pehPubkey: string;
}) => {
  const { requestHousing } = useRequestHousing();

  const { housingRequestList } = useHousingRequestList(realtimeHousing, pehPubkey);

  const { housingRequestStatus } = useHousingRequestStatus(
    housingRequestList && housingRequestList.length > 0 ? housingRequestList[0] : undefined,
  );

  if (housingRequestList === undefined) return <Spinner />;

  if (housingRequestStatus) {
    return (
      <>
        <div
          className={cn(
            'w-full font-bold',
            housingRequestStatus.status === 'Approved' ? 'text-primary' : 'text-destructive',
          )}
        >
          {housingRequestStatus.status === 'Approved'
            ? 'Your request has been approved.'
            : housingRequestStatus.status === 'Rejected'
              ? 'Your request has been rejected.'
              : null}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="default"
          size="sm"
          disabled={realtimeHousing.status !== 'Enabled' || !!housingRequestList?.length}
          onClick={() => requestHousing(realtimeHousing)}
        >
          {realtimeHousing.status === 'Enabled'
            ? !housingRequestList?.length
              ? 'Request'
              : 'Requested'
            : 'Unavailable'}
        </Button>
      </>
    );
  }
};
