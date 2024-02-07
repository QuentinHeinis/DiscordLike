'use client'
import { useStore } from "@/store/zustand"
import { ChevronDownIcon, ClipboardIcon, Cog6ToothIcon, PlusCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import { LeaveIcon } from "@livekit/components-react"
import { Server } from "@prisma/client"
import Link from "next/link"
import toast from "react-hot-toast"


type ServerUtilsType = {
  text: string,
  icon: JSX.Element
}
const ServerUtils = ({text, icon} : ServerUtilsType) => {
    return(
      <p className='flex items-center gap-2'>{icon} {text}</p>
    )
  }


type ServerHeaderType = {
  serverName: string,
  inviteCode:string,
  server : Server,
  isModo: boolean,
  isOwner: boolean
}

const handleCopy = (code:string) => {
  console.log('copied')
  // copy on clipboard
  const inviteLink = 'https://suihira.heinis.dev/invite/' + code
  navigator.clipboard.writeText(inviteLink)
  toast.success('Lien copié dans le presse-papier')
}

const ServerHeader = ({serverName, inviteCode, server, isModo, isOwner}:ServerHeaderType) => {
  const {setModalOpen} = useStore()
  return (
      <div className='group flex-none relative w-full bg-slate-500 flex justify-around items-center h-16 border-b border-slate-200'>
        <p className='text-xl font-bold text-slate-100'>{serverName}</p>
        <div>
          <ChevronDownIcon className='group-hover:rotate-180 transition-all h-6 w-6'/>
        </div>
        <div className='h-0 group-hover:h-fit group-hover:visible pt-2 pb-2 transition-all scale-50 invisible flex gap-1 flex-col items-center group-hover:scale-100 overflow-hidden absolute w-[95%] bg-slate-500 top-full border-t'>
          <button className="w-5/6" onClick={()=>handleCopy(inviteCode)}><ServerUtils text='Inviter des gens' icon={<ClipboardIcon className='h-4'/>}/></button>
          {
            isModo && 
            <>
              <button className="w-5/6" onClick={()=>setModalOpen("updateServer", {server:server})}><ServerUtils text='Paramètres du serveur' icon={<Cog6ToothIcon className='h-4'/>}/></button>
              <button className="w-5/6" onClick={()=>setModalOpen("addChannel")}><ServerUtils text='Créer un salon' icon={<PlusCircleIcon className='h-4'/>}/></button>
            </>
          }
          {
            isOwner || <button className="w-5/6 text-red-500" onClick={()=>setModalOpen("leaveServer", {server:server})}><ServerUtils text='Quitter le server' icon={<LeaveIcon className='h-4'/>}/></button>
          }
        </div>
      </div>
  )
}

export default ServerHeader