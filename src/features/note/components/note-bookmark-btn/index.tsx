import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BookmarkIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteBookmarkBtn } from './hooks';

export const NoteBookmarkBtn = ({ event }: { event: NDKEvent }) => {
  const { isBookmarkedByMe, bookmark, unbookmark } = useNoteBookmarkBtn(event);

  return (
    <>
      <Button
        variant="link"
        size="icon"
        className={cn(isBookmarkedByMe ? 'text-green-600' : 'opacity-50 hover:opacity-100')}
        onClick={isBookmarkedByMe ? unbookmark : bookmark}
      >
        <BookmarkIcon size={18} />
      </Button>
    </>
  );
};