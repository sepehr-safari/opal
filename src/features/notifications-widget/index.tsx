import { useActiveUser, useSubscription } from 'nostr-hooks';
import { memo, useEffect, useMemo } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { UserRole } from '@/shared/types';

import {
  useHousingApplicationListByAgency,
  useHousingApplicationReviewListByPeh,
} from '@/shared/hooks';
import {
  HousingApplicationListByAgency,
  HousingApplicationReviewListByPeh,
  MentionsAndReplies,
  Reactions,
  Reposts,
} from './components';

export const NotificationsWidget = memo(({ role }: { role: UserRole }) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `notifications-${activeUser.pubkey}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [{ kinds: [1, 6, 7], '#p': [activeUser.pubkey], limit: 100 }],
      });
  }, [activeUser, createSubscription]);

  const { housingApplicationReviewListByPeh } = useHousingApplicationReviewListByPeh({
    pehPubkey: role === 'peh' ? activeUser?.pubkey : undefined,
  });
  const { housingApplicationListByAgency } = useHousingApplicationListByAgency({
    agencyPubkey: role === 'agency' ? activeUser?.pubkey : undefined,
  });

  const filteredHousingApplicationReviewListByPeh = useMemo(
    () =>
      housingApplicationReviewListByPeh?.filter(
        (housingApplication) => housingApplication.status !== 'Stalled',
      ),
    [housingApplicationReviewListByPeh],
  );

  const filteredHousingApplicationListByAgency = useMemo(
    () =>
      housingApplicationListByAgency?.filter(
        (housingApplication) => housingApplication.status === 'Applied',
      ),
    [housingApplicationListByAgency],
  );

  const mentionsAndReplies = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 1 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const reposts = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 6 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const reactions = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 7 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );

  return (
    <div>
      <Tabs defaultValue="housing">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="housing">Housing</TabsTrigger>
          <TabsTrigger value="mentions-replies">Mentions and Replies</TabsTrigger>
          <TabsTrigger value="reposts">Reposts</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
        </TabsList>
        <TabsContent value="housing">
          {role === 'peh' ? (
            <HousingApplicationReviewListByPeh
              housingApplicationReviewListByPeh={filteredHousingApplicationReviewListByPeh}
            />
          ) : (
            <HousingApplicationListByAgency
              housingApplicationListByAgency={filteredHousingApplicationListByAgency}
            />
          )}
        </TabsContent>
        <TabsContent value="mentions-replies">
          <MentionsAndReplies mentionsAndReplies={mentionsAndReplies} />
        </TabsContent>
        <TabsContent value="reposts">
          <Reposts reposts={reposts} />
        </TabsContent>
        <TabsContent value="reactions">
          <Reactions reactions={reactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
});
