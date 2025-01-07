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
      <div className="p-4">
        <h4>Not logged in</h4>
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
