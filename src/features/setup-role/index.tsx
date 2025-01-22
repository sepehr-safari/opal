import { Button } from '@/shared/components/ui/button';

import { useMutateUserRole } from '@/shared/hooks';

export const SetupRole = () => {
  const { updateUserRole } = useMutateUserRole();

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <h4>Do you need help or want to provide help?</h4>

      <div className="flex items-center gap-4">
        <Button onClick={() => updateUserRole('peh')}>Need Help</Button>

        <Button onClick={() => updateUserRole('agency')}>Want to Help</Button>
      </div>
    </div>
  );
};
