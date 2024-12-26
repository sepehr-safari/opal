import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { NotesFeed } from '@/features/notes-feed';

export const NotesPage = () => {
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
      <NotesFeed />
    </>
  );
};
