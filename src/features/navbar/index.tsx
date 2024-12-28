import { NDKUser } from '@nostr-dev-kit/ndk';
import { PowerIcon, UserIcon } from 'lucide-react';
import { useActiveUser, useLogin, useRealtimeProfile } from 'nostr-hooks';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { LoginWidget } from '@/features/login-widget';

export const NavbarAvatar = ({ activeUser }: { activeUser: NDKUser }) => {
  const { profile } = useRealtimeProfile(activeUser.pubkey);
  const { logout } = useLogin();

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profile?.image} alt={profile?.name} />
          <AvatarFallback className="bg-muted" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onClick={() => navigate(`/profile/${activeUser.npub}`)}>
          <UserIcon className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <PowerIcon className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  const { activeUser } = useActiveUser();

  return (
    <div className="border-b bg-background">
      <div className="m-2 flex items-center justify-between">
        <h1>OPAL</h1>

        {activeUser ? <NavbarAvatar activeUser={activeUser} /> : <LoginWidget />}
      </div>
    </div>
  );
};
