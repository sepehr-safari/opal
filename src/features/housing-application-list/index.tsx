import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

import { HousingApplication } from '@/shared/types';

import { HousingApplicationListItem } from './components';

export const HousingApplicationList = ({
  housingApplicationList,
}: {
  housingApplicationList: HousingApplication[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapsible
        open={open}
        onOpenChange={(open) => setOpen(housingApplicationList.length > 0 ? open : false)}
      >
        <CollapsibleTrigger>
          <Button className="flex gap-2">
            {housingApplicationList.length === 0
              ? 'Your housing has no requests yet'
              : housingApplicationList.length === 1
                ? 'Your housing has 1 request'
                : `Your housing has ${housingApplicationList.length} requests`}

            {housingApplicationList.length > 0 && (
              <ChevronDownIcon size={16} className={open ? 'transform rotate-180' : ''} />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-4 border p-4 rounded-lg flex flex-col gap-2">
            {housingApplicationList.map((housingApplication) => (
              <HousingApplicationListItem
                key={housingApplication.eventAddress}
                housingApplication={housingApplication}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
