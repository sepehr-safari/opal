import { Button } from '@/shared/components/ui/button';

import { useAddHousing } from '@/shared/hooks';

export const AgencyHousing = () => {
  const { addHousing } = useAddHousing();

  return (
    <>
      <h4>Agency Housing</h4>

      <Button
        onClick={() =>
          addHousing({
            name: 'Shelter',
            description: 'A place to stay',
            location: 'Somewhere nearby',
            isAvailable: true,
            contact: '123-456-789',
          })
        }
      >
        Add Housing
      </Button>
    </>
  );
};
