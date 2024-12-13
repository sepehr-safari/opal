import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { useRealtimeProfile } from '@/shared/hooks';
import { HousingRequest } from '@/shared/types';

export const HousingRequestListItem = ({ housingRequest }: { housingRequest: HousingRequest }) => {
  const { profile } = useRealtimeProfile(housingRequest.pehPubkey);

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return <p>Profile not found</p>;
  }

  return <Button variant="outline">{profile.name}</Button>;
};
