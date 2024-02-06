'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"
import Select from "./Select"
import Button from "./Button"
import axios from "axios"
import { ChannelType } from "@prisma/client" 
import { useParams, useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"


const AddChannel = () => {
  const router = useRouter()
  const params = useParams()
  const {setModalOpen} = useStore()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle create channel
    const dataSend = {
      ...data,
      serverId: params.serverId
    }

    await axios.post('/api/server/channel', dataSend)
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          errors={errors}
          required
          id="name" 
          label="Nom du serveur"
        />
        <Select errors={errors} required options={options} id="type" label="Type" register={register}/>
        <Button type="submit">Créer</Button>
    </form>
  )
}

export default AddChannel