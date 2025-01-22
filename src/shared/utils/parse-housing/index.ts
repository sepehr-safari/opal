import { NDKEvent } from '@nostr-dev-kit/ndk';

import { Housing } from '@/shared/types';

export const parseHousing = (event: NDKEvent) => {
  const dTag = event.dTag;
  if (!dTag) return null;

  const name = event.getMatchingTags('N')?.[0]?.[1] || undefined;
  if (!name) return null;

  const description = event.getMatchingTags('description')?.[0]?.[1] || undefined;
  if (!description) return null;

  const location = event.getMatchingTags('location')?.[0]?.[1] || undefined;
  if (!location) return null;

  const status = event.getMatchingTags('s')?.[0]?.[1] || undefined;
  if (!status) return null;

  const contactPhone = event.getMatchingTags('contactPhone')?.[0]?.[1] || undefined;
  if (!contactPhone) return null;

  // contactPhone should be a string starting with a + and followed by numbers
  if (!contactPhone.match(/^\+\d+$/)) return null;

  const contactEmail = event.getMatchingTags('contactEmail')?.[0]?.[1] || undefined;
  const contactFullname = event.getMatchingTags('contactFullname')?.[0]?.[1] || undefined;
  const contactPosition = event.getMatchingTags('contactPosition')?.[0]?.[1] || undefined;

  const totalUnits = parseInt(event.getMatchingTags('totalUnits')?.[0]?.[1] || '');
  if (!totalUnits) return null;

  const availableUnits = parseInt(event.getMatchingTags('availableUnits')?.[0]?.[1] || '');
  if (!availableUnits) return null;

  const maxStay = parseInt(event.getMatchingTags('maxStay')?.[0]?.[1] || '');
  if (!maxStay) return null;

  return {
    id: dTag,
    housingEvent: event,
    agencyPubkey: event.pubkey,
    status,
    name,
    description,
    location,
    contactPhone,
    contactEmail,
    contactFullname,
    contactPosition,
    totalUnits,
    availableUnits,
    maxStay,
  } as Housing;
};
