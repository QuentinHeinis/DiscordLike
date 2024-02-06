'use client'
import ChannelHeader from "@/components/navigation/ChannelHeader"
import MessageInput from "@/components/ui/MessageInput"
import MessageZone from "@/components/ui/MessageZone"

import { messages } from '@/public/data'

interface UserIdPageProps {
  params:{
    userId: string
  }
}
const MessagesPage = ({params}:UserIdPageProps) => {
  

  type MessagesTypes ={
    message: string,
    sender: {
      name: string,
      img: string
    },
    date: string,
  }




  return (
    <main className="max-h-screen h-screen bg-slate-700 w-full p-2 pb-0 relative">
      <ChannelHeader type="TEXT" title='salut'/>
      <MessageZone messages={messages}/>
      <MessageInput channelName="test"/> 
    </main>
  )
}

export default MessagesPage