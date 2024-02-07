'use client'
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/solid"
import { Channel } from "@prisma/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useStore } from "@/store/zustand"


const ChannelSection = ({type, isModo} : {type:Channel['type'], isModo:boolean}) => {
  const {setModalOpen} = useStore()
  return (
    <p className='text-slate-100 text-sm flex justify-between'>
      {
        type === 'TEXT' && 'Text Channels' || type === 'AUDIO' && 'Voice Channels' || type === 'VIDEO' && 'Video Channels'
      }
      {
        isModo && <button onClick={()=>setModalOpen('addChannel')}><PlusIcon className="h-5 w-5"/></button>
      }
    </p>
  )
}

type ItemType = {
  id: string,
  name: string,
  serverId: string,
  isModo: boolean
}

const Item = ({id, name, serverId, isModo} : ItemType ) => {
  const pathname = usePathname()
  const {setModalOpen, setCurrentUpdateId} = useStore()
  const link = `/servers/${serverId}/${id}`
  return (
<div className={`group  w-full h-12 flex items-center justify-between transition-colors cursor-pointer hover:bg-slate-600 px-4 gap-2 rounded-md ${pathname === link ? 'bg-slate-600' : ''}`}>
    <Link href={link} className="w-full" >
      <p>{name}</p>
    </Link>
    {
      isModo && 
    <div>
      <button onClick={()=>{setModalOpen('updateChannel'); setCurrentUpdateId(id)}} className={`hidden group-hover:block`}>
        <Cog6ToothIcon className="h-5 w-5"/>
      </button>
    </div>
    }
</div>
  )
}

type ServerChannelType = {
  channels: Channel[],
  serverId: string, 
  isModo: boolean
}
const ServerChannel = ({channels, serverId, isModo} : ServerChannelType) => {

const ChannelTypes  = new Set(channels.map((channel:Channel) => channel.type))

  return (
    <div>
      {
        Array.from(ChannelTypes).map((type:Channel['type']) => (
          <div key={type} className='p-2'>
            <ChannelSection type={type} isModo={isModo}/>
            {
              channels.map((channel:Channel) => (
                channel.type === type &&
                <Item key={channel.id} id={channel.id} name={channel.name} serverId={serverId} isModo={isModo}/>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ServerChannel