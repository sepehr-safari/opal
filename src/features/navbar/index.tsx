import { useActiveUser } from 'nostr-hooks';

import { ActiveUserWidget } from '@/features/active-user-widget';
import { LoginWidget } from '@/features/login-widget';

export const Navbar = () => {
  const { activeUser } = useActiveUser();

  return (
    <div className="border-b bg-background">
      <div className="m-2 flex items-center justify-between">
        <h1>OPAL</h1>

        {activeUser ? <ActiveUserWidget /> : <LoginWidget />}
      </div>
    </div>
  );
};
