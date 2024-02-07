'use client'
import { VideoCameraIcon, PhoneIcon } from "@heroicons/react/24/solid"
import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const SearchFriend = ({friends} : {friends:User[]}) => {
  const [filteredFriends, setFilteredFriends] = useState<User[]>(friends)

  const handleChange = (e:any) => {
    setFilteredFriends(friends.filter(friend => friend.name.includes(e.target.value)))
  }
  return (
    <>
      <div className="flex flex-col w-full items-center">
      <input type="text" onChange={(e)=>handleChange(e)} placeholder="Rechercher" className="w-3/4 mb-6 rounded-md bg-gray-600 h-10 px-2"/>
        {
          filteredFriends.map(friend => (
            <div key={friend.id} className="flex w-3/4 justify-between text-xl border-b px-3 hover:bg-gray-600 transition-all">
              <Link href={`/messages/${friend.id}`} className="flex gap-4 w-full py-6">
                {friend.imageUrl ? <Image src={friend.imageUrl} alt="" width={32} height={32} className='h-8 w-8 rounded-full'/> : <div className='h-8 w-8 grid place-content-center rounded-full bg-blue-600'>{friend.name.charAt(0)}</div> }
                {friend.name}
              </Link>
              <div className="flex gap-2 py-6">
                <Link href={`/messages/${friend.id}?call=true`}>
                  <PhoneIcon className="h-6 w-6"/>
                </Link>
                <Link href={`/messages/${friend.id}?video=true`}>
                  <VideoCameraIcon className="h-6 w-6"/>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SearchFriend