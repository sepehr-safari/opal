import { NDKEvent } from '@nostr-dev-kit/ndk';

export const getHTag = (event: NDKEvent) => {
  const housingHTags = event.getMatchingTags('h');
  if (!housingHTags || housingHTags.length === 0) return null;

  const housingHTag = housingHTags[0];
  if (!housingHTag || housingHTag.length < 2) return null;

  return housingHTag[1];
};
