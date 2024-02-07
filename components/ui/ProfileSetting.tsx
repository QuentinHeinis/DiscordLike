'use client'
import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"
import { signOut } from "next-auth/react"
import { useStore } from "@/store/zustand"
import { User } from "@prisma/client"
const ProfileSetting = ({user} : {user:User}) => {
  const {setModalOpen} = useStore()
  return (
      <div className="flex gap-2">
        <button onClick={()=>setModalOpen('updateProfile', {user:user})}>
          <Cog6ToothIcon className="h-6 w-6"/>  
        </button>
        <button onClick={()=>signOut()}><ArrowLeftEndOnRectangleIcon className="h-6 text-red-600 w-6"/></button>
      </div>
  )
}

export default ProfileSetting