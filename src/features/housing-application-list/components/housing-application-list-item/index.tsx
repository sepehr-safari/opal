import { NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import {
  useHousingApplicationReviewListByHousingApplication,
  useMutateHousing,
} from '@/shared/hooks';
import { HousingApplication } from '@/shared/types';

export const HousingApplicationListItem = ({
  housingApplication,
}: {
  housingApplication: HousingApplication;
}) => {
  const navigate = useNavigate();

  const { approveHousingApplication, declineHousingApplication, stallHousingApplication } =
    useMutateHousing();

  const { housingApplicationReviewListByHousingApplication } =
    useHousingApplicationReviewListByHousingApplication({
      housingApplicationEventAddress: housingApplication.eventAddress,
    });

  const npub = useMemo(
    () => new NDKUser({ pubkey: housingApplication.ndkEvent!.pubkey }).npub,
    [housingApplication.ndkEvent!.pubkey],
  );

  const { profile } = useRealtimeProfile(housingApplication.ndkEvent!.pubkey);

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return <p>Profile not found</p>;
  }

  return (
    <>
      <div className="w-full flex items-center">
        <button
          className="hover:underline flex items-center gap-2"
          onClick={() => navigate(`/profile/${npub}`)}
        >
          <Avatar className="bg-muted h-16 w-16">
            <AvatarImage src={profile.image?.toString()} alt={profile.name} />
          </Avatar>

          <div className="text-start">
            <p className="font-bold">{profile.name}</p>
            <p className="text-sm">{housingApplication.stayDuration} days</p>
          </div>
        </button>

        <div className="ml-auto flex items-center gap-2">
          {housingApplicationReviewListByHousingApplication === undefined ? (
            <Spinner />
          ) : housingApplicationReviewListByHousingApplication === null ||
            housingApplicationReviewListByHousingApplication.length === 0 ||
            housingApplicationReviewListByHousingApplication[
              housingApplicationReviewListByHousingApplication.length - 1
            ].status === 'Stalled' ? (
            <>
              <Button onClick={() => approveHousingApplication(housingApplication)} size="sm">
                Approve
              </Button>

              <Button
                onClick={() => declineHousingApplication(housingApplication)}
                size="sm"
                variant="destructive"
              >
                Decline
              </Button>
            </>
          ) : (
            <>
              {housingApplicationReviewListByHousingApplication[
                housingApplicationReviewListByHousingApplication.length - 1
              ].status === 'Approved' ? (
                <span className="text-sm text-primary">Approved</span>
              ) : housingApplicationReviewListByHousingApplication[
                  housingApplicationReviewListByHousingApplication.length - 1
                ].status === 'Declined' ? (
                <span className="text-sm text-destructive">Declined</span>
              ) : null}

              <Button
                onClick={() => stallHousingApplication(housingApplication)}
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
