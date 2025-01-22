import { BedIcon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { Spinner } from '@/shared/components/spinner';

import { useHousingItemByEventAddress } from '@/shared/hooks';
import { HousingApplicationReview } from '@/shared/types';
import { ellipsis } from '@/shared/utils';

import { HousingWidget } from '@/features/housing-widget';

export const HousingApplicationReviewListByPeh = memo(
  ({
    housingApplicationReviewListByPeh,
  }: {
    housingApplicationReviewListByPeh: HousingApplicationReview[] | null | undefined;
  }) => {
    if (housingApplicationReviewListByPeh === undefined) {
      return <Spinner />;
    }

    if (
      housingApplicationReviewListByPeh === null ||
      housingApplicationReviewListByPeh.length === 0
    ) {
      return <div>No reviews yet</div>;
    }

    return (
      <>
        {housingApplicationReviewListByPeh.map((review) => (
          <div key={review.eventAddress} className="px-2 pb-2">
            <div className="border rounded-sm shadow-md bg-background transition-colors duration-500 ease-out hover:border-primary/30">
              <div className="flex flex-wrap items-center gap-2 px-2 py-2">
                <BedIcon size={18} />

                <Agency pubkey={review.ndkEvent.pubkey} npub={review.ndkEvent.author.npub} />
              </div>

              <HousingByEventAddress housingEventAddress={review.housingEventAddress} />
            </div>
          </div>
        ))}
      </>
    );
  },
);

const Agency = memo(({ pubkey, npub }: { pubkey: string; npub: string }) => {
  const { profile } = useRealtimeProfile(pubkey);

  return (
    <Link to={`/profile/${npub}`}>
      <div className="flex gap-1 items-center">
        <Avatar className="bg-secondary w-5 h-5">
          <AvatarImage src={profile?.image} className="bg-secondary" />
        </Avatar>

        <p className="text-xs font-light">
          <span>{ellipsis(profile?.name?.toString() || npub, 20)}</span>
        </p>
      </div>
    </Link>
  );
});

const HousingByEventAddress = memo(({ housingEventAddress }: { housingEventAddress: string }) => {
  const { housingItem } = useHousingItemByEventAddress({ housingEventAddress });

  if (housingItem === undefined) {
    return <Spinner />;
  }

  if (housingItem === null) {
    return (
      <>
        <div className="p-2">
          <p>Housing item not found</p>;
        </div>
      </>
    );
  }

  if (housingItem.status === 'NotAvailable') {
    return (
      <>
        <div className="p-2">
          <p>Housing item is not available</p>
        </div>
      </>
    );
  }

  return <HousingWidget housing={housingItem} userRole="peh" />;
});
