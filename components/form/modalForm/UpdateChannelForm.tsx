'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Select from "../ui/Select"
import Button from "../ui/Button"
import axios from "axios"
import { ChannelType } from "@prisma/client" 
import { useParams, useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import { useState } from "react"
import toast from "react-hot-toast"


const UpdateChannel = () => {
  const router = useRouter()
  const params = useParams()
  const {setModalOpen, currentUpdateId} = useStore()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle create channel
    const dataSend = {
      ...data,
      serverId: params?.serverId
    }

    await axios.patch(`/api/server/channel/${currentUpdateId}`, dataSend)
    toast.success('Channel modifié')
    setModalOpen("none")
    router.refresh()
  }

  const onDelete = async () => {
    // handle delete channel
    const dataSend :any = {
      serverId: params?.serverId
    }
    
    await axios.post(`/api/server/channel/${currentUpdateId}`, dataSend)
    
    toast.success('Channel supprimé')
    setModalOpen("none")
    router.refresh()
  }

  type Options = {
    value: ChannelType,
    label: string
  }

  const options : Options[] = [
    {value: 'TEXT', label: 'Text'},
    {value: 'AUDIO', label: 'Vocal'},
    {value: 'VIDEO', label: 'Vidéo'}
  ]

  const [isUpdate, setIsUpdate] = useState(true)

  return (
    <div>
      <div className="bg-neutral-600 w-3/4 mx-auto my-5 flex">
        <button className={`w-1/2 hover:bg-neutral-900 transition-all ${!isUpdate ? '' : 'bg-neutral-800'}`} onClick={()=>setIsUpdate(true)}>modifier</button>
        <button className={`w-1/2 hover:bg-neutral-900 transition-all ${isUpdate ? '' : 'bg-neutral-800'}`} onClick={()=>setIsUpdate(false)}>supprimer</button>
      </div>
      {
        isUpdate ?
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
          <Input
            register={register}
            errors={errors}
            required
            id="name" 
            label="Nom du channel"
          />
          <Select fullWidth={true} errors={errors} required options={options} id="type" label="Type" register={register}/>
          <Button type="submit">Modifier</Button>
        </form>
        :
        <form onSubmit={handleSubmit(onDelete)}  className="flex flex-col gap-5 items-center">
          <Button type="submit" danger>Supprimer</Button>
        </form>
      }
    </div>
  )
}

export default UpdateChannel