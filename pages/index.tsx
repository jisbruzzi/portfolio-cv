import type { GrayMatterFile } from "gray-matter"
import React, { PropsWithChildren, useReducer } from "react"
import Card from "../components/landing/Card"
import ContentContainer from "../components/landing/ContentContainer"
import Curriculum from "../components/landing/Curriculum"
import Hero from "../components/landing/Hero"
import PhotoAndInformation from "../components/landing/PhotoAndInformation"
import PortfolioItem from "../components/landing/PortfolioItem"
import ReadMore from "../components/landing/ReadMoreButton"
import { getBySlug, getPortfolioItems, getTech } from "../lib/landingParts"
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

interface Technology {
  name: string,
  knowledge: number,
}

interface HomeProps {
  jose: {
    main: GrayMatterFile<string>,
    detail: GrayMatterFile<string>,
  },
  experience: GrayMatterFile<string>,
  portfolio: GrayMatterFile<string>[],
  technologies: Technology[]
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
        {props.technologies.sort((a, b) => b.knowledge - a.knowledge).map(tech => <div className="bg-white m-2 text-xl p-3 rounded-full shadow-xl">
          {tech.name}
        </div>)}
      </div>
    </ContentContainer>
  </div>
}

function LetsTalkFooter(props: {}) {
  return <div
    className="bg-blue-900 text-white pb-60 pt-20">
    <ContentContainer>

      <div className="
        text-center text-2xl 
        m-4
      ">
        I can turn your idea into <span className="font-bold">reality</span>.
      </div>
      
      <div className="
        text-center text-8xl 
        font-montserrat m-4 font-extrabold 
        filter drop-shadow-strong
      ">
        Let's Talk
      </div>
      <div
        className="text-center prose prose-white prose-compact max-w-none text-xl"
      >
        Send me an email to <a href="mailto:jose.sbru@gmail.com">jose.sbru@gmail.com</a>
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
    <LetsTalkFooter />
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
  function mapTechnologies(): Technology[] {
    const tech = getTech();
    if (tech instanceof Array) {
      return tech.map((value) => {
        if (value instanceof Array && typeof value[0] === "string" && typeof value[1] === "number") {
          return {
            name: value[0],
            knowledge: value[1],
          }
        }
      }).reduce<Technology[]>((acum, next) => next == undefined ? acum : [...acum, next], [])
    }
    return []
  }

  return {
    props: {
      jose: {
        main: (await htmlPart("jose.md")),
        detail: (await htmlPart("jose.details.md")),
      },
      experience: (await htmlPart("experience.md")),
      portfolio: await Promise.all(getPortfolioItems().map(name => htmlPart(`portfolio/${name}`))),
      technologies: mapTechnologies()
    },
  }
}