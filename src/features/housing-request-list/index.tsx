import { HousingRequest } from '@/shared/types';

import { HousingRequestListItem } from './components';

export const HousingRequestList = ({
  housingRequestList,
}: {
  housingRequestList: HousingRequest[];
}) => {
  return (
    <div className="">
      <p>{housingRequestList.length} requests</p>

      <div className="flex gap-2 flex-wrap">
        {housingRequestList.map((housingRequest) => (
          <HousingRequestListItem key={housingRequest.id} housingRequest={housingRequest} />
        ))}
      </div>
    </div>
  );
};
