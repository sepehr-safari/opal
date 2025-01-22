import { useActiveUser } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { NotificationsWidget } from '@/features/notifications-widget';

export const NotificationsPage = () => {
  const { activeUser } = useActiveUser();

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to OPAL!</h3>
        <p>Sign in to see your notifications</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <NotificationsWidget />
    </div>
  );
};
