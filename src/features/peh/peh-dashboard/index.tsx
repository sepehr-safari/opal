import { NDKUser } from '@nostr-dev-kit/ndk';

import { Spinner } from '@/shared/components/spinner';

import { useRealtimeProfile } from '@/shared/hooks';

import { PehHousing } from '@/features/peh/peh-housing';
import { UserProfileSetup } from '@/features/user-profile-setup';

export const PehDashboard = ({ user }: { user: NDKUser }) => {
  const { profile } = useRealtimeProfile(user.pubkey);

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return <UserProfileSetup user={user} />;
  }

  return (
    <div className="m-4">
      <h3>PEH Dashboard</h3>

      <PehHousing />
    </div>
  );
};
