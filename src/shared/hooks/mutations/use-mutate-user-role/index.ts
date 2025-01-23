import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useCallback } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';

import { OpalTag, UserRole } from '@/shared/types';

export const useMutateUserRole = () => {
  const { toast } = useToast();

  const { ndk } = useNdk();

  const updateUserRole = useCallback(
    (role: UserRole) => {
      if (!ndk) return;
      if (!ndk.signer) return;

      const event = new NDKEvent(ndk);
      event.kind = NDKKind.AppSpecificData;
      event.dTag = OpalTag.UserRole;
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

  return { updateUserRole };
};
