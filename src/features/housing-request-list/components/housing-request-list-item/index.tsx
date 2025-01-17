import { NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { useHousingRequestResult, useManageHousingRequest } from '@/shared/hooks';
import { HousingRequest } from '@/shared/types';

export const HousingRequestListItem = ({ housingRequest }: { housingRequest: HousingRequest }) => {
  const navigate = useNavigate();

  const { approveHousingRequest, rejectHousingRequest, stallHousingRequest } =
    useManageHousingRequest();

  const { housingRequestResult } = useHousingRequestResult(housingRequest);

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
    <>
      <div className="w-full flex items-center gap-2">
        <Avatar className="bg-muted">
          <AvatarImage src={profile.image?.toString()} alt={profile.name} />
        </Avatar>

        <button className="hover:underline" onClick={() => navigate(`/profile/${npub}`)}>
          {profile.name}
        </button>

        <div className="ml-auto flex items-center gap-2">
          {housingRequestResult === undefined ? (
            <Spinner />
          ) : housingRequestResult === null || housingRequestResult.result === 'Stalled' ? (
            <>
              <Button onClick={() => approveHousingRequest(housingRequest)} size="sm">
                Approve
              </Button>

              <Button
                onClick={() => rejectHousingRequest(housingRequest)}
                size="sm"
                variant="destructive"
              >
                Reject
              </Button>
            </>
          ) : (
            <>
              {housingRequestResult.result === 'Approved' ? (
                <span className="text-sm text-primary">Approved</span>
              ) : housingRequestResult.result === 'Rejected' ? (
                <span className="text-sm text-destructive">Rejected</span>
              ) : null}

              <Button
                onClick={() => stallHousingRequest(housingRequest)}
                size="sm"
                variant="secondary"
              >
                Stall
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
