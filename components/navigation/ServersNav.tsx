import ServerHeader from '../server/ServerHeader';
import { Channel, Member, Server } from '@prisma/client';
import ServerChannel from '../server/ServerChannel';
import ServerMember from '../server/ServerMember';

type ServersNavType = {
  server: Server & { channels: Channel[], members: Member[]} & { user: { username: string } }[] 
}

const ServersNav =  ({server} : {server:any}) => {
// console.log(server);

  return (
    <div>
      <ServerHeader serverName={server.name}/>
      <ServerChannel channels={server.channels} serverId={server.id}/>
      <ServerMember members={server.members}/>
    </div>
    


    // </div>
  )
}

export default ServersNav