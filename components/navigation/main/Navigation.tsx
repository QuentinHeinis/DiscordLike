import MainNav from "./MainNav"
import Profile from "@/components/ui/Profile"
import getCurrentUser from "@/lib/current-profil"
import SecondaryNav from "./SecondaryNav"
import CloseNavigation from "../CloseNavigation"
import NavLayout from "./NavLayout"


const Navigation = async () => {

  const user = await getCurrentUser()

  return (
    <NavLayout>
      <MainNav/>
      <div className="w-64 bg-slate-900 flex-none flex flex-col justify-between max-h-dvh">
        <SecondaryNav/>
        <Profile user={user!}/>
      </div>
      <CloseNavigation/>
    </NavLayout>
  )
}

export default Navigation