'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../ui/Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import { MemberRole } from "@prisma/client"
import toast from "react-hot-toast"

const UpdateMember = () => {
  const router = useRouter()
  const {setModalOpen, data} = useStore()
  const { register, handleSubmit} = useForm<FieldValues>()
  const {userId, server} = data
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle patch member
    try{
      const dataSend = {
        ...data,
        userId: userId,
        serverId: server?.id
      }
      
      await axios.patch(`/api/member`, dataSend)

      toast.success('Membre modifié')
    }
    finally{
      setModalOpen("none")
      router.refresh()
    }
  }



  return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
          <select {...register("role", { required: true })} className="block 
            w-full 
            border-0 
            py-1.5
            shadow-sm 
            ring-1
            ring-neutral-500
            placeholder:text-neutral-400
            outline-none
            focus:border-neutral-500
            text-white
            sm:text-sm 
            sm:leading-6
            rounded-md bg-neutral-600 h-10 px-2">
            {
              Object.keys(MemberRole).map((role, index) => {
                if (role === 'ADMIN') return null
                return <option key={index} value={role}>{role}</option>
              })
            }
          
          </select>
          <Button type="submit">Modifier</Button>
        </form>
  )
}

export default UpdateMember