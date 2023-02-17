export const getExplorerLinkByAddress = (chain: string, address: string) => {
  switch (chain) {
    case 'mainnet':
      return `https://etherscan.io/address/${address}`
    case 'optimism':
      return `https://optimistic.etherscan.io/address/${address}`
    case 'optimism_goerli':
      return `https://goerli-optimism.etherscan.io/address/${address}`
    case 'goerli':
      return `https://goerli.etherscan.io/address/${address}`
    default:
      'Error: wrong chain'
  }
}

export const getExplorerLinkByTxHash = (chain: string, txHash: string) => {
  switch (chain) {
    case 'mainnet':
      return `https://etherscan.io/tx/${txHash}`
    case 'optimism':
      return `https://optimistic.etherscan.io/tx/${txHash}`
    case 'optimism_goerli':
      return `https://goerli-optimism.etherscan.io/tx/${txHash}`
    case 'goerli':
      return `https://goerli.etherscan.io/tx/${txHash}`
    default:
      'Error: wrong chain'
  }
}
