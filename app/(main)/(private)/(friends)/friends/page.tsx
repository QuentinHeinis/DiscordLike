import ChannelHeader from "@/components/navigation/ChannelHeader"
import getCurrentUser from "@/lib/current-profil"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { redirect } from "next/navigation"
import db from '@/lib/prismadb'
import SearchFriend from "./components/SearchFriend"


const MessagesPage = async () => {

      const user = await getCurrentUser()
    if(!user){
      return redirect('/')
    }
    const usersWithConversation = await db.conversation.findMany({
      where: {
        OR: [
          {
            memberOneId: user.id
          },
          {
            memberTwoId: user.id
          }
        ],
      },
      include: {
        memberOne: true,
        memberTwo: true,
        directMessages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },

    });

    const friends = usersWithConversation.map((conv) => {
      return conv.memberOneId === user.id ? conv.memberTwoId : conv.memberOneId
    })

    const friendsProfiles = await db.user.findMany({
      where: {
        id: {
          in: friends
        }
      },
      orderBy:{
        name: 'asc'
      }
    })

  return (
    <main className="max-h-screen h-screen overflow-auto bg-neutral-700 pt-20 w-full p-2 pb-0 relative ">
      <ChannelHeader title='Amis'>
        <Link href='friends/add'><UserPlusIcon className="h-6 w-6"/></Link>
      </ChannelHeader>
      <div>
        <SearchFriend friends={friendsProfiles}/>
      </div>
    </main>
  )
}

export default MessagesPage