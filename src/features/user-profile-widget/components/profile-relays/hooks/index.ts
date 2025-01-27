import { NDKKind, NDKUser } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useEffect, useState } from 'react';

export const useProfileRelays = ({ user }: { user: NDKUser }) => {
  const [relays, setRelays] = useState<string[] | null | undefined>(undefined);

  const { ndk } = useNdk();

  useEffect(() => {
    ndk?.fetchEvent({ authors: [user.pubkey], kinds: [NDKKind.RelayList] }).then((event) => {
      if (event) {
        setRelays(event.tags.filter((tag) => tag[0] === 'r').map((tag) => tag[1]));
      } else {
        setRelays(null);
      }
    });
  }, [user, ndk, setRelays]);

  return { relays };
};
