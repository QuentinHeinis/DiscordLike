import { useStore } from "@/store/zustand"
import { Bars3Icon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

const ChannelHeader = ({title, isMsg, children}: {title:string, isMsg:boolean, children?:React.ReactNode}) => {
  const {menuOpen, setMenuOpen} = useStore()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)    
  }
  return (
    <div className="h-16 w-full bg-slate-800 absolute top-0 left-0 right-0 flex items-center justify-between px-3 border-b border-slate-200">
      <div className="flex gap-3 items-center">
        <button onClick={()=>toggleMenu()} className="md:hidden"><Bars3Icon className='h-6 w-6 text-white'/></button>
        {isMsg ? <ChatBubbleLeftRightIcon className='h-6 w-6 text-white'/> : ''}
        {title}
      </div>
      {children && children}
    </div>
  )
}

export default ChannelHeader