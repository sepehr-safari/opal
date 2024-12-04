import { Spinner } from '@/shared/components/spinner';

import { useHousingList } from '@/shared/hooks';
import { UserRole } from '@/shared/types';

import { HousingList } from '@/features/housing-list';

export const PehHousingList = () => {
  const { housingList } = useHousingList();

  return (
    <>
      {housingList === undefined && <Spinner />}

      {housingList === null && <p>No housing available</p>}

      {housingList && <HousingList userRole={UserRole.Peh} housingList={housingList} />}
    </>
  );
};
