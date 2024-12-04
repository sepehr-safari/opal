import { Housing, UserRole } from '@/shared/types';
import { HousingListItem } from './components';

export const HousingList = ({
  housingList,
  userRole,
}: {
  housingList: Housing[];
  userRole: UserRole;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {housingList.map((housing) => (
        <HousingListItem key={housing.id} housing={housing} userRole={userRole} />
      ))}
    </div>
  );
};
