import { useMemo, useEffect } from "react"
import { ChangeEvent, useState } from "react"
import { ContractTable, JSONInput } from "../components"
import { getExplorerLinkByAddress, getExplorerLinkByTxHash, getShortenAddress } from "../utils/"

import beryllium from '../../deployments/beryllium.json'
import boron from '../../deployments/boron.json'
import carbon from '../../deployments/carbon.json'
import helium from '../../deployments/helium.json'
import lithium from '../../deployments/lithium.json'
import nitrogen from '../../deployments/nitrogen.json'
import ragnarok from '../../deployments/ragnarok.json'
import tequila from '../../deployments/tequila.json'

const DEPLOYMENTS_LIST: Array<any> = [beryllium, boron, carbon, helium, lithium, nitrogen, ragnarok, tequila]
const DEPLOYMENTS_LIST_NAMES = ['beryllium', 'boron', 'carbon', 'helium', 'lithium', 'nitrogen', 'ragnarok', 'tequila']

export const MainPage = () => {
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
    <div className="layoutContainer">
      {DEPLOYMENTS_LIST_NAMES.map((deployment, index) => {
        const deploymentData = DEPLOYMENTS_LIST[index]
        const deploymentChainNamesList = Object.keys(deploymentData).map((chain) => chain)
        return (
          <div className="deployment" key={deployment}>
            <h2 className="deploymentTitle">
              {deployment}
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
                  <h3 className="deploymentChain">{chainName}</h3>
                  <div className="chainBlock__table-wrapper">
                    <ContractTable columns={columns} data={tableByChainData} />
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
