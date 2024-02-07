'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import toast from "react-hot-toast"
import { PencilIcon } from "@heroicons/react/24/solid"

const AddServer = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const {setModalOpen} = useStore()
  const router = useRouter();
  const image = watch('image');
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle create server

    if(!image){
      toast.error('Veuillez ajouter une image')
    }else{
      await axios.post('/api/server', data)
      router.refresh();
    }
    
  }
  
  
  
  
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-5 items-center">
        <CldUploadButton 
          options={{ maxFiles: 1 }} 
          onUpload={handleUpload} 
          uploadPreset="jgueeeco"
          className="rounded-full overflow-hidden"
          >
          <div className="group relative">
            {
              image && <Image src={image} alt="server image" width={100} height={100} />
            }
            {
              !image  && 'Ajouter une image'
            }
            {
              image  && (
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
          id="NameServerCreated" 
          label="Nom du serveur"
        />
        <Button type="submit">Créer</Button>
    </form>
  )
}

export default AddServer