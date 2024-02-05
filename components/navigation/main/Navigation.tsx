import MainNav from "./MainNav"
import Profile from "@/components/ui/Profile"
import getCurrentUser from "@/lib/current-profil"
import SecondaryNav from "./SecondaryNav"
import CloseNavigation from "../CloseNavigation"
import NavLayout from "./NavLayout"

type NavigationType ={
  type: 'servers' | 'friends',
  id?: string
}

const Navigation = async ({type, id} : NavigationType) => {

  const user = await getCurrentUser()

  return (
    <NavLayout>
      <MainNav/>
      <div className="w-64 bg-slate-900 flex-none flex flex-col justify-between max-h-dvh">
        <SecondaryNav type={type} id={id}/>
        <Profile user={user!}/>
      </div>
      <CloseNavigation/>
    </NavLayout>
  )
}

export default Navigation