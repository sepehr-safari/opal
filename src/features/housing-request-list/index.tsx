import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

import { HousingRequest } from '@/shared/types';

import { HousingRequestListItem } from './components';

export const HousingRequestList = ({
  housingRequestList,
}: {
  housingRequestList: HousingRequest[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <Button className="flex gap-2">
            {housingRequestList.length === 0
              ? 'Your housing has no requests yet'
              : housingRequestList.length === 1
                ? 'Your housing has 1 request'
                : `Your housing has ${housingRequestList.length} requests`}

            <ChevronDownIcon size={16} className={open ? 'transform rotate-180' : ''} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-4 border p-4 rounded-lg flex flex-col gap-2">
            {housingRequestList.map((housingRequest) => (
              <HousingRequestListItem key={housingRequest.id} housingRequest={housingRequest} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
