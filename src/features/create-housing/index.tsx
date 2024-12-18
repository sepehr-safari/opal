import { useAddHousing } from '@/shared/hooks';

import { CreateHousingForm } from './components';

export const CreateHousing = () => {
  const { addHousing } = useAddHousing();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="">Create New Housing</h4>

      <CreateHousingForm submitLabel="Add Housing" onSubmit={addHousing} />
    </div>
  );
};
