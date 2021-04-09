export default function Hero({ data }: { data: { [key: string]: any } }) {
  return <div className="m-auto lg:min-h-almost-screen flex flex-col justify-center px-4">
    <div className="m-auto">
      {
        data.title && <div className="text-6xl font-montserrat text-left font-bold">
          {data.title}
        </div>
      }
      {
        data.subtitle && <div className="text-xl font-montserrat text-left">
          {data.subtitle}
        </div>
      }

      <button className="
      bg-blue-900
      rounded-md
      shadow
      font-sans
      px-4
      py-2
      my-4
      text-white
      font-bold
      hover:bg-blue-800
      ">
        Let's talk
      </button>
    </div>
  </div>
}