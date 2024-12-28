import { NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { UserProfileWidget } from '@/features/user-profile-widget';

export const ProfilePage = () => {
  const { activeUser } = useActiveUser();

  const { npub } = useParams();

  const user = useMemo(() => (npub ? new NDKUser({ npub }) : undefined), [npub]);

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="p-4">
        <h4>Not logged in</h4>
      </div>
    );
  }

  if (!npub || !user) {
    return <p>Invalid profile</p>;
  }

  return (
    <>
      <UserProfileWidget user={user} />
    </>
  );
};
