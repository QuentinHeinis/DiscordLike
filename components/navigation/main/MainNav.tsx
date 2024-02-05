
import ServerBubble from '../../ui/ServerBubble'
import ServerList from '../ServerList'



export default function MainNav() {

  return(
    <div className="bg-slate-700 p-3 w-20 max-h-dvh min-w-fit max-w-20">
      <ServerBubble name='Home' isHome={true} link='/friends'/>
      <ServerList/>
    </div>
  )
}