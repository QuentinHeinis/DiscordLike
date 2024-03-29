'use client'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/zustand';
import { User } from '@prisma/client';

type ItemType = {
  label: string,
  icon:string | null,
  link: string
}
const Item = ({label, icon, link} : ItemType) =>{
  const pathname = usePathname()
  const {setMenuOpen} = useStore()
  return(
    <Link onClick={()=>setMenuOpen(false)} href={link}  className={`w-full h-12 flex items-center transition-colors cursor-pointer hover:bg-neutral-600 px-4 gap-2 rounded-md ${pathname === link ? 'bg-neutral-600' : ''}`}>
      {
        icon === 'friend' ?
        <UserCircleIcon className='h-6 w-6 text-neutral-500'/>
        : (
          icon ? <Image src={icon} alt="" width={32} height={32} className='h-6 w-6 rounded-full'/> : <div className='h-6 w-6 grid place-content-center rounded-full bg-indigo-700'>{label.charAt(0)}</div>
        )
      }
      {label}
    </Link>
  )
}

const FriendsNav = ({conversation} : {conversation:User[]}) => {

  return (
    <div className='w-64 bg-neutral-800 flex-none flex flex-col justify-between  max-h-dvh'>
      <div className='p-2'>
        <Item link='/friends' label="Amis" icon={'friend'}/>
        <p className='text-xs py-2 flex items-center gap-2 after:bg-neutral-400  after:h-[2px] after:w-full'>Messages&nbsp;privés</p>
      </div>
      <div className="p-2 absolute top-20 bottom-20 right-0 left-0 overflow-auto">
        {
          conversation.map((user:User) => (
            <Item link={`/messages/${user.id}`} key={user.id} label={user.name} icon={user.imageUrl}/>
          ))
        }
      </div>
    </div>
  )
}

export default FriendsNav