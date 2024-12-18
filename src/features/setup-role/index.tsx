import { Button } from '@/shared/components/ui/button';

import { useUpdateUserRole } from '@/shared/hooks';

export const SetupRole = () => {
  const { updateRole } = useUpdateUserRole();

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <h4>Do you need help or want to provide help?</h4>

      <div className="flex items-center gap-4">
        <Button onClick={() => updateRole('peh')}>Need Help</Button>

        <Button onClick={() => updateRole('agency')}>Want to Help</Button>
      </div>
    </div>
  );
};
