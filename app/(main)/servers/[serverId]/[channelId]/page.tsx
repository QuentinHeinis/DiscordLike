import ChannelHeader from "@/components/navigation/ChannelHeader"
import MessageInput from "@/components/ui/MessageInput"
import {ChatMessages} from "@/components/ui/MessageZone"
import getCurrentUser from "@/lib/current-profil"
import db from '@/lib/prismadb'
import { redirect } from "next/navigation"
import {MediaRoom} from "@/components/chat/mediaRoom"

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
    <main className="max-h-screen h-screen bg-neutral-700 w-full pb-0 relative overflow-hidden">
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
          <MessageInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            userId={user.id}
          /> 
        </>
      }
      {
        channel.type === "AUDIO" &&         
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
          user={user}
        />
      }
      {
        channel.type === "VIDEO" && 
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={true}
          user={user}
        />
      }
      
    </main>
  )
}

export default ChannelIdPage