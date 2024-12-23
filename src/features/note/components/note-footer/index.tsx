import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BookmarkIcon, MessageSquareIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { NoteLikeBtn, NoteRepostBtn, NoteZapBtn } from '../';

export const NoteFooter = ({ event }: { event: NDKEvent }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between gap-2">
        <Button variant="link" size="icon" className="opacity-50 hover:opacity-100">
          <MessageSquareIcon size={18} />
        </Button>

        <NoteZapBtn event={event} />

        <NoteLikeBtn event={event} />

        <NoteRepostBtn event={event} />

        <Button variant="link" size="icon" className="opacity-50 hover:opacity-100">
          <BookmarkIcon size={18} />
        </Button>
      </div>
    </div>
  );
};
