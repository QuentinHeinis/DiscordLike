import ChannelHeader from "@/components/navigation/ChannelHeader"
import MessageInput from "@/components/ui/MessageInput"
import {ChatMessages} from "@/components/ui/MessageZone"
import getCurrentUser from "@/lib/current-profil"
import db from '@/lib/prismadb'
import { redirect } from "next/navigation"
import MediaRoom from "@/components/chat/mediaRoom"

import { messages } from '@/public/data'
interface ChannelIdPageProps {
  params:{
    serverId: string,
    channelId: string
  }
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {

  const user = await getCurrentUser()

  if(!user){
    return redirect('/')
  }

  const channel = await db.channel.findUnique({
    where:{
      id: params.channelId
    }
  })

  if(!channel){
    return redirect('/servers/' + params.serverId)
  }

  const member = await db.member.findFirst({
    where:{
      serverId: params.serverId,
      userId: user.id
    }
  })

  if(!member){
    return redirect('/')
  }



  return (
    <main className="max-h-screen h-screen bg-slate-700 w-full p-2 pb-0 relative">
      <ChannelHeader type={channel.type} title={channel.name}/>
      {
        channel.type === "TEXT" && 
        <>
          <ChatMessages 
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <MessageInput channelName="test"/> 
        </>
      }
      {
        channel.type === "AUDIO" && <MediaRoom/>
      }
      {
        channel.type === "VIDEO" && <MediaRoom/>
      }
      
    </main>
  )
}

export default ChannelIdPage