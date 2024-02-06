'use client'
import ChannelHeader from "@/components/navigation/ChannelHeader"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"



const MessagesPage = () => {

const addFriend = () =>{
  console.log('add friend');
}

  return (
    <main className="max-h-screen h-screen bg-slate-700 pt-20 w-full p-2 pb-0 relative">
      <ChannelHeader title='Amis'>
        <Link href='friends/add'><UserPlusIcon className="h-6 w-6"/></Link>
      </ChannelHeader>
      
    </main>
  )
}

export default MessagesPage