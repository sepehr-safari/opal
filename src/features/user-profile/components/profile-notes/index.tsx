import { NDKUser } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect } from 'react';

export const ProfileNotes = ({ user }: { user: NDKUser }) => {
  const subId = `user-notes-${user.pubkey}`;

  const { events, createSubscription } = useSubscription(subId);

  useEffect(() => {
    if (!user.pubkey) {
      return;
    }

    createSubscription({ filters: [{ authors: [user.pubkey], kinds: [1], limit: 20 }] });
  }, [createSubscription, user.pubkey]);

  return (
    <>
      <div>
        {events?.map((event) => (
          <div key={event.id} className="p-4 bg-gray-100 rounded-lg mb-4 truncate">
            {event.content}
          </div>
        ))}
      </div>
    </>
  );
};
