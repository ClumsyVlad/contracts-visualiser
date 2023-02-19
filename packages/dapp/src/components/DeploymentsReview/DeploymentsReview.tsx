import beryllium from 'dapp/deployments/beryllium.json'
import boron from 'dapp/deployments/boron.json'
import carbon from 'dapp/deployments/carbon.json'
import helium from 'dapp/deployments/helium.json'
import lithium from 'dapp/deployments/lithium.json'
import nitrogen from 'dapp/deployments/nitrogen.json'
import ragnarok from 'dapp/deployments/ragnarok.json'
import tequila from 'dapp/deployments/tequila.json'
import { getExplorerLinkByAddress, getExplorerLinkByTxHash, getShortenAddress } from "dapp/src/utils"
import { useMemo } from 'react'
import { ContractTable } from '../ContractTable'

const DEPLOYMENTS_LIST: Array<any> = [beryllium, boron, carbon, helium, lithium, nitrogen, ragnarok, tequila]
const DEPLOYMENTS_LIST_NAMES = ['beryllium', 'boron', 'carbon', 'helium', 'lithium', 'nitrogen', 'ragnarok', 'tequila']

export const DeploymentsReview = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Contract Name',
        accessor: 'contractName',
      },
      {
        Header: 'Transaction Hash',
        accessor: 'txHash',
      },
      {
        Header: 'Contract address',
        accessor: 'address',
      },
      {
        Header: 'Multisig',
        accessor: 'multisig',
      }
    ],
    []
  )

  return (
    <>
      {DEPLOYMENTS_LIST_NAMES.map((deployment, index) => {
        const deploymentData = DEPLOYMENTS_LIST[index]
        const deploymentChainNamesList = Object.keys(deploymentData).map((chain) => chain)
        return (
          <div className="deployment" key={deployment}>
            <h2 className="deploymentTitle">
              Deployment: {deployment}
            </h2>
            {deploymentChainNamesList.map((chainName, index) => {
              const dataByChainName = deploymentData[chainName]
              const tableByChainData = Object.keys(dataByChainName).map((contract) => {
                const contractName = contract
                const txHash = dataByChainName[contract]["txHash"]
                const address = dataByChainName[contract]["address"]
                const multisig = dataByChainName[contract]["multisig"]

                return ({
                  contractName: <span className="table__content">{contractName}</span>,
                  txHash: <a href={getExplorerLinkByTxHash(chainName, txHash)} target="_blank" title="Explore transaction">{getShortenAddress(txHash)} </a>,
                  address: <a href={getExplorerLinkByAddress(chainName, address)} target="_blank" title="Explore contract"> {getShortenAddress(address)}</a>,
                  multisig: <span className="table__content">{multisig ? '✅' : '❌'}</span>,
                })
              })

              return (
                <div className="deploymentChain" key={index}>
                  <h3 className="deploymentChain__name">Chain: {chainName}</h3>
                  <div className="chainBlock__table-wrapper">
                    <ContractTable columns={columns} data={tableByChainData} />
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}