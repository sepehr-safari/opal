import { NDKUserProfile } from '@nostr-dev-kit/ndk';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

export const ProfileAvatar = ({ profile }: { profile: NDKUserProfile | null }) => {
  return (
    <>
      <Avatar className="ring ring-white bg-muted w-24 h-24 absolute top-16 left-4">
        <AvatarImage src={profile?.image} />
        <AvatarFallback />
      </Avatar>
    </>
  );
};
