import { GrayMatterFile } from "gray-matter";
import React from "react";
import Button from "./Button";
import Card from "./Card";
function ChevronDown(){
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
}
function ReadMore(){
  return <Button>
    <div className="flex flex-row">
      <div>More</div> <div className="pl-4"><ChevronDown/></div>
    </div>
  </Button>
}
export default function PortfolioItem({ information }: { information: GrayMatterFile<string> }) {
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
                <ReadMore/>
              </div>
            </div>
          }
        </div>
      </div>
    </Card>
  </div>
}