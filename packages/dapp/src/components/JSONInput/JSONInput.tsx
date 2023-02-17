import { ChangeEvent } from "react"

interface JSONInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const JSONInput = ({ onChange }: JSONInputProps) => {
  return (
    <input
      type="file"
      accept="application/json"
      onChange={onChange}
    />
  )
}
