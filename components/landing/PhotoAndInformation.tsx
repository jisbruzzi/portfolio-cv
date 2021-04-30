export default function PhotoAndInformation({ data }: { data: { [key: string]: any } }) {
  return <div className="
    m-auto
    flex
    lg:flex-col
    flex-row
    justify-items-center
    items-center
    justify-center
    p-4
    print:p-0
    ">
    <div>
    {
        data.name && <div className="
        text-white
        lg:text-6xl
        text-3xl
        rounded-full
        font-montserrat
        text-center
        lg:m-4
        font-bold
        ">
          {data.name}
        </div>
      }
      {
        data.title && <div className="
        text-red-50
        hidden
        print:block
        rounded-full
        font-montserrat
        text-left
        lg:m-4
        font-bold
        ">
          {data.title}
        </div>
      }
    </div>

    {
      (typeof data.photo === "string") &&
      <img
        className="
          rounded-full
          lg:w-2/3
          w-1/3
          print:w-20
          max-w-xs
          border-blue-100
          border-solid
          border-4
          shadow
          m-4
          "
        src={data.photo}
      />
    }
  </div>
}