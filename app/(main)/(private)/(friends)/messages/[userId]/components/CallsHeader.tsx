'use client'

import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid"
import {  usePathname, useRouter, useSearchParams } from "next/navigation"
const CallsHeader = () => {
  const path = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const handleClick = (parameter : string) => {
    params?.get(parameter)
    if(params?.get(parameter) === 'true') {
      router.push(path!)
    }else {
      router.push(`${path}?call=true`)
    }
    router.refresh()   
  }
  return (
    <div className="flex gap-3">
      <button onClick={()=>handleClick('call')}><PhoneIcon className="h-6 w-6"/></button>
      <button onClick={()=>handleClick('video')}><VideoCameraIcon className="h-6 w-6"/></button>
    </div>
  )
}

export default CallsHeader