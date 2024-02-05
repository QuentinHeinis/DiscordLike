import { ChevronDownIcon, UserPlusIcon } from "@heroicons/react/24/solid"


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
  serverName: string
}

const ServerHeader = ({serverName}:ServerHeaderType) => {
  return (
      <div className='group relative w-full bg-slate-500 flex justify-around items-center h-16 border-b border-slate-200'>
        <p className='text-xl font-bold text-slate-100'>{serverName}</p>
        <div>
          <ChevronDownIcon className='group-hover:rotate-180 transition-all h-6 w-6'/>
        </div>
        <div className='h-0 group-hover:h-fit transition-all scale-50 group-hover:scale-100 overflow-hidden absolute w-[90%] bg-slate-500 top-full'>
          <ServerUtils text='Inviter des gens' icon={<UserPlusIcon className='h-6'/>}/>
          <ServerUtils text='Paramètres du serveur' icon={<UserPlusIcon className='h-6'/>}/>
          <ServerUtils text='Créer un salon' icon={<UserPlusIcon className='h-6'/>}/>
        </div>
      </div>
  )
}

export default ServerHeader