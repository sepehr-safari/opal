import { NDKUser } from '@nostr-dev-kit/ndk';

import { Spinner } from '@/shared/components/spinner';

import { useRealtimeProfile, useUserRole } from '@/shared/hooks';

import { AvailableHousingList } from '@/features/available-housing-list';
import { CreateHousing } from '@/features/create-housing';
import { SetupRole } from '@/features/setup-role';
import { UserProfile } from '@/features/user-profile';

export const Housing = ({ user }: { user: NDKUser }) => {
  const { role } = useUserRole({ pubkey: user.pubkey });
  const { profile } = useRealtimeProfile(user.pubkey);

  if (role === undefined) {
    return <Spinner />;
  }

  if (role === null) {
    return <SetupRole />;
  }

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return (
      <>
        <div className="pb-4">
          <h4>Set up your profile</h4>
        </div>

        <UserProfile user={user} initialEditMode={true} />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {role === 'agency' && <CreateHousing />}

        <AvailableHousingList />
      </div>
    </>
  );
};
