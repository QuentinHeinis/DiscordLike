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
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("role", { required: true })}>
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