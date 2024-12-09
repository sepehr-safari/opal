import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';
import { UserRole } from '@/shared/types';

export const useUpdateUserRole = () => {
  const { toast } = useToast();

  const { ndk } = useNdk();

  const updateRole = useCallback(
    (role: UserRole) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const event = new NDKEvent(ndk);
      event.kind = NDKKind.AppSpecificData;
      event.dTag = 'opal/v0.1/user-role';
      event.tags.push(['r', role.toString()]);

      event.publish().then(
        (r) =>
          r.size == 0 &&
          toast({ title: 'Error', description: 'Failed to update role', variant: 'destructive' }),
        () =>
          toast({ title: 'Error', description: 'Failed to update role', variant: 'destructive' }),
      );
    },
    [ndk, toast],
  );

  return { updateRole };
};
