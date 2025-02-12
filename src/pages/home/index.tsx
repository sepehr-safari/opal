import { useActiveUser, useRealtimeProfile } from 'nostr-hooks';

import { Spinner } from '@/shared/components/spinner';

import { useUserRole } from '@/shared/hooks';

import { AllAvailableHousingList } from '@/features/available-housing-list';
import { CreateHousing } from '@/features/create-housing';
import { SetupRole } from '@/features/setup-role';
import { UserProfileWidget } from '@/features/user-profile-widget';

export const HomePage = () => {
  const { activeUser } = useActiveUser();
  const { role } = useUserRole(activeUser?.pubkey);
  const { profile } = useRealtimeProfile(activeUser?.pubkey);

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to OPAL!</h3>
        <p>Login to Create or View Housing Options</p>
      </div>
    );
  }

  if (role === undefined) {
    return <Spinner />;
  }

  if (role === null) {
    return <SetupRole />;
  }

  if (profile === undefined) {
    return <Spinner />;
  }

  if (profile === null) {
    return (
      <>
        <div className="h-full overflow-y-auto">
          <div className="p-4">
            <h4>Set up your profile</h4>
          </div>

          <UserProfileWidget user={activeUser} initialEditMode={true} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b">
          <h4>Welcome to OPAL!</h4>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {role === 'agency' && (
            <div className="p-4 border rounded-md shadow-md flex w-full items-center">
              <div className="w-full">
                <CreateHousing />
              </div>
            </div>
          )}

          <AllAvailableHousingList />
        </div>
      </div>
    </>
  );
};
