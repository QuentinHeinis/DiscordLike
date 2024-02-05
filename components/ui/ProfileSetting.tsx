'use client'
import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"
import { signOut } from "next-auth/react"
import Link from "next/link"

const ProfileSetting = () => {
  return (
      <div className="flex gap-2">
        <Link href="/settings">
          <Cog6ToothIcon className="h-6 w-6"/>  
        </Link>
        <button onClick={()=>signOut()}><ArrowLeftEndOnRectangleIcon className="h-6 text-red-600 w-6"/></button>
      </div>
  )
}

export default ProfileSetting