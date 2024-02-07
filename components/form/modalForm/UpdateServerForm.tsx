'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import { useState } from "react"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { PencilIcon } from "@heroicons/react/24/solid"


const UpdateServer = () => {
  const router = useRouter()
  const {setModalOpen, currentUpdateId, data} = useStore()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const {server} = data
  const image = watch('image');
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle patch channel
    const dataSend = {
      ...data,
      imageUrl : image
    }
    await axios.patch(`/api/server/${server?.id}`, dataSend)
    setModalOpen("none")
    router.refresh()
  }

  const onDelete = async () => {
    // handle delete channel
    await axios.post(`/api/server/${server?.id}`)
    
    setModalOpen("none")
    router.push('/friends')
  }
  
  
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }

  const [isUpdate, setIsUpdate] = useState(true)

  return (
    <div>
      <button onClick={()=>setIsUpdate(true)}>modifier</button>
      <button onClick={()=>setIsUpdate(false)}>supprimer</button>
      {
        isUpdate ?
        <form onSubmit={handleSubmit(onSubmit)}>

        <CldUploadButton 
          options={{ maxFiles: 1 }} 
          onUpload={handleUpload} 
          uploadPreset="jgueeeco"
        >
          <div className="group relative">
            {
              image && <Image src={image} alt="server image" width={100} height={100} />
            }
            {
              (!image && !server?.imageUrl) && 'Ajouter une image'
            }
            {
              (!image && server?.imageUrl) && <Image src={server.imageUrl} alt="server image" width={100} height={100} />
            }
            <div className="group-hover:visible invisible absolute top-0 right-0 left-0 bottom-0  bg-black bg-opacity-50 grid place-content-center">
              <PencilIcon className="h-10 w-10"/>
            </div>
          </div>
        </CldUploadButton>
          <Input
            register={register}
            errors={errors}
            required
            id="name" 
            label="Nom du serveur"
          />          
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

export default UpdateServer