'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Select from "../ui/Select"
import Button from "../ui/Button"
import axios from "axios"
import { ChannelType } from "@prisma/client" 
import { useParams, useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import toast from "react-hot-toast"


const AddChannel = () => {
  const router = useRouter()
  const params = useParams()
  const {setModalOpen} = useStore()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle create channel
    const dataSend = {
      ...data,
      serverId: params?.serverId
    }

    await axios.post('/api/server/channel', dataSend)
    toast.success('Channel créé')
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
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-5 items-center">
        <Input
          register={register}
          errors={errors}
          required
          id="name" 
          label="Nom du channel"
        />
        <Select errors={errors} required options={options} id="type" label="Type" register={register}/>
        <Button type="submit">Créer</Button>
    </form>
  )
}

export default AddChannel