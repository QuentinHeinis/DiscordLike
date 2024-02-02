'use client'
import ChannelHeader from "@/components/navigation/ChannelHeader"

const MessagesPage = () => {

  return (
    <main className="max-h-screen h-screen bg-slate-700 pt-20 w-full p-2 pb-0 relative">
      <ChannelHeader isMsg={false} title='Amis'/>
    </main>
  )
}

export default MessagesPage