import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { UserRole } from '@/shared/types';

const VALID_ROLES: UserRole[] = ['agency', 'peh'];

export const useUserRole = ({ pubkey }: { pubkey: string }) => {
  const subId = `user-role-${pubkey}`;

  const { createSubscription, events, isLoading } = useSubscription(subId);

  const role = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const recentEvent = events[events.length - 1];

    const userRoleTags = recentEvent.getMatchingTags('r');
    if (!userRoleTags.length) return null;

    const userRoleTag = userRoleTags[0];
    if (userRoleTag.length < 2) return null;

    if (!VALID_ROLES.includes(userRoleTag[1] as UserRole)) return null;

    return userRoleTag[1] as UserRole;
  }, [events, isLoading]);

  useEffect(() => {
    createSubscription({
      filters: [
        {
          kinds: [NDKKind.AppSpecificData],
          limit: 1,
          authors: [pubkey],
          '#d': ['opal/v0.1/user-role'],
        },
      ],
    });
  }, [pubkey, createSubscription]);

  return { role };
};
