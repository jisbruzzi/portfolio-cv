import { PropsWithChildren } from "react"

export default function ContentContainer(props:PropsWithChildren<{}>){
  return <div className="md:max-w-2xl md:mx-auto px-8 py-4">
    {props.children}
  </div>
}