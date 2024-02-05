

import FriendsNav from "../FriendsNav"
import ServersNav from "../ServersNav"
import db from '@/lib/prismadb'
type NavigationType ={
  type: 'servers' | 'friends'
  id?: string
}



const SecondaryNav = async({type, id} : NavigationType) => {

  
  if(type==="friends") return <FriendsNav/>
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