

import getCurrentUser from "@/lib/current-profil"
import FriendsNav from "../FriendsNav"
import ServersNav from "../ServersNav"
import db from '@/lib/prismadb'
import { redirect } from "next/navigation"
type NavigationType ={
  type: 'servers' | 'friends'
  id?: string
}



const SecondaryNav = async({type, id} : NavigationType) => {

  
  if(type==="friends") {
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

    const orderByLastMessage = usersWithConversation.sort((a, b) => {
      //check if usersWithConversation is not empty
      if(a.directMessages.length === 0) return 1
      if(b.directMessages.length === 0) return -1
      return a.directMessages[0].createdAt < b.directMessages[0].createdAt ? 1 : -1
    })

    const friends = usersWithConversation.map((conv) => {
      return conv.memberOneId === user.id ? conv.memberTwoId : conv.memberOneId
    })

    const friendsProfiles = await db.user.findMany({
      where: {
        id: {
          in: friends
        }
      }
    })

    friendsProfiles.sort((a, b) => {
      return orderByLastMessage.findIndex((conv) => {
        return conv.memberOneId === a.id || conv.memberTwoId === a.id
      }) < orderByLastMessage.findIndex((conv) => {
        return conv.memberOneId === b.id || conv.memberTwoId === b.id
      }) ? -1 : 1
    })

    
    
    return(
      <FriendsNav conversation={friendsProfiles}/>
    )
  }
  if(type==="servers") {
    const server = await db.server.findUnique({
      where: {
        id: id
      },
      include: {
        channels:{
          orderBy:{
            createdAt: 'asc'
          }
        },
        members:{
          include:{
            user:true
          },
          orderBy:{
            role: 'asc'
          }
        }
      }
    })
    return <ServersNav server={server!}/>
  }
}

export default SecondaryNav