import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'

type pageType = {
  params: {
    serverId: string
  }
}

const page = async ({params}:pageType) => {
//get the channel who's name is general
const generalChannel = await db.channel.findFirst({
  where:{
    serverId: params.serverId,
    name: "general"
  }
})


redirect(`/servers/${params.serverId}/${generalChannel?.id}`)

}

export default page