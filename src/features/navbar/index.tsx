import { NDKUser } from '@nostr-dev-kit/ndk';
import { useLogin } from 'nostr-hooks';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useRealtimeProfile } from '@/shared/hooks';

import { LoginWidget } from '@/features/login-widget';

export const NavbarAvatar = ({ user }: { user: NDKUser }) => {
  const { profile } = useRealtimeProfile(user.pubkey);
  const { logout } = useLogin();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profile?.image} alt={profile?.name} />
          <AvatarFallback className="bg-muted" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = ({ user }: { user: NDKUser | null | undefined }) => {
  return (
    <div className="border-b">
      <div className="m-2 flex items-center justify-between">
        <h1>OPAL</h1>

        {user ? <NavbarAvatar user={user} /> : <LoginWidget />}
      </div>
    </div>
  );
};
