import { useActiveUser } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { NoteByNoteId } from '@/features/note-widget';
import { NotesFeedWidget } from '@/features/notes-feed-widget';

export const NotesPage = () => {
  const { noteId } = useParams();

  const { activeUser } = useActiveUser();

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to OPAL!</h3>
        <p>Sign in to see notes</p>
      </div>
    );
  }

  if (!noteId) {
    return <NotesFeedWidget />;
  }

  return (
    <>
      <div className="p-4">
        <NoteByNoteId noteId={noteId} />
      </div>
    </>
  );
};
