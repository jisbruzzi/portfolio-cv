import Button from "./Button"

export default function Hero({ data }: { data: { [key: string]: any } }) {
  return <div className="m-auto lg:min-h-almost-screen flex flex-col justify-center px-4 lg:py-0 py-8 print:hidden">
    <div className="m-auto">
      {
        data.title && <h1 className="text-6xl font-montserrat text-left font-bold">
          {data.title}
        </h1>
      }
      {
        data.subtitle && <div className="text-xl font-montserrat text-left">
          {data.subtitle}
        </div>
      }
      <div className="my-4">
        <a href="mailto:jose.sbru@gmail.com">
          <Button> Let's talk </Button>
        </a>
      </div>
    </div>
  </div>
}