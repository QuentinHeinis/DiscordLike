'use client'
import ChannelHeader from "@/components/navigation/ChannelHeader"
import AddFriendForm from "@/components/form/modalForm/AddFriendForm"

const MessagesPage = () => {

  return (
    <main className="max-h-screen h-screen bg-slate-700 pt-20 w-full p-2 pb-0 relative">
      <ChannelHeader title='Ajouter des amis'/>
      <AddFriendForm/>
    </main>
  )
}

export default MessagesPage