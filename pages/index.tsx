import type { GrayMatterFile } from "gray-matter"
import React from "react"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

interface HomeProps {
  jose: GrayMatterFile<string>
}

function Curriculum({ person }: { person: GrayMatterFile<string> }) {
  return <div className="flex lg:flex-row flex-col">
    <div className="
    lg:w-1/3
    m-8
    ">
      <div className="
      bg-blue-900
      rounded-xl
      shadow-xl
      lg:min-h-almost-screen
      ">
        <PhotoAndInformation data={person.data} />
      </div>
    </div>
    <div className="
    mx-auto 
    ">
      <div className="py-20">
        <div className="text-6xl font-montserrat text-left font-bold">
          Software engineer<br/> for hire
        </div>
      </div>
      
      <div
      className="prose mx-auto my-8"
      dangerouslySetInnerHTML={{ __html: person.content }}
      />
    </div>
  </div>
}
export default function Homepage(props: HomeProps) {
  console.log(props)
  return <div className="container mx-auto">
    <Curriculum person={props.jose} />
  </div>
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  async function htmlPart(name: string): Promise<GrayMatterFile<string>> {
    const post = getBySlug(name)
    const content = await markdownToHtml(post.content || '')
    return {
      ...post,
      content,
      orig: ""
    }
  }

  return {
    props: {
      jose: (await htmlPart("jose"))
    },
  }
}