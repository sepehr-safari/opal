import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { NDKEvent, NDKKind, NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useState } from 'react';

export const Messages = ({ npub }: { npub: string }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<NDKEvent[] | undefined>(undefined);

  const { activeUser } = useActiveUser();
  const { ndk } = useNdk();

  const subId = `messages-from-${npub}`;
  const { createSubscription, events } = useSubscription(subId);

  const sendMessage = useCallback(async () => {
    if (!ndk || !activeUser) {
      return;
    }

    const u = new NDKUser({ npub });

    const encrypted = await ndk.signer?.encrypt(u, input, 'nip04');

    if (!encrypted) {
      return;
    }

    const e = new NDKEvent(ndk);
    e.kind = NDKKind.EncryptedDirectMessage;
    e.content = encrypted;
    e.tags = [['p', u.pubkey]];
    e.publish();
  }, [ndk, activeUser, input, npub]);

  useEffect(() => {
    if (!npub || !activeUser) {
      return;
    }

    createSubscription({
      filters: [{ kinds: [NDKKind.EncryptedDirectMessage], '#p': [activeUser.pubkey], limit: 10 }],
    });
  }, [activeUser, npub, createSubscription]);

  useEffect(() => {
    if (!events || events.length === 0) {
      return;
    }

    events.forEach((e) => {
      e.decrypt().then(() => {
        setMessages((prev) => [...(prev || []), e]);
      });
    });
  }, [events, setMessages]);

  return (
    <>
      <div>{messages?.map((e) => <p key={e.id}>{e.content}</p>)}</div>

      <div className="flex flex-col gap-2">
        <Input type="text" value={input} onChange={(e) => setInput(e.target.value)} />

        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
};
