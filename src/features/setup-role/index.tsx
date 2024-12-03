import { Button } from '@/shared/components/ui/button';

import { useUpdateUserRole } from '@/shared/hooks';
import { UserRole } from '@/shared/types';

export const SetupRole = () => {
  const { updateRole } = useUpdateUserRole();

  return (
    <div className="flex flex-col items-center gap-2 m-2">
      <h4>Do you need help or want to provide help?</h4>

      <div className="flex items-center gap-4">
        <Button onClick={() => updateRole(UserRole.Peh)}>Need Help</Button>

        <Button onClick={() => updateRole(UserRole.Agency)}>Want to Help</Button>
      </div>
    </div>
  );
};
