import DateFormatter from './date-formatter'
import Author from '../types/author'

type Props = {
  title: string
  date?: string
}

const PostHeader = ({ title, date }: Props) => {
  return (
    <>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {title}
      </h1>
      {date&&<div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>}
    </>
  )
}

export default PostHeader
