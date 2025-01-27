import { NDKUser } from '@nostr-dev-kit/ndk';
import { memo } from 'react';

import { useProfileRelays } from './hooks';

export const ProfileRelays = memo(
  ({ user }: { user: NDKUser }) => {
    const { relays } = useProfileRelays({ user });

    return (
      <>
        <div className="flex flex-col gap-2">
          {relays?.map((relay) => (
            <p key={relay} className="border-b text-sm pb-1">
              {relay}
            </p>
          ))}
        </div>
      </>
    );
  },
  (prev, next) => prev.user.pubkey === next.user.pubkey,
);
