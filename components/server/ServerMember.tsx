'use client'
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { Member, Server, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/store/zustand"
type MemberType = Member & {user: User}
type ServerMemberType = {
  members: MemberType[]
  isOwner: boolean,
  userId :string,
  server:Server
}
const ServerMember = ({members, isOwner, userId, server}:ServerMemberType) => {
  const {setModalOpen} = useStore()

  return (
    <div className="p-2 flex flex-col gap-1">
      <p>Membres</p>
      {
      members.map((member) => (
        <div key={member.id} className="group flex justify-between hover:bg-gray-700  rounded-md">
          <Link href={`/messages/${member.user.id}`} className="flex items-center gap-3 px-2 py-4 w-full">
            {member.user.imageUrl && <Image src={member.user.imageUrl} alt="avatar" width={32} height={32} className="w-8 h-8 rounded-full"/>}
            {!member.user.imageUrl && <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">{member.user.name.charAt(0)}</div>}
            {member.user.name}
          </Link>
          {
            (isOwner && member.user.id !== userId) && <button className="hidden group-hover:block mr-2" onClick={()=>setModalOpen('updateMember', {
              userId: member.id,
              server: server
            })}><Cog6ToothIcon className="h-6 w-6"/></button>
          }
        </div>
      ))
      }
    </div>
  )
}

export default ServerMember