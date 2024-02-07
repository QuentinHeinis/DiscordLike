'use client'
import { useStore } from "@/store/zustand"
import { Bars3Icon, ChatBubbleLeftRightIcon, SpeakerWaveIcon, VideoCameraIcon } from "@heroicons/react/24/solid"
import { ChannelType } from "@prisma/client"

type ChannelHeaderType = {
  title: string,
  type?: ChannelType,
  children?: React.ReactNode
}

const ChannelHeader = ({title, type, children}: ChannelHeaderType) => {
  const {menuOpen, setMenuOpen} = useStore()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)    
  }
  return (
    <div className="h-16 w-full bg-gray-800 z-10 absolute top-0 left-0 right-0 flex items-center justify-between px-3 border-b border-gray-200">
      <div className="flex gap-3 items-center">
        <button onClick={()=>toggleMenu()} className="md:hidden"><Bars3Icon className='h-6 w-6 text-white'/></button>
        {type === 'VIDEO' && <VideoCameraIcon className='h-6 w-6 text-white'/>}
        {type === 'AUDIO' && <SpeakerWaveIcon className='h-6 w-6 text-white'/>}
        {type === 'TEXT' && <ChatBubbleLeftRightIcon className='h-6 w-6 text-white'/>}
        {title}
      </div>
      {children && children}
    </div>
  )
}

export default ChannelHeader