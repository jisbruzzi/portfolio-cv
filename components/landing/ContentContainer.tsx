import { PropsWithChildren } from "react"

export default function ContentContainer(props:PropsWithChildren<{}>){
  return <div className="md:max-w-2xl md:mx-auto md:px-8 md:py-4 print:px-0 print:py-0">
    {props.children}
  </div>
}