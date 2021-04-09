import type { GrayMatterFile } from "gray-matter"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

interface HomeProps {
  jose: GrayMatterFile<string>
}
function PhotoAndInformation({ data }: { data: { [key: string]: any } }) {
  return <div className="
  m-auto
  flex
  flex-col
  justify-items-center
  items-center
  justify-center
  h-full
  p-4
  ">
    {
      data.name && <div className="
      text-white
      text-6xl
      rounded-full
      font-montserrat
      text-center
      m-4
      font-bold
      ">
        {data.name}
      </div>
    }

    {
      (typeof data.photo === "string") &&
      <img
        className="
        rounded-full
        w-2/3
        max-w-xs
        border-blue-100
        border-solid
        border-4
        shadow
        my-4
        "
        src={data.photo}
      />
    }

    {
      data.caption && <div className="
      text-white
      rounded-full
      font-montserrat
      text-center
      font-bold
      text-xl
      my-4
      ">
        {data.caption}
      </div>
    }

  </div>
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