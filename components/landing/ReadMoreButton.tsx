import React from "react"
import Button from "./Button"

function ChevronDown() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
}
export default function ReadMore(props: any) {
  return <Button {...props}>
    <div className="flex flex-row">
      <div className="pr-4">More</div>
      <div className={`
        transition-transform
        transform
        ${props.open ? 'rotate-180' : 'rotate-0'}
        `}>
        <ChevronDown />
      </div>
    </div>
  </Button>
}