import { HomeIcon, MailIcon, NotepadTextIcon, UserIcon } from 'lucide-react';
import { useActiveUser } from 'nostr-hooks';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export const Controlbar = () => {
  const navigate = useNavigate();

  const { activeUser } = useActiveUser();

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="max-w-md mx-auto p-2 border-t bg-background z-10 flex items-center justify-between">
        <Button size="icon" variant="ghost" onClick={() => navigate('/')}>
          <HomeIcon size={24} />
        </Button>

        <Button size="icon" variant="ghost" onClick={() => navigate('/notes')}>
          <NotepadTextIcon size={24} />
        </Button>

        <Button size="icon" variant="ghost" onClick={() => navigate('/messages')}>
          <MailIcon size={24} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate(`/profile/${activeUser?.npub}`)}
        >
          <UserIcon size={24} />
        </Button>
      </div>
    </div>
  );
};
