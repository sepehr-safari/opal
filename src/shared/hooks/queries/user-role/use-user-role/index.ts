import { NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { OpalTag, UserRole } from '@/shared/types';

const VALID_ROLES: UserRole[] = ['agency', 'peh'];

export const useUserRole = (pubkey: string | undefined) => {
  const subId = pubkey ? `user-role-${pubkey}` : undefined;

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
    pubkey &&
      createSubscription({
        filters: [
          {
            kinds: [NDKKind.AppSpecificData],
            limit: 1,
            authors: [pubkey],
            '#d': [OpalTag.UserRole],
          },
        ],
      });
  }, [pubkey, createSubscription]);

  return { role };
};
