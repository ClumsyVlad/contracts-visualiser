import React, { Fragment, useMemo } from "react"
import { ChangeEvent, useState } from "react"
import { ContractTable } from "../components"

export const MainPage = () => {
  const [fileAsString, setFileAsString] = useState<string | null>()
  const [fileAsJSON, setFileAsJSON] = useState<object | null>()
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
      setFileAsString(str)
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
        const tableByChainData = Object.keys(chainFromJSON).map((contract) => ({
          contractName: <span className="table__content">{contract}</span>,
          txHash: <span className="table__content">{chainFromJSON[contract]["txHash"]}</span>,
          address: <span className="table__content">{chainFromJSON[contract]["address"]}</span>,
          multisig: <span className="table__content">{chainFromJSON[contract]["multisig"].toString()}</span>,
        }))

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
