import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { Housing } from '@/features/housing';

export const HomePage = () => {
  const { activeUser } = useActiveUser();

  return (
    <>
      {activeUser === undefined ? (
        <Spinner />
      ) : activeUser === null ? (
        <div className="p-4">
          <h4>Not logged in</h4>
        </div>
      ) : (
        <div className="p-4">
          <Housing user={activeUser} />
        </div>
      )}
    </>
  );
};
