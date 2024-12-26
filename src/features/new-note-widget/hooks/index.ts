import { useRealtimeProfile } from '@/shared/hooks';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { useCallback, useState } from 'react';

export const useNewNoteWidget = ({
  replyingToEvent,
}: {
  replyingToEvent?: NDKEvent | undefined;
}) => {
  const [content, setContent] = useState<string>('');

  const { activeUser } = useActiveUser();
  const { profile } = useRealtimeProfile(activeUser?.pubkey);

  const { ndk } = useNdk();

  const post = useCallback(() => {
    if (!ndk) return;
    if (!ndk.signer) return;

    const e = new NDKEvent(ndk);
    e.kind = 1;
    e.content = content;

    if (replyingToEvent) {
      const rootTag = replyingToEvent.tags.find((tag) => tag.length > 3 && tag[3] === 'root');

      if (rootTag) {
        e.tags.push(['e', rootTag[1], '', 'root']);
        e.tags.push(['e', replyingToEvent.id, '', 'reply']);
      } else {
        e.tags.push(['e', replyingToEvent.id, '', 'root']);
      }
    }

    e.publish();
  }, [content, ndk, replyingToEvent]);

  return { content, setContent, post, profile };
};
