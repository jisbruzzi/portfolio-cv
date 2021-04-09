export default function PhotoAndInformation({ data }: { data: { [key: string]: any } }) {
  return <div className="
    m-auto
    flex
    flex-col
    justify-items-center
    items-center
    justify-center
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