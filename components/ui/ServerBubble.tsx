import { BoltIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

type BubbleType = {
  isHome: boolean,
  name: string,
  img?: string,
  link: string
}
const ServerBubble = ({link, isHome, img, name}:BubbleType) => {
  return(
    <Link href={link}  className={`group relative bg-slate-500 flex h-14 w-14 ${isHome && 'p-2 rounded-lg justify-center items-center'} ${!isHome && 'rounded-full'}`}>
      {isHome ? <BoltIcon className="h-6 w-6 text-white"/>
      :
      img ?  
        <Image src={img} width={56} height={56} alt="" className='w-full h-full rounded-full object-cover'/>
        :
        <div className='w-full h-full flex items-center justify-center text-2xl font-semibold'>
          {name.slice(0,1).toUpperCase()}
        </div>
      }
      <span className='md:group-hover:flex group-hover:visible hidden invisible rounded-md absolute top-[16.666%] h-2/3 items-center px-4 ml-4 left-full min-w-max bg-slate-800 after:h-3 after:w-3 after:bg-slate-800 after:absolute after:left-0 after:-translate-x-1/2 after:rotate-45 after:rounded-sm'>{name}</span>
    </Link>
  )
}

export default ServerBubble