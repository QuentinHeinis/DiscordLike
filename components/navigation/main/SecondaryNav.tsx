'use client'

import { usePathname } from "next/navigation"
import FriendsNav from "../FriendsNav"
import ServersNav from "../ServersNav"

const SecondaryNav = () => {


  const pathName = usePathname()
  const isServer = pathName.includes("servers")
  const serverId = pathName.split("/")[2]

  return (
    <>
      {
        isServer ? <ServersNav serverId={serverId}/> : <FriendsNav/>
      }
    </>
  )
}

export default SecondaryNav