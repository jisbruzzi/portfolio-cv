import { PropsWithChildren } from "react";

export default function Card(props: PropsWithChildren<{dark?:boolean}>) {
  return <div className={`
  ${props.dark?"bg-blue-900":"bg-white"}
  rounded-xl
  shadow-xl
  p-4
  `}>
    {props.children}
  </div>
}