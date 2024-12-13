import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { useHousingRequestList, useRequestHousing } from '@/shared/hooks';
import { Housing } from '@/shared/types';

export const PehHousingRequestButton = ({
  realtimeHousing,
  pehPubkey,
}: {
  realtimeHousing: Housing;
  pehPubkey: string;
}) => {
  const { requestHousing } = useRequestHousing();

  const { housingRequestList } = useHousingRequestList(realtimeHousing, pehPubkey);

  if (housingRequestList === undefined) return <Spinner />;

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
};
