import { useMemo } from 'react';

import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { useHousingRequestList, useHousingRequestResult, useRequestHousing } from '@/shared/hooks';
import { Housing, HousingRequest } from '@/shared/types';

const useRequest = (realtimeHousing: Housing, pehPubkey: string) => {
  const { housingRequestList } = useHousingRequestList(realtimeHousing, pehPubkey);

  const request = useMemo(() => {
    if (housingRequestList === undefined) return undefined;

    if (housingRequestList === null) return null;

    if (housingRequestList.length === 0) return null;

    return housingRequestList[housingRequestList.length - 1];
  }, [housingRequestList]);

  return { request };
};

const useResult = (request: HousingRequest | null | undefined) => {
  const { housingRequestResult } = useHousingRequestResult(request);

  const result = useMemo(() => {
    if (housingRequestResult === undefined) return undefined;

    if (housingRequestResult === null) return 'Stalled';

    switch (housingRequestResult.result) {
      case 'Approved':
        return 'Approved';
      case 'Rejected':
        return 'Rejected';
      default:
        return 'Stalled';
    }
  }, [housingRequestResult]);

  return { result };
};

export const PehHousingRequestButton = ({
  realtimeHousing,
  pehPubkey,
}: {
  realtimeHousing: Housing;
  pehPubkey: string;
}) => {
  const { requestHousing, cancelHousingRequest } = useRequestHousing();

  const { request } = useRequest(realtimeHousing, pehPubkey);
  const { result } = useResult(request);

  if (request === undefined) return <Spinner />;

  if (request === null || request.status === 'Disabled') {
    return (
      <>
        <Button
          className="w-full"
          variant="default"
          size="sm"
          disabled={realtimeHousing.status !== 'Enabled'}
          onClick={() => requestHousing(realtimeHousing)}
        >
          {realtimeHousing.status === 'Enabled' ? 'Request' : 'Unavailable'}
        </Button>
      </>
    );
  }

  if (request.status === 'Enabled' && result === 'Stalled') {
    return (
      <>
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          disabled={realtimeHousing.status !== 'Enabled'}
          onClick={() => cancelHousingRequest(request)}
        >
          Cancel Your Request
        </Button>
      </>
    );
  }

  if (result === undefined) return <Spinner />;

  if (result === 'Approved') {
    return (
      <>
        <div className="w-full font-bold text-primary">Approved</div>
      </>
    );
  }

  if (result === 'Rejected') {
    return (
      <>
        <div className="w-full font-bold text-destructive">Rejected</div>
      </>
    );
  }
};
