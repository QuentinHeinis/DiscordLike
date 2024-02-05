import db from '@/lib/prismadb'
import { redirect } from 'next/navigation'

type pageType = {
  params: {
    serverId: string
  }
}

const page = async ({params}:pageType) => {
const firstChannel = await db.channel.findFirst({
  where:{
    serverId: params.serverId
  },
  orderBy:{
    createdAt: 'asc'
  }
})

redirect(`/servers/${params.serverId}/${firstChannel?.id}`)

}

export default page