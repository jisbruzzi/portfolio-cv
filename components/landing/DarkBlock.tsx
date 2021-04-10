import { GrayMatterFile } from "gray-matter";

export default function DarkBlock({ text }: { text: GrayMatterFile<string> }) {
  return <div
    className="bg-blue-900 text-white prose prose-white prose-compact max-w-none">
    <div className="md:max-w-2xl md:mx-auto px-8 py-4">
      {
        text.data.title &&
        <h1 className="text-white text-center text-6xl font-montserrat m-4 font-extrabold">
          {text.data.title}
        </h1>
      }
      <div dangerouslySetInnerHTML={{ __html: text.content }} />
    </div>
  </div>
}