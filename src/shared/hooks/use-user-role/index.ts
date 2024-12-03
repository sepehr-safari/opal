import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useState } from 'react';

import { UserRole } from '@/shared/types';

const VALID_ROLES: string[] = Object.values(UserRole);

export const useUserRole = ({ pubkey }: { pubkey: string }) => {
  const subId = `user-role-${pubkey}`;

  const [role, setRole] = useState<UserRole | null | undefined>(undefined);

  const { createSubscription, removeSubscription } = useSubscription(subId);

  useEffect(() => {
    const filters: NDKFilter[] = [
      {
        authors: [pubkey],
        kinds: [NDKKind.AppSpecificData],
        limit: 1,
        '#d': ['opal/v0/user-role'],
      },
    ];

    const sub = createSubscription(filters);

    let hasValidRole = false;
    sub?.on('event', (event) => {
      const userRoleTags = event.getMatchingTags('user-role');
      if (!userRoleTags.length) return;

      const userRoleTag = userRoleTags[0];
      if (userRoleTag.length < 2) return;

      hasValidRole = true;

      if (VALID_ROLES.includes(userRoleTag[1])) setRole(userRoleTag[1] as UserRole);
    });

    sub?.on('eose', () => {
      if (!hasValidRole) setRole(null);
    });

    return () => {
      removeSubscription();
    };
  }, [pubkey, createSubscription, removeSubscription]);

  return { role };
};
