import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

export const MessagesPage = () => {
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
        <>
          <h4>Messages</h4>
        </>
      )}
    </>
  );
};
