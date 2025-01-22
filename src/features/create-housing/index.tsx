import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

import { useMutateHousing } from '@/shared/hooks';

import { CreateHousingForm } from './components';

export const CreateHousing = () => {
  const [open, setOpen] = useState(false);

  const { addHousing } = useMutateHousing();

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <Button className="flex gap-2">
            Create New Housing
            <ChevronDownIcon size={16} className={open ? 'transform rotate-180' : ''} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 border p-4 rounded-lg">
          <CreateHousingForm submitLabel="Add Housing" onSubmit={addHousing} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
