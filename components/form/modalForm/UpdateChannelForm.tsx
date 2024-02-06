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
    setModalOpen("none")
    router.refresh()
  }

  const onDelete = async () => {
    // handle delete channel
    const dataSend :any = {
      serverId: params?.serverId
    }
    
    await axios.post(`/api/server/channel/${currentUpdateId}`, dataSend)
    
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
      <button onClick={()=>setIsUpdate(true)}>modifier</button>
      <button onClick={()=>setIsUpdate(false)}>supprimer</button>
      {
        isUpdate ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            errors={errors}
            required
            id="name" 
            label="Nom du serveur"
          />
          <Select errors={errors} required options={options} id="type" label="Type" register={register}/>
          <Button type="submit">Update</Button>
        </form>
        :
        <form onSubmit={handleSubmit(onDelete)}>
          <Button type="submit">Delete</Button>
        </form>
      }
    </div>
  )
}

export default UpdateChannel