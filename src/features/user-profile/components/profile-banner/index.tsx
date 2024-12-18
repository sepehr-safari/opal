import { NDKUserProfile } from '@nostr-dev-kit/ndk';

export const ProfileBanner = ({ profile }: { profile: NDKUserProfile | null }) => {
  return (
    <>
      <div className="w-full h-28 bg-muted">
        {profile?.banner && (
          <img
            src={profile?.banner}
            alt={profile?.name || 'profile-image'}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </>
  );
};
