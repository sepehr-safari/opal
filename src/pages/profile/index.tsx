import { UserProfile } from '@/features/user-profile';
import { NDKUser } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
  const { npub } = useParams();

  const user = useMemo(() => (npub ? new NDKUser({ npub }) : undefined), [npub]);

  if (!npub || !user) {
    return <p>Invalid profile</p>;
  }

  return (
    <>
      <UserProfile user={user} />
    </>
  );
};
