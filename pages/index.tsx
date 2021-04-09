import type { GrayMatterFile } from "gray-matter"
import { getBySlug } from "../lib/landingParts"
import markdownToHtml from "../lib/markdownToHtml"

interface HomeProps{
  jose:GrayMatterFile<string>
}
function PhotoAndInformation({data}:{data:{[key:string]:any}}){
  return <div className="
  m-auto
  flex
  flex-col
  justify-items-center
  items-center
  justify-center
  h-full
  ">
    {
      <div className="
      text-white
      text-4xl
      w-2/3
      rounded-full
      font-montserrat
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
        "
        src={data.photo}
        />
      
    }
  </div>
}
function Curriculum({person}:{person:GrayMatterFile<string>}){
  return <div className="flex lg:flex-row flex-col lg:h-almost-screen">
    <div className="
    bg-blue-900
    lg:w-1/3
    ">
      <PhotoAndInformation data={person.data}/>
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
export default function Homepage(props:HomeProps){
  console.log(props)
  return <Curriculum person={props.jose}/>
}

export async function getStaticProps():Promise<{props:HomeProps}> {
    async function htmlPart(name:string):Promise<GrayMatterFile<string>>{
      const post = getBySlug(name)
      const content = await markdownToHtml(post.content || '')
      return {
        ...post,
        content,
        orig:""
      }
    }
    
  
    return {
      props: {
        jose:(await htmlPart("jose"))
      },
    }
  }