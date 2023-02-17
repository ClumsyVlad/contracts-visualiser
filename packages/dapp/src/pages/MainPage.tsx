import useMemo } from "react"
import { ChangeEvent, useState } from "react"
import { ContractTable } from "../components"
import { getExplorerLinkByAddress, getExplorerLinkByTxHash, getShortenAddress } from "../utils/"

export const MainPage = () => {
  const [fileAsJSON, setFileAsJSON] = useState<Record<string, any> | null>()
  const reader = new FileReader()
  reader.onload = logFile

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      reader.readAsText(files[0])
    }
  }

  function logFile(event: ProgressEvent<FileReader>) {
    let str = event.target?.result as string
    if (str) {
      setFileAsJSON(JSON.parse(str))
    }
  }

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
      <p>
        Upload your contract (e.g. 'deployments.json')
      </p>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileSelected}
      />

      {fileAsJSON && Object.keys(fileAsJSON).map((chain) => {
        const chainFromJSON = fileAsJSON[chain]
        const tableByChainData = Object.keys(chainFromJSON).map((contract) => {
          const contractName = contract
          const txHash = chainFromJSON[contract]["txHash"]
          const address = chainFromJSON[contract]["address"]
          const multisig = chainFromJSON[contract]["multisig"]

          return ({
            contractName: <span className="table__content">{contractName}</span>,
            txHash: <a href={getExplorerLinkByTxHash(chain, txHash)} target="_blank" title="Explore transaction">{getShortenAddress(txHash)} </a>,
            address: <a href={getExplorerLinkByAddress(chain, address)} target="_blank" title="Explore contract"> {getShortenAddress(address)}</a>,
            multisig: <span className="table__content">{multisig ? '✅' : '❌'}</span>,
          })
        })

        return (
          <div className="chainBlock" key={chain}>
            <h4 className="chainBlock__title">Chain: {chain}</h4>
            <div className="chainBlock__table-wrapper">
              <ContractTable columns={columns} data={tableByChainData} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
