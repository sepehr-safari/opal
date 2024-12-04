import { NDKUser } from '@nostr-dev-kit/ndk';

import { Spinner } from '@/shared/components/spinner';

import { useRealtimeProfile } from '@/shared/hooks';

import { AgencyHousing } from '@/features/agency/agency-housing';
import { UserProfileSetup } from '@/features/user-profile-setup';

export const AgencyDashboard = ({ user }: { user: NDKUser }) => {
  const { profile } = useRealtimeProfile(user.pubkey);

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return <UserProfileSetup user={user} />;
  }

  return (
    <>
      <AgencyHousing />
    </>
  );
};
