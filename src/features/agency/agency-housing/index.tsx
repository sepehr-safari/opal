import { Separator } from '@/shared/components/ui/separator';

import { useAddHousing } from '@/shared/hooks';

import { AgencyHousingForm } from '@/features/agency/agency-housing-form';
import { AgencyHousingList } from '@/features/agency/agency-housing-list';

export const AgencyHousing = () => {
  const { addHousing } = useAddHousing();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="underline-offset-8 underline">Create New Housing</h4>

      <AgencyHousingForm submitLabel="Add Housing" onSubmit={addHousing} />

      <Separator />

      <h4 className="underline-offset-8 underline">Housing List</h4>

      <AgencyHousingList />
    </div>
  );
};
