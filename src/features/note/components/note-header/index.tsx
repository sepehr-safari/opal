import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { formatDistanceToNowStrict } from 'date-fns';
import { EllipsisIcon, FileJsonIcon, HeartIcon, LinkIcon, TagIcon, TextIcon } from 'lucide-react';
import { useProfile } from 'nostr-hooks';
import { useCopyToClipboard } from 'usehooks-ts';
import { NoteParent } from './components';

export const NoteHeader = ({ event }: { event: NDKEvent }) => {
  const [, copy] = useCopyToClipboard();

  const { profile } = useProfile({ pubkey: event.pubkey });

  return (
    <>
      <div className="pb-2 flex justify-between gap-2">
        <Avatar className="bg-muted">
          <AvatarImage src={profile?.image} alt={profile?.name} />
          <AvatarFallback />
        </Avatar>

        <div className="grow">
          <p className="font-semibold leading-tight">{profile?.name}</p>
          <p className="text-xs text-gray-500 leading-tight">{profile?.nip05}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">
            {formatDistanceToNowStrict((event.created_at || 0) * 1000)}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" size="icon" className="opacity-40 hover:opacity-100">
                <EllipsisIcon size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuItem
                onClick={() => {
                  // TODO
                }}
              >
                <HeartIcon className="w-4 h-4 mr-2" />
                Reactions
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => copy(window.location.href)}>
                <LinkIcon className="w-4 h-4 mr-2" />
                Copy note link
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => copy(event.content)}>
                <TextIcon className="w-4 h-4 mr-2" />
                Copy note text
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => copy(event.id)}>
                <TagIcon className="w-4 h-4 mr-2" />
                Copy note ID
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => copy(JSON.stringify(event.rawEvent()))}>
                <FileJsonIcon className="w-4 h-4 mr-2" />
                Copy raw data
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <NoteParent event={event} />
    </>
  );
};
