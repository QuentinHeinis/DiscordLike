'use client'
import { usePathname } from "next/navigation"
import FriendsNav from "./FriendsNav"
import MainNav from "./MainNav"
import ServersNav from "./ServersNav"
import { useStore } from "@/store/zustand"


const Navigation = () => {
  
  const pathName = usePathname()
  const isServer = pathName.includes("servers")
  const serverId = pathName.split("/")[2]
  const {menuOpen, setMenuOpen} = useStore()

  const toggleMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className={`flex w-full h-full absolute z-10 max-h-dvh ${menuOpen ? '-translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-fit md:h-auto`}>
      <MainNav/>
      {isServer ? <ServersNav serverId={serverId}/> : <FriendsNav/>}
      <div className="w-full h-full bg-gray-900 bg-opacity-30 cursor-pointer md:hidden" onClick={()=>toggleMenu()}></div>
    </nav>
  )
}

export default Navigation