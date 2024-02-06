import ChannelHeader from "@/components/navigation/ChannelHeader"
import ServersNav from "@/components/navigation/ServersNav"
import MessageInput from "@/components/ui/MessageInput"
import MessageZone from "@/components/ui/MessageZone"

// import { messages } from '@/public/data'

interface ChannelIdPageProps {
  params:{
    serverId: string,
    channelId: string
  }
}

const ChannelIdPage = ({params}: ChannelIdPageProps) => {

  return (
    <main className="max-h-screen h-screen bg-slate-700 w-full p-2 pb-0 relative">
      <ChannelHeader isMsg={true} title='salut'/>
      {/* <MessageZone messages={messages}/> */}
      <MessageInput channelName="test"/> 
    </main>
  )
}

export default ChannelIdPage