import { GrayMatterFile } from "gray-matter";
import React, { useReducer } from "react";
import Card from "./Card";
import Hero from "./Hero";
import PhotoAndInformation from "./PhotoAndInformation";
import ReadMore from "./ReadMoreButton";

export default function Curriculum({ main, detail }: { main: GrayMatterFile<string>, detail: GrayMatterFile<string> }) {
  const [open, alternateOpen] = useReducer((s: boolean) => !s, false);
  return <div className="bg-blue-50 pb-8 print:pb-0">
    <div className="container mx-auto">
      <div className="flex lg:flex-row flex-col align-middle">
        <div className="
      lg:w-1/3
      lg:m-8
      m-4
      print:m-1
      ">
          <div className="
        lg:min-h-almost-screen
        sticky top-8
        ">
            <Card dark>
              <PhotoAndInformation data={main.data} />
            </Card>
          </div>
        </div>
        <div className="lg:w-2/3 lg:m-8 m-4 relative print:m-1">
          <Hero data={main.data} />
          <div
            className="prose mx-auto my-8 prose-compact prose-weaker print:my-2 print:prose-super-compact prose-bluetitles"
            dangerouslySetInnerHTML={{ __html: main.content }}
          />
          <div className="absolute right-2 print:hidden">
            <div className="relative lg:bottom-4 bottom-8">
              <ReadMore open={open} onClick={alternateOpen} />
            </div>
          </div>
          <div className={`
          transition-height
          overflow-hidden
          ${open ? "" : "h-0"}
          print:h-auto
          `}>
            <div className="prose mx-auto my-8 print:my-1 prose-compact prose-bluetitles prose-weaker print:prose-super-compact " dangerouslySetInnerHTML={{ __html: detail.content }} />
          </div>
        </div>
      </div>
    </div>
  </div>
}