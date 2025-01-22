import { useMemo } from 'react';

import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import {
  useHousingApplicationListByHousingAndPeh,
  useHousingApplicationReviewListByHousing,
  useMutateHousing,
} from '@/shared/hooks';
import { Housing, HousingApplication } from '@/shared/types';

const useApplication = (realtimeHousing: Housing, pehPubkey: string) => {
  const { housingApplicationListByHousingAndPeh } = useHousingApplicationListByHousingAndPeh({
    housingEventAddress: realtimeHousing.housingEvent?.tagAddress().toString(),
    pehPubkey,
  });

  const application = useMemo(() => {
    if (housingApplicationListByHousingAndPeh === undefined) return undefined;

    if (housingApplicationListByHousingAndPeh === null) return null;

    if (housingApplicationListByHousingAndPeh.length === 0) return null;

    return housingApplicationListByHousingAndPeh[housingApplicationListByHousingAndPeh.length - 1];
  }, [housingApplicationListByHousingAndPeh]);

  return { application };
};

const useReview = (application: HousingApplication | null | undefined) => {
  const { housingApplicationReviewListByHousing } = useHousingApplicationReviewListByHousing({
    housingEventAddress: application?.housingEventAddress,
  });

  const review = useMemo(() => {
    if (housingApplicationReviewListByHousing === undefined) return undefined;

    if (housingApplicationReviewListByHousing === null) return 'Stalled';

    if (housingApplicationReviewListByHousing.length === 0) return null;

    return housingApplicationReviewListByHousing[housingApplicationReviewListByHousing.length - 1]
      .status;
  }, [housingApplicationReviewListByHousing]);

  return { review };
};

export const PehHousingApplyButton = ({
  realtimeHousing,
  pehPubkey,
}: {
  realtimeHousing: Housing;
  pehPubkey: string;
}) => {
  const { applyHousing, unApplyHousing } = useMutateHousing();

  const { application } = useApplication(realtimeHousing, pehPubkey);
  const { review } = useReview(application);

  if (application === undefined) return <Spinner />;

  if (application === null || application.status === 'NotApplied') {
    return (
      <>
        <Button
          className="w-full"
          variant="default"
          size="sm"
          disabled={realtimeHousing.status !== 'Available'}
          onClick={() => applyHousing(realtimeHousing)}
        >
          {realtimeHousing.status === 'Available' ? 'Apply' : 'Unavailable'}
        </Button>
      </>
    );
  }

  if (application.status === 'Applied' && review === 'Stalled') {
    return (
      <>
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          disabled={realtimeHousing.status !== 'Available'}
          onClick={() => unApplyHousing(application)}
        >
          Cancel Your Request
        </Button>
      </>
    );
  }

  if (review === undefined) return <Spinner />;

  if (review === 'Approved') {
    return (
      <>
        <div className="w-full font-bold text-primary">Approved</div>
      </>
    );
  }

  if (review === 'Rejected') {
    return (
      <>
        <div className="w-full font-bold text-destructive">Rejected</div>
      </>
    );
  }
};
