import { Channel } from "@prisma/client"

type ServerSectionType = {
  type: string
  channels: Channel[]
}

const ServerSection = ({type, channels}:ServerSectionType) => {
  return (
    <div>ServerSection</div>
  )
}

export default ServerSection