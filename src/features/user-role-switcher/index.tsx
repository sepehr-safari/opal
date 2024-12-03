import { NDKUser } from '@nostr-dev-kit/ndk';

import { Spinner } from '@/shared/components/spinner';

import { useUserRole } from '@/shared/hooks';
import { UserRole } from '@/shared/types';

import { AgencyDashboard } from '@/features/agency/agency-dashboard';
import { PehDashboard } from '@/features/peh/peh-dashboard';
import { SetupRole } from '@/features/setup-role';

export const UserRoleSwitcher = ({ user }: { user: NDKUser }) => {
  const { role } = useUserRole({ pubkey: user.pubkey });

  switch (role) {
    case UserRole.Agency:
      return <AgencyDashboard user={user} />;
    case UserRole.Peh:
      return <PehDashboard user={user} />;
    case undefined:
      return <Spinner />;
    default:
      return <SetupRole />;
  }
};
