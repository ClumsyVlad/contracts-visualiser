import { ChangeEvent, useState } from "react"

export const MainPage = () => {
  const [fileAsString, setFileAsString] = useState<string | null>()

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
      setFileAsString(str?.toString())

      console.log(JSON.parse(str))
    }
  }

  return (
    <>
      <p>
        Upload your contract (e.g. 'deployments.json')
      </p>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileSelected}
      />

      {(fileAsString) && (
        <div style={{ textAlign: "left" }}>
          <p>Your JSON result:</p>
          <p>As string</p>
          <pre>
            {fileAsString?.toString()}
          </pre>
        </div>
      )}
    </>
  )
}
