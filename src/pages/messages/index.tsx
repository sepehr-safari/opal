import { useActiveUser } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { MessagesWidget } from '@/features/messages-widget';

export const MessagesPage = () => {
  const { npub } = useParams();

  const { activeUser } = useActiveUser();

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to OPAL!</h3>
        <p>Sign in to see your messages</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-full">
        <MessagesWidget npub={npub} />
      </div>
    </>
  );
};
