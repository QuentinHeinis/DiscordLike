'use client'
import { Channel } from "@prisma/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ChannelSection = ({type} : {type:Channel['type']}) => {
  switch(type){
    case 'AUDIO':
      return <p className='text-slate-100 text-sm'>Voice Channels</p>
    case 'TEXT':
      return <p className='text-slate-100 text-sm'>Text Channels</p>
    case 'VIDEO':
      return <p className='text-slate-100 text-sm'>Video Channels</p>
  }
}

type ItemType = {
  id: string,
  name: string,
  serverId: string
}

const Item = ({id, name, serverId} : ItemType ) => {
  const pathname = usePathname()
  const link = `/servers/${serverId}/${id}`
  return (
    <Link href={link} className={`w-full h-12 flex items-center transition-colors cursor-pointer hover:bg-slate-600 px-4 gap-2 rounded-md ${pathname === link ? 'bg-slate-600' : ''}`}>
      <p>{name}</p>
    </Link>
  )
}

type ServerChannelType = {
  channels: Channel[],
  serverId: string
}
const ServerChannel = ({channels, serverId} : ServerChannelType) => {

const ChannelTypes  = new Set(channels.map((channel:Channel) => channel.type))

  return (
    <div>
      {
        Array.from(ChannelTypes).map((type:Channel['type']) => (
          <div key={type} className='p-2'>
            <ChannelSection type={type}/>
            {
              channels.map((channel:Channel) => (
                channel.type === type &&
                <Item key={channel.id} id={channel.id} name={channel.name} serverId={serverId} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ServerChannel