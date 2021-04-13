import { GrayMatterFile } from "gray-matter";
import React, { useReducer } from "react";
import Card from "./Card";
import ReadMore from "./ReadMoreButton";

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