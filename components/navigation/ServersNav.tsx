import ServerHeader from '../server/ServerHeader';
import { Channel, Member, Server } from '@prisma/client';
import ServerChannel from '../server/ServerChannel';
import ServerMember from '../server/ServerMember';
import getCurrentUser from '@/lib/current-profil';
type ServersNavType = {
  server: Server & { channels: Channel[], members: Member[]} & { user: { username: string } }[] 
}

const ServersNav =  async ({server} : {server:any}) => {

const user = await getCurrentUser()

const checkModo = server.members.find((member:Member) => member.userId === user?.id && (member.role === "ADMIN" || member.role === "MODERATOR"))

const isModo = checkModo ? true : false



  return (
    <div>
      <ServerHeader serverName={server.name} inviteCode={server.inviteCode} server={server}/>
      <ServerChannel channels={server.channels} serverId={server.id} isModo={isModo}/>
      <ServerMember members={server.members}/>
    </div>
    


    // </div>
  )
}

export default ServersNav