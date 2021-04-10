import Button from "./Button"

export default function Hero({ data }: { data: { [key: string]: any } }) {
  return <div className="m-auto lg:min-h-almost-screen flex flex-col justify-center px-4 lg:py-0 py-8">
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
      <Button> Let's talk </Button>
    </div>
  </div>
}