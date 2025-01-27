import { useActiveUser, useRealtimeProfile } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { useUserRole } from '@/shared/hooks';

import { NoteByNoteId } from '@/features/note-widget';
import { NotesFeedWidget } from '@/features/notes-feed-widget';
import { SetupRole } from '@/features/setup-role';
import { UserProfileWidget } from '@/features/user-profile-widget';

export const NotesPage = () => {
  const { noteId } = useParams();

  const { activeUser } = useActiveUser();
  const { role } = useUserRole(activeUser?.pubkey);
  const { profile } = useRealtimeProfile(activeUser?.pubkey);

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to OPAL!</h3>
        <p>Sign in to see posts</p>
      </div>
    );
  }

  if (role === undefined) {
    return <Spinner />;
  }

  if (role === null) {
    return <SetupRole />;
  }

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return (
      <>
        <div className="p-4">
          <h4>Set up your profile</h4>
        </div>

        <UserProfileWidget user={activeUser} initialEditMode={true} />
      </>
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
