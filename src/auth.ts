export const getKeyRequestMessage = (address: string, expiredAt: number): string => {
  return `key request for ${address} expired at ${expiredAt}`;
}
