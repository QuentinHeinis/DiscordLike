import { User } from "@prisma/client";
import Image from "next/image";
import ProfileSetting from "./ProfileSetting";

const Profile = async ({user} : {user:User}) => {
  const image = user?.imageUrl
  const name = user?.name
  return (
    <div className="w-full bg-neutral-900 h-16 flex-none flex items-center justify-around">
      <div className="flex gap-2">
        {
          image 
          ? 
          <Image src={image} alt="" width={56} height={56} className='h-6 w-6 rounded-full'/> 
          :
          <div className="h-6 w-6 grid place-content-center rounded-full bg-indigo-700" >{name?.slice(0,1).toUpperCase()}</div>
        }
        <span>{name}</span>
      </div>
      <ProfileSetting user={user}/>
    </div>
  )
}

export default Profile