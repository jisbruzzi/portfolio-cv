import { PropsWithChildren } from "react";

export default function Button(props:PropsWithChildren<{}>) {
  return <button className="
    bg-blue-900
    rounded-md
    shadow
    font-sans
    px-4
    py-2
    my-4
    text-white
    font-bold
    hover:bg-blue-800
  ">
      {props.children}
  </button>
}