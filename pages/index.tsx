import type { GrayMatterFile } from "gray-matter"
import React, { PropsWithChildren } from "react"
import Card from "../components/landing/Card"
import ContentContainer from "../components/landing/ContentContainer"
import Hero from "../components/landing/Hero"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import PortfolioItem from "../components/landing/PortfolioItem"
import { getBySlug, getPortfolioItems } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

function SectionTitle(props:PropsWithChildren<{}>){
  return <h1 className="
  text-center text-4xl 
  font-montserrat m-4 font-extrabold 
  ">
    {props.children}
  </h1>
}

function DarkBlock({ text }: { text: GrayMatterFile<string> }) {
  return <div
    className="bg-blue-900 text-white">
    <ContentContainer>
      {
        text.data.title &&
        <SectionTitle>
          <span className="filter drop-shadow-strong">
            {text.data.title}
          </span>
        </SectionTitle>
      }
      <div 
        className="prose prose-white prose-compact max-w-none"
        dangerouslySetInnerHTML={{ __html: text.content }} 
      />
    </ContentContainer>
  </div>
}

interface HomeProps {
  jose: GrayMatterFile<string>,
  experience: GrayMatterFile<string>,
  portfolio: GrayMatterFile<string>[]
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
      lg:min-h-almost-screen
      sticky top-8
      ">
        <Card dark>
          <PhotoAndInformation data={person.data} />
        </Card>
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

function Portfolio(props:{portfolioItems:GrayMatterFile<string>[]}){
  return <div className="bg-blue-50">
    <ContentContainer>
      <SectionTitle> Portfolio </SectionTitle>
      {props.portfolioItems.map(item=><PortfolioItem information={item}/>)}
    </ContentContainer>
  </div>
}
export default function Homepage(props: HomeProps) {
  console.log(props)
  return <>
    <Curriculum person={props.jose} />
    <DarkBlock text={props.experience}/>
    <Portfolio portfolioItems={props.portfolio}/>
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
      jose: (await htmlPart("jose.md")),
      experience: (await htmlPart("experience.md")),
      portfolio: await Promise.all(getPortfolioItems().map(name=>htmlPart(`portfolio/${name}`)))
    },
  }
}