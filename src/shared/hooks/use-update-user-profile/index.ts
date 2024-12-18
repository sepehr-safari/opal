import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';

export const useUpdateUserProfile = () => {
  const { activeUser } = useActiveUser();
  const { toast } = useToast();

  const { ndk } = useNdk();

  const updateUserProfile = useCallback(
    (userProfile: NDKUserProfile) => {
      if (!ndk) return;
      if (!ndk.signer) return;
      if (!activeUser) return;

      const _u = ndk.getUser({ pubkey: activeUser.pubkey });

      _u.profile = { ...userProfile };

      _u.publish()
        .then(() => toast({ title: 'Success', description: 'User profile updated successfully' }))
        .catch(() =>
          toast({
            title: 'Error',
            description: 'Failed to update user profile',
            variant: 'destructive',
          }),
        );
    },
    [ndk, activeUser, toast],
  );

  return { updateUserProfile };
};
