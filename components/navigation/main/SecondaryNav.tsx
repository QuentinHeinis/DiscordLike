

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
      }
    })
    console.log(friendsProfiles);
    
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