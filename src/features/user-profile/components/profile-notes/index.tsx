import { NDKUser } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';

import { NoteByEvent } from '@/features/note';

export const ProfileNotes = ({
  user,
  notesOnly,
  repliesOnly,
}: {
  user: NDKUser;
  notesOnly?: boolean;
  repliesOnly?: boolean;
}) => {
  const subId = `user-notes-${user.pubkey}`;

  const { events, createSubscription, loadMore, hasMore, isLoading } = useSubscription(subId);

  useEffect(() => {
    if (!user.pubkey) {
      return;
    }

    createSubscription({ filters: [{ authors: [user.pubkey], kinds: [1], limit: 50 }] });
  }, [createSubscription, user.pubkey]);

  return (
    <>
      <div>
        {events
          ?.filter((e) => {
            if (notesOnly) {
              return e.getMatchingTags('e').length == 0;
            }

            if (repliesOnly) {
              return e.getMatchingTags('e').length > 0;
            }

            return true;
          })
          .reverse()
          .map((event) => <NoteByEvent key={event.id} event={event} />)}
      </div>

      {hasMore && (
        <div className="py-4 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => loadMore(50)}
            className="w-full"
            disabled={isLoading}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};
