import type { GrayMatterFile } from "gray-matter"
import React from "react"
import ContentContainer from "../components/landing/ContentContainer"
import Hero from "../components/landing/Hero"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

function DarkBlock({ text }: { text: GrayMatterFile<string> }) {
  return <div
    className="bg-blue-900">
    <ContentContainer>
      {
        text.data.title &&
        <h1 className="text-white text-center text-4xl font-montserrat m-4 font-extrabold filter drop-shadow-strong ">
          {text.data.title}
        </h1>
      }
      <div 
        className="text-white prose prose-white prose-compact max-w-none"
        dangerouslySetInnerHTML={{ __html: text.content }} 
      />
    </ContentContainer>
  </div>
}

interface HomeProps {
  jose: GrayMatterFile<string>,
  experience: GrayMatterFile<string>,
}

function Curriculum({ person }: { person: GrayMatterFile<string> }) {
  return <div className="container mx-auto">
  <div className="flex lg:flex-row flex-col align-middle">
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
      className="prose mx-auto my-8 prose-compact prose-weaker"
      dangerouslySetInnerHTML={{ __html: person.content }}
      />
    </div>
  </div>
  </div>
}
export default function Homepage(props: HomeProps) {
  console.log(props)
  return <>
    <Curriculum person={props.jose} />
    <DarkBlock text={props.experience}/>
  </>
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
      jose: (await htmlPart("jose")),
      experience: (await htmlPart("experience")),
    },
  }
}