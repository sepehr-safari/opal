import { useActiveUser } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { Messages } from '@/features/messages';

export const MessagesPage = () => {
  const { npub } = useParams();

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

  if (!npub) {
    return (
      <>
        <div className="p-4">
          <h4>All Messages</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4">
        <Messages npub={npub} />
      </div>
    </>
  );
};
