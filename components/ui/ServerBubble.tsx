'use client'
import { BoltIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type BubbleType = {
  isHome: boolean,
  name: string,
  img?: string,
  link: string
}
const ServerBubble = ({link, isHome, img, name}:BubbleType) => {
  const pathname = usePathname()
  const getId = pathname?.split('/')[2]
  const linkId = link.split('/')[2]
  return(
    <div className={`after:h-14 after:bg-white after:rounded-tr-xl after:rounded-br-xl after:w-1 after:-translate-y-full after:relative after:-left-3  ${getId === linkId ? 'after:flex -mb-14' : 'after:hidden'}`}>
      <Link href={link}  className={`group relative bg-neutral-500 flex h-14 w-14  ${isHome && 'p-2 rounded-lg justify-center items-center'} ${!isHome && 'rounded-full'}`}>
        {isHome ? <BoltIcon className="h-6 w-6 text-white"/>
        :
        img ?
          <Image src={img} width={56} height={56} alt="" className='w-full h-full rounded-full object-cover'/>
          :
          <div className='w-full h-full flex items-center justify-center text-2xl font-semibold'>
            {name.slice(0,1).toUpperCase()}
          </div>
        }
        <span className='md:group-hover:flex z-40 group-hover:visible hidden invisible rounded-md absolute top-[16.666%] h-2/3 items-center px-4 ml-4 left-full min-w-max bg-neutral-600 border border-neutral-700 after:h-3 after:w-3 after:bg-neutral-600 after:border-l after:border-b after:border-neutral-700 after:absolute after:left-0 after:-translate-x-1/2 after:rotate-45 after:rounded-sm'>{name}</span>
      </Link>
    </div>
  )
}

export default ServerBubble