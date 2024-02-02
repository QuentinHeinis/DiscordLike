'use client'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {ReactElement} from 'react';

import {Friends} from '@/public/data'
import Profile from '../ui/Profile';
import { useStore } from '@/store/zustand';

type ItemType = {
  label: string,
  icon:ReactElement,
  link: string
}
const Item = ({label, icon, link} : ItemType) =>{
  const pathname = usePathname()
  const {setMenuOpen} = useStore()
  return(
    <Link onClick={()=>setMenuOpen(false)} href={link}  className={`w-full h-12 flex items-center transition-colors cursor-pointer hover:bg-slate-600 px-4 gap-2 rounded-md ${pathname === link ? 'bg-slate-600' : ''}`}>
      {icon}
      {label}
    </Link>
  )
}

const FriendsNav = () => {
  type FriendType = {
    name: string,
    img: string
    id: number,
    link: string
  }

  return (
    <div className='w-64 bg-slate-900 flex-none flex flex-col justify-between max-h-dvh'>
      <div className="p-2">
        <Item link='/friends' label="Amis" icon={<UserCircleIcon className='h-6'/>}/>
        <p className='text-xs py-2 flex items-center gap-2 after:bg-slate-400  after:h-[2px] after:w-full'>Messages&nbsp;privés</p>
        {
          Friends.map((friend:FriendType) => (
            <Item link={friend.link} key={friend.id} label={friend.name} icon={<Image src={friend.img} alt="" width={56} height={56} className='h-6 w-6 rounded-full'/>}/>
          ))
        }
      </div>
      <Profile/>
    </div>
  )
}

export default FriendsNav