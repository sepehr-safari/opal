import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BookmarkIcon, HeartIcon, MessageSquareIcon, Repeat2Icon, ZapIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export const NoteFooter = ({}: { event: NDKEvent }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between gap-2">
        <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
          <MessageSquareIcon size={18} />
        </Button>

        <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
          <ZapIcon size={18} />
        </Button>

        <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
          <HeartIcon size={18} />
        </Button>

        <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
          <Repeat2Icon size={18} />
        </Button>

        <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
          <BookmarkIcon size={18} />
        </Button>
      </div>
    </div>
  );
};
