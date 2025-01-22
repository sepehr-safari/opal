export const parseEventAddress = (eventAddress: string) => {
  const parts = eventAddress.split(':');
  if (parts.length !== 3) return null;
  const [kind, pubkey, identifier] = parts;
  return { kind, pubkey, identifier };
};
