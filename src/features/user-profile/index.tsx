import { NDKUser } from '@nostr-dev-kit/ndk';
import { useProfile } from 'nostr-hooks';
import { useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import {
  ProfileActions,
  ProfileAvatar,
  ProfileBanner,
  ProfileEditor,
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
        <ProfileBanner profile={profile} />

        <ProfileAvatar profile={profile} />

        {editMode ? (
          <>
            <ProfileEditor setEditMode={setEditMode} initialProfile={profile} />
          </>
        ) : (
          <>
            <ProfileActions targetUser={user} setEditMode={setEditMode} />

            <ProfileSummary user={user} profile={profile} />

            <ProfileViewSwitcher view={view} setView={setView} />

            <div className="p-4">
              {view == 'housing' && <>Housing</>}
              {view == 'notes' && <>User Notes</>}
              {view == 'replies' && <>User Replies</>}
              {view == 'relays' && <>User Relays</>}
            </div>
          </>
        )}
      </div>
    </>
  );
};
