import { Button } from '@/shared/components/ui/button';

import { useMutateUserRole } from '@/shared/hooks';

export const SetupRole = () => {
  const { updateUserRole } = useMutateUserRole();

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <h4>What are you looking for?</h4>

      <div className="flex items-center gap-4">
        <Button onClick={() => updateUserRole('peh')}>I Need Housing</Button>

        <Button onClick={() => updateUserRole('agency')}>I Have Housing to Offer</Button>
      </div>
    </div>
  );
};
