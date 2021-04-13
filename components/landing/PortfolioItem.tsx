import { GrayMatterFile } from "gray-matter";
import React, { useReducer } from "react";
import Button from "./Button";
import Card from "./Card";
function ChevronDown(){
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
}
function ReadMore(props:any){
  return <Button {...props}>
    <div className="flex flex-row">
      <div className="pr-4">More</div> 
      <div className={`
      transition-transform
      transform
      ${props.open?'rotate-180':'rotate-0'}
      `}>
        <ChevronDown/>
      </div>
    </div>
  </Button>
}
export default function PortfolioItem({ information }: { information: GrayMatterFile<string> }) {
  const [open,alternateOpen] = useReducer((s:boolean)=>!s,false);
  return <div className="my-8">
    <Card>
      <div className="p-4 relative">
        <div className="flex flex-row h-40">
          {
            information.data.cover && <>
              <img
                src={information.data.cover}
                className="
                  w-1/3
                  rounded-xl
                  shadow
                  border-blue-100
                  border-solid
                  border-4
                  object-cover
                  "
              />
            </>
          }
          {
            information.data.title && <div className="p-4 w-2/3">
              <h1 className="
                text-2xl
                font-montserrat
                font-bold
                ">
                {information.data.title}
              </h1>
              <a className="hover:underline text-sm text-blue-900" href={information.data.website}>website</a>
              <div dangerouslySetInnerHTML={{ __html: information.data.excerpt }} />
              <div className="absolute right-2 bottom-2">
                <ReadMore open={open} onClick={alternateOpen}/>
              </div>
            </div>
          }
        </div>
      </div>
      <div className={`
      transition-height
      overflow-hidden
      ${open?"":"h-0"}
      `}>
        <div className="prose prose-compact prose-weaker p-4" dangerouslySetInnerHTML={{ __html: information.content }} />
      </div>
    </Card>
  </div>
}