import { GrayMatterFile } from "gray-matter";
import React from "react";
import Card from "./Card";

export default function PortfolioItem({ information }: { information: GrayMatterFile<string> }) {
  return <div className="my-8">
    <Card>
      <div className="p-4">
        <div className="flex flex-row h-36">
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
            </div>
          }
        </div>
      </div>
    </Card>
  </div>
}