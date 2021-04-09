import type { GrayMatterFile } from "gray-matter"
import React from "react"
import Hero from "../components/landing/Hero"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

interface HomeProps {
  jose: GrayMatterFile<string>
}

function Curriculum({ person }: { person: GrayMatterFile<string> }) {
  return <div className="flex lg:flex-row flex-col align-middle">
    <div className="
    lg:w-1/3
    lg:m-8
    m-4
    ">
      <div className="
      bg-blue-900
      rounded-xl
      shadow-xl
      lg:min-h-almost-screen
      sticky top-8
      ">
        <PhotoAndInformation data={person.data} />
      </div>
    </div>
    <div className="lg:w-2/3 lg:m-8 m-4">
      <Hero data={person.data} />
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