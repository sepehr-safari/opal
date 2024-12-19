import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { Housing } from '@/features/housing';

export const HomePage = () => {
  const { activeUser } = useActiveUser();

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

  return (
    <>
      <div className="p-4">
        <Housing user={activeUser} />
      </div>
    </>
  );
};
