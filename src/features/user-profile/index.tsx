import { NDKUser } from '@nostr-dev-kit/ndk';
import { useProfile } from 'nostr-hooks';
import { useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import {
  ProfileActions,
  ProfileAvatar,
  ProfileBanner,
  ProfileEditor,
  ProfileNotes,
  ProfileSummary,
  ProfileViewSwitcher,
} from './components';

import { ProfileView } from './types';

export const UserProfile = ({
  user,
  initialEditMode = false,
}: {
  user: NDKUser;
  initialEditMode?: boolean;
}) => {
  const { profile } = useProfile({ pubkey: user.pubkey });

  const [view, setView] = useState<ProfileView>('housing');
  const [editMode, setEditMode] = useState(initialEditMode);

  if (profile === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <div className="relative">
        {editMode ? (
          <>
            <ProfileEditor setEditMode={setEditMode} initialProfile={profile} />
          </>
        ) : (
          <>
            <ProfileBanner banner={profile?.banner} />

            <ProfileAvatar image={profile?.image} />

            <ProfileActions targetUser={user} setEditMode={setEditMode} />

            <ProfileSummary user={user} profile={profile} />

            <ProfileViewSwitcher view={view} setView={setView} />

            <div className="p-2">
              {view == 'housing' && <>Housing</>}
              {view == 'notes' && <ProfileNotes user={user} notesOnly />}
              {view == 'replies' && <ProfileNotes user={user} repliesOnly />}
              {view == 'relays' && <>User Relays</>}
            </div>
          </>
        )}
      </div>
    </>
  );
};
