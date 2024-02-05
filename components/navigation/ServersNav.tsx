import { ChevronDownIcon, HashtagIcon, SpeakerWaveIcon, UserCircleIcon, UserPlusIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

import {Channels, Servers} from '@/public/data'
import Profile from '../ui/Profile';
import { useStore } from '@/store/zustand';

type ItemType = {
  serverId: string | number,
  channelId: string | number,
  channelType: string,
  channelName: string
}

const ChannelIcon = ({type}:{type:string}) => {
  if(type === 'text'){
    return <HashtagIcon className='h-6'/>
  }
  if(type === 'voice'){
    return <SpeakerWaveIcon className='h-6'/>
  }
  if(type === 'cam'){
    return <VideoCameraIcon className='h-6'/>
  }
  return null
}

const Item = ({serverId, channelId, channelType, channelName} : ItemType) =>{
  // const {setMenuOpen} = useStore()
  return(
    <Link
      href={`/servers/${serverId}/${channelId}`}
      className={`w-full h-12 flex items-center transition-colors cursor-pointer hover:bg-slate-600 px-4 gap-2 rounded-md`}
    >
      <ChannelIcon type={channelType}/>
      {channelName}
    </Link>
  )
}

type ServersNavType = {
  serverId: string
}

const ServersNav = ({serverId} : ServersNavType) => {

  type ChannelType = {
    name: string,
    id: number,
    type: 'text' | 'voice' | 'cam'
    serverId: number | string
  }


const serverName = Servers.find((server) => server.id === +serverId)?.name
  
const ServerChannel = Channels.filter((channel:ChannelType) => channel.serverId === +serverId)

 const ChannelTypes  = new Set(ServerChannel.map((channel:ChannelType) => channel.type))
  
 const ChannelSection = ({type}:{type:string}) => {
  const text = type === 'text' ? 'Text Channels' : type === 'voice' ? 'Voice Channels' : 'Cam Channels'
    return(
      <p className='text-xs py-2 flex items-center gap-2 after:bg-slate-400  after:h-[2px] after:w-full'>{text.replace(' ', '\xa0')}</p> // \xa0 is a non-breaking space
    )
  }

  type ServerUtilsType = {
    text: string,
    icon: JSX.Element
  }

  const ServerUtils = ({text, icon} : ServerUtilsType) => {
    return(
      <p className='flex'>{text} {icon}</p>
    )
  }

  return (
    <div>
      <div className='group relative w-full bg-slate-500 flex justify-around items-center h-16 border-b border-slate-200'>
        <p className='text-xl font-bold text-slate-100'>{serverName}</p>
        <div>
          <ChevronDownIcon className='group-hover:rotate-180 transition-all h-6 w-6'/>
        </div>
        <div className='h-0 group-hover:h-fit transition-all scale-50 group-hover:scale-100 overflow-hidden absolute w-[90%] bg-slate-500 top-full'>
          <ServerUtils text='Inviter des gens' icon={<UserPlusIcon className='h-6'/>}/>
          <ServerUtils text='Paramètres du serveur' icon={<UserPlusIcon className='h-6'/>}/>
          <ServerUtils text='Créer un salon' icon={<UserPlusIcon className='h-6'/>}/>
        </div>
      </div>
      {
        Array.from(ChannelTypes).map((type:ChannelType['type']) => (
          <div key={type} className='p-2'>
            <ChannelSection type={type}/>
            {
              ServerChannel.map((channel:ChannelType) => (
                channel.type === type &&
                <Item key={channel.id} channelId={channel.id} channelName={channel.name} channelType={channel.type} serverId={serverId} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ServersNav