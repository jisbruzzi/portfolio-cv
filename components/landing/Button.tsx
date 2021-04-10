import { PropsWithChildren } from "react";

export default function Button(props:any) {
  return <button className="
    bg-blue-900
    rounded-md
    shadow
    font-sans
    px-4
    py-2
    text-white
    font-bold
    hover:bg-blue-800
  " {...props} />
}