'use client'
import { ChevronDownIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import toast from "react-hot-toast"


type ServerUtilsType = {
  text: string,
  icon: JSX.Element
}
const ServerUtils = ({text, icon} : ServerUtilsType) => {
    return(
      <p className='flex'>{text} {icon}</p>
    )
  }


type ServerHeaderType = {
  serverName: string,
  inviteCode:string
}

const handleCopy = (code:string) => {
  console.log('copied')
  // copy on clipboard
  const inviteLink = 'https://suihira.heinis.dev/invite/' + code
  navigator.clipboard.writeText(inviteLink)
  toast.success('Lien copié dans le presse-papier')
}

const ServerHeader = ({serverName, inviteCode}:ServerHeaderType) => {
  return (
      <div className='group relative w-full bg-slate-500 flex justify-around items-center h-16 border-b border-slate-200'>
        <p className='text-xl font-bold text-slate-100'>{serverName}</p>
        <div>
          <ChevronDownIcon className='group-hover:rotate-180 transition-all h-6 w-6'/>
        </div>
        <div className='h-0 group-hover:h-fit transition-all scale-50 group-hover:scale-100 overflow-hidden absolute w-[90%] bg-slate-500 top-full'>
          <button onClick={()=>handleCopy(inviteCode)}><ServerUtils text='Inviter des gens' icon={<UserPlusIcon className='h-6'/>}/></button>
          <ServerUtils text='Paramètres du serveur' icon={<UserPlusIcon className='h-6'/>}/>
          <ServerUtils text='Créer un salon' icon={<UserPlusIcon className='h-6'/>}/>
        </div>
      </div>
  )
}

export default ServerHeader