import { GrayMatterFile } from "gray-matter";
import React, { useReducer } from "react";
import Card from "./Card";
import ReadMore from "./ReadMoreButton";

export default function PortfolioItem({ information }: { information: GrayMatterFile<string> }) {
  const [open,alternateOpen] = useReducer((s:boolean)=>!s,false);
  return <div className="my-8">
    <Card>
      <div className="p-4 relative">
        <div className="flex sm:flex-row flex-col sm:h-40">
          {
            information.data.cover && <>
              <img
                src={information.data.cover}
                className="
                  sm:w-1/3
                  xs:h-44
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
            information.data.title && <div className="sm:p-4 pt-4 pb-12 sm:w-2/3">
              <h3 className="
                text-2xl
                font-montserrat
                font-bold
                ">
                {information.data.title}
              </h3>
              <a className="hover:underline text-sm text-blue-900" href={information.data.website}>website</a>
              <div dangerouslySetInnerHTML={{ __html: information.data.excerpt }} />
              {
                (information.content.length>10) &&
                <div className="absolute right-2 bottom-2">
                  <ReadMore open={open} onClick={alternateOpen}/>
                </div>
              }
            </div>
          }
        </div>
      </div>
      <div className={`
      transition-height
      overflow-hidden
      ${open?"":"h-0"}
      `}>
        <div className="prose prose-compact prose-weaker p-4 text-justify pr-6" dangerouslySetInnerHTML={{ __html: information.content }} />
      </div>
    </Card>
  </div>
}