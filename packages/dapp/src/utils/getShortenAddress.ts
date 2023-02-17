export const getShortenAddress = (address: string) => {
  if (address && address.length > 10) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4)
  }
  return address
}