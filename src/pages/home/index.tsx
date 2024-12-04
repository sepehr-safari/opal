import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { Navbar } from '@/features/navbar';
import { UserRoleSwitcher } from '@/features/user-role-switcher';

export const HomePage = () => {
  const { activeUser } = useActiveUser();

  return (
    <>
      <Navbar user={activeUser} />

      {activeUser === undefined ? (
        <Spinner />
      ) : activeUser === null ? (
        <div className="m-4">
          <h4>Not logged in</h4>
        </div>
      ) : (
        <div className="m-4 flex flex-col gap-4">
          <UserRoleSwitcher user={activeUser} />
        </div>
      )}
    </>
  );
};
