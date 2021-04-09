import type { GrayMatterFile } from "gray-matter"
import React from "react"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

interface HomeProps {
  jose: GrayMatterFile<string>
}

function Curriculum({ person }: { person: GrayMatterFile<string> }) {
  return <div className="flex lg:flex-row flex-col lg:min-h-almost-screen">
    <div className="
    bg-blue-900
    lg:w-1/3
    rounded-xl
    m-8
    shadow-xl
    relative
    ">
      <PhotoAndInformation data={person.data} />
    </div>
    <div
      className="
      prose
      m-auto
      "
      dangerouslySetInnerHTML={{ __html: person.content }}
    />
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