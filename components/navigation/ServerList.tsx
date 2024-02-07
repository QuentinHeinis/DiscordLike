'use client'
import { useState } from "react"
import { ReactSortable } from "react-sortablejs"
import ServerBubble from "../ui/ServerBubble"
import { GlobeEuropeAfricaIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useStore } from "@/store/zustand"
import { Server } from "@prisma/client"


const ServerList = ({servers} : {servers:Server[]}) => {  

  const [navList, setNavList] = useState(servers)

  const {setModalOpen} = useStore()
  return (
    <>
      <ReactSortable list={navList} setList={setNavList} fallbackTolerance={4} className='flex flex-col gap-3 pt-3 mt-3 border-t-2'>
          {navList.map((item:Server, index:number) => (
            <ServerBubble key={index} link={`/servers/${item.id}`} img={item.imageUrl} isHome={false} name={item.name}/>
          ))}
      </ReactSortable>
      
      <button onClick={()=>setModalOpen('addServer')} className='bg-slate-500 h-14 w-14 rounded-full grid place-content-center mt-3'><PlusIcon className='h-8 w-8'/></button>
    </>
  )
}

export default ServerList