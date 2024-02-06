import Image from "next/image"
import { Message } from "@prisma/client"

  type MessageTypes ={
    message: string,
    sender: {
      name: string,
      img: string
    },
    date: string,
  }

const Messages = ({msg} : {msg:MessageTypes}) => {
  const {message, sender, date} = msg
  
  return (
    <div className="flex gap-2">
      <Image src={sender.img} height={56} width={56} alt={`photo de profil de ${sender.name}`} className="rounded-full"/>
      <div>
        <div className="flex gap-2 items-baseline">
          <p>{sender.name}</p>
          <span className="text-xs">{date}</span>
        </div>
        {message}
      </div>
    </div>
  )
}

export default Messages