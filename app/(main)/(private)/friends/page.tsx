'use client'
import ChannelHeader from "@/components/navigation/ChannelHeader"
import MessageInput from "@/components/ui/MessageInput"
import MessageZone from "@/components/ui/MessageZone"
import { signOut } from "next-auth/react"


const MessagesPage = () => {
  
  return (
    <main className="max-h-screen h-screen bg-slate-700 pt-20 w-full p-2 pb-0 relative">
      <ChannelHeader isMsg={false} title='Amis'/>
      <div onClick={()=>signOut()}>logout</div>
    </main>
  )
}

export default MessagesPage