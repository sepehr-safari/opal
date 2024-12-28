import { NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

// import { useManageHousingRequest } from '@/shared/hooks/use-manage-housing-request';
import { HousingRequest } from '@/shared/types';

export const HousingRequestListItem = ({ housingRequest }: { housingRequest: HousingRequest }) => {
  const navigate = useNavigate();

  // const { approveHousingRequest, rejectHousingRequest } = useManageHousingRequest();

  const npub = useMemo(
    () => new NDKUser({ pubkey: housingRequest.pehPubkey }).npub,
    [housingRequest.pehPubkey],
  );

  const { profile } = useRealtimeProfile(housingRequest.pehPubkey);

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return <p>Profile not found</p>;
  }

  return (
    <Button variant="outline" onClick={() => navigate(`/profile/${npub}`)}>
      {profile.name}
    </Button>
  );
};
