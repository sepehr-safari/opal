import { NDKUser } from '@nostr-dev-kit/ndk';
import { useFollows } from 'nostr-hooks';
import { memo, useEffect, useMemo, useState } from 'react';

import { Button } from '@/shared/components/ui/button';

export const FollowUnfollowBtn = memo(
  ({ targetUser, activeUser }: { targetUser: NDKUser; activeUser: NDKUser }) => {
    const [label, setLabel] = useState<string>('Follow');

    const { follows } = useFollows({ pubkey: activeUser.pubkey });

    const isFollowed = useMemo(
      () => follows?.some((u) => u.pubkey === targetUser.pubkey),
      [follows, targetUser.pubkey],
    );

    if (activeUser.pubkey === targetUser.pubkey) {
      return null;
    }

    useEffect(() => {
      if (isFollowed) {
        setLabel('Unfollow');
      } else {
        setLabel('Follow');
      }
    }, [isFollowed, setLabel]);

    if (isFollowed) {
      return (
        <>
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={() => {
              activeUser.unfollow(targetUser);
              setLabel('Follow');
            }}
          >
            {label}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={() => {
              activeUser.follow(targetUser);
              setLabel('Unfollow');
            }}
          >
            {label}
          </Button>
        </>
      );
    }
  },
  (prev, next) =>
    prev.targetUser.pubkey === next.targetUser.pubkey &&
    prev.activeUser.pubkey === next.activeUser.pubkey,
);
