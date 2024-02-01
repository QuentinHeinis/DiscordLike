'use client'
import { FaceSmileIcon, GifIcon, PaperAirplaneIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
const MessageInput = ({channelName} : {channelName:string}) => {
  const inputPlaceholder = `Envoyer un message dans #${channelName}`


  const [input, setInput] = useState('')
  const handleChange = (e:any) => {
    setInput(e.target.value)
  }

  return (
    <form className="h-20 items-center bg-slate-800 flex w-full gap-3 px-6 left-0 absolute bottom-0">
      <button><PlusCircleIcon className="h-6 w-6"/></button>
      <textarea onChange={handleChange} name="MessageInput" className="w-full px-3 bg-transparent max-h-fit h-8 p-1 focus:outline-none resize-none" placeholder={inputPlaceholder}/>
      <button><GifIcon className="h-6 w-6"/></button>
      <button><FaceSmileIcon className="h-6 w-6"/></button>
     {
        input.length > 0 &&  <button><PaperAirplaneIcon className="h-8 w-8 rounded-full bg-blue-500 flex-none p-2"/></button>
     }
    </form>
  )
}

export default MessageInput