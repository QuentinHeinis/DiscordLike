import getCurrentUser from '@/lib/current-profil'
import ServerBubble from '../../ui/ServerBubble'
import ServerList from '../ServerList'

import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'

export default async function MainNav() {
  const profile = await getCurrentUser()
  if(!profile){
    return redirect('/')
  }
 const servers = await db.server.findMany({
  where:{
    members:{
      some:{
        userId: profile.id
      }
    }
  }
 })
 
  return(
    <div className="bg-gray-700 p-3 w-20 max-h-svh min-w-fit max-w-20">
      <ServerBubble name='Home' isHome={true} link='/friends'/>
      <ServerList servers={servers} />
    </div>
  )
}