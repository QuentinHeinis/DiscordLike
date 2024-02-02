'use client'
import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

function Profile() {
  const session = useSession()
  const name = session.data?.user?.name ? session.data?.user?.name : 'User'
  const image = session.data?.user?.image

  return (
    <div className="w-full bg-red-950 h-16 flex items-center justify-around">
      <div className="flex gap-2">
        {
          image 
          ? 
          <Image src={image} alt="" width={56} height={56} className='h-6 w-6 rounded-full'/> 
          :
          <div className="h-6 w-6 grid place-content-center rounded-full bg-blue-600" >{name.slice(0,1).toUpperCase()}</div>
        }
        <span>{name}</span>
      </div>
      <div className="flex gap-2">
        <Link href="/settings">
          <Cog6ToothIcon className="h-6 w-6"/>  
        </Link>
        <button onClick={()=>signOut()}><ArrowLeftEndOnRectangleIcon className="h-6 text-red-600 w-6"/></button>
      </div>
    </div>
  )
}

export default Profile