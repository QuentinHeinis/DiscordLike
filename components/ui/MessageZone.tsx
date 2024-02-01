import Messages from "./Messages"
import { useRef, useEffect, use } from "react"

type MessageTypes ={
    message: string,
    sender: {
      name: string,
      img: string
    },
    date: string,
  }

type MessagesTypes = MessageTypes[]


const MessageZone = ({messages} : {messages: MessagesTypes}) => {
  const msgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    msgRef.current?.scrollTo(0, msgRef.current.scrollHeight)
  }, [messages])
  return (
    <div ref={msgRef} className="flex gap-4 flex-col max-h-[calc(100%-5rem)] pt-20 pb-4 overflow-y-scroll overflow-anchor-none">
        {
          messages.map((message: MessageTypes, index:number) => (
            <Messages key={index} msg={message}/>
          ))
        }
    </div> 
  )
}

export default MessageZone