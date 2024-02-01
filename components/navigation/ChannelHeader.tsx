import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

const ChannelHeader = ({title, isMsg}: {title:string, isMsg:boolean}) => {
  return (
    <div className="h-16 w-full bg-slate-800 absolute top-0 left-0 right-0 flex items-center gap-3 px-3 border-b border-slate-200">
      {isMsg ? <ChatBubbleLeftRightIcon className='h-6 w-6 text-white'/> : ''}
      {title}
    </div>
  )
}

export default ChannelHeader