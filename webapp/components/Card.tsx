interface Props {
  content?: string
  highlight?: string
  pillText: string
  title: string
}

export const Card: React.FC<{ data: Props }> = ({ data }) => (
  <a
    href={`/${data.title.split(' ').join('')}`}
    className="w-[30rem] group border-2 border-b-4 border-gray-200 overflow-hidden rounded-xl hover:bg-gray-50">
    <div className="grid grid-cols-6 p-5 gap-y-2 dark:bg-white">
      <div>
        <img src="https://picsum.photos/seed/2/200" className="rounded-full max-w-16 max-h-16" />
      </div>

      <div className="col-span-5 ml-4 md:col-span-4">
        {data?.highlight && <p className="text-xs font-bold text-sky-500"> {data.highlight} </p>}

        {data.title && <p className="font-bold text-gray-600"> {data.title} </p>}

        {data?.content && <p className="text-gray-400">{data.content}</p>}
      </div>

      {/* Score */}
      {data.pillText && (
        <div className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end">
          <p className="px-3 py-1 text-sm font-bold transition-all ease-in-out rounded-lg text-sky-500 group-hover:shadow-sm group-hover:saturate-200 bg-sky-100 w-fit h-fit">
            {data.pillText}
          </p>
        </div>
      )}
    </div>
  </a>
)
