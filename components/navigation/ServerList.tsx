'use client'

import { Servers } from "@/public/data"
import { useState } from "react"
import { ReactSortable } from "react-sortablejs"
import ServerBubble from "../ui/ServerBubble"
import { GlobeEuropeAfricaIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useStore } from "@/store/zustand"

const ServerList = () => {

  type ServersType = {
    name: string;
    link: string;
    id: number;
    img?: string;
  };

  const [navList, setNavList] = useState(Servers)

  const {setModalOpen} = useStore()
  return (
    <>
      <ReactSortable list={navList} setList={setNavList} fallbackTolerance={4} className='flex flex-col gap-3 pt-3 mt-3 border-t-2'>
          {navList.map((item:ServersType, index:number) => (
            <ServerBubble key={index} link={item.link} img={item.img} isHome={false} name={item.name}/>
          ))}
      </ReactSortable>
      
      <button onClick={()=>setModalOpen('addServer')} className='bg-slate-500 h-14 w-14 rounded-full grid place-content-center mt-3'><PlusIcon className='h-8 w-8'/></button>
      <button onClick={()=>setModalOpen('searchServer')} className='bg-slate-500 h-14 w-14 rounded-full grid place-content-center mt-3'><GlobeEuropeAfricaIcon className='h-8 w-8'/></button>
    </>
  )
}

export default ServerList