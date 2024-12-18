import { NDKKind, profileFromEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useRealtimeProfile = (pubkey: string | undefined) => {
  const subId = pubkey ? `profile-${pubkey}` : undefined;

  const { createSubscription, events, isLoading } = useSubscription(subId);

  const profile = useMemo(() => {
    if (isLoading) return undefined;
    if (!events || !events.length) return null;

    const recentEvent = events[events.length - 1];

    try {
      const profile = profileFromEvent(recentEvent);

      return profile;
    } catch (_) {
      return null;
    }
  }, [events, isLoading]);

  useEffect(() => {
    if (!pubkey) return;

    createSubscription({ filters: [{ authors: [pubkey], kinds: [NDKKind.Metadata], limit: 1 }] });
  }, [pubkey, createSubscription]);

  return { profile };
};
