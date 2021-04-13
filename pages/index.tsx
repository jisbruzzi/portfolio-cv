import type { GrayMatterFile } from "gray-matter"
import React, { PropsWithChildren, useReducer } from "react"
import Card from "../components/landing/Card"
import ContentContainer from "../components/landing/ContentContainer"
import Curriculum from "../components/landing/Curriculum"
import Hero from "../components/landing/Hero"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import PortfolioItem from "../components/landing/PortfolioItem"
import ReadMore from "../components/landing/ReadMoreButton"
import { getBySlug, getPortfolioItems } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

function SectionTitle(props: PropsWithChildren<{}>) {
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

interface Technology{
  name:string,
  knowledge:number,
}

interface HomeProps {
  jose: {
    main:GrayMatterFile<string>,
    detail:GrayMatterFile<string>,
  },
  experience: GrayMatterFile<string>,
  portfolio: GrayMatterFile<string>[],
  technologies:Technology[]
}

function Portfolio(props: { portfolioItems: GrayMatterFile<string>[] }) {
  return <div className="bg-blue-50">
    <ContentContainer>
      <SectionTitle> Portfolio </SectionTitle>
      {props.portfolioItems.map(item => <PortfolioItem information={item} />)}
    </ContentContainer>
  </div>
}

function Tech(props: { technologies: Technology[] }) {
  return <div className="bg-blue-50">
    <ContentContainer>
      <SectionTitle> Technologies </SectionTitle>
      <div className="flex flex-wrap justify-evenly">
        {props.technologies.sort((a,b)=>b.knowledge-a.knowledge).map(tech => <div className="bg-white m-2 text-xl p-3 rounded-full shadow-xl">
          {tech.name}
        </div>)}
      </div>
    </ContentContainer>
  </div>
}

export default function Homepage(props: HomeProps) {
  console.log(props)
  return <>
    <Curriculum main={props.jose.main} detail={props.jose.detail} />
    <DarkBlock text={props.experience} />
    <Portfolio portfolioItems={props.portfolio} />
    <Tech technologies={props.technologies} />
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
      jose: {
        main:(await htmlPart("jose.md")),
        detail:(await htmlPart("jose.details.md")),
      },
      experience: (await htmlPart("experience.md")),
      portfolio: await Promise.all(getPortfolioItems().map(name => htmlPart(`portfolio/${name}`))),
      technologies:[
        { name:"python", knowledge:10 },
        { name:"javascript", knowledge:10 },
        { name:"react", knowledge:9 },
        { name:"C#", knowledge:6 },
        { name:"java", knowledge:6 },
        { name:"SQL", knowledge:9 },
        { name:"flask", knowledge:8 },
        { name:"django", knowledge:6 },
        { name:"nextjs", knowledge:8 },
        { name:"vue", knowledge:7 },
        { name:"ocaml", knowledge:4 },
        { name:"lisp", knowledge:4 },
        { name:"coq", knowledge:2 },
        { name:"IIS", knowledge:2 },
        { name:"terraform", knowledge:8 },
        { name:"C", knowledge:6 },
        { name:"C++", knowledge:4 },
        { name:"nodeJS", knowledge:10 },
        { name:"mongodb", knowledge:3 },
        { name:"bash", knowledge:7 },
        { name:"numpy", knowledge:5 },
        { name:"bootstrap", knowledge:6 },
        { name:"bulma", knowledge:6 },
        { name:"webgl", knowledge:5 },
        { name:"clojure", knowledge:4 },
        { name:"tailwind", knowledge:7 },
        { name:"GLSL", knowledge:2 },
        { name:"Docker", knowledge:10 },
        { name:"AWS", knowledge:7 },
        { name:"Google cloud", knowledge:7 },
        { name:"Quasar Framework", knowledge:9 },
        { name:"Material UI", knowledge:7 },
      ]
    },
  }
}