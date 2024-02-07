'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { PencilIcon } from "@heroicons/react/24/solid"


const UpdateProfil = () => {
  const router = useRouter()
  const {setModalOpen, data} = useStore()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const {user} = data
  const image = watch('image');
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle patch channel
    const dataSend = {
      ...data,
      imageUrl : image
    }
    await axios.patch(`/api/user`, dataSend)
    setModalOpen("none")
    router.refresh()
  }

  
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }


  return (
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
              (!image && !user?.imageUrl) && 'Ajouter une image'
            }
            {
              (!image && user?.imageUrl) && <Image src={user.imageUrl} alt="server image" width={100} height={100} />
            }
            {
              (!image && !user?.imageUrl) || (
                <div className="group-hover:visible invisible absolute top-0 right-0 left-0 bottom-0  bg-black bg-opacity-50 grid place-content-center">
                  <PencilIcon className="h-10 w-10"/>
                </div>
              )
            }
          </div>
        </CldUploadButton>
          <Input
            register={register}
            errors={errors}
            required
            id="name" 
            label="Nom de profil"
          />          
          <Button type="submit">Update</Button>
        </form>
  )
}

export default UpdateProfil