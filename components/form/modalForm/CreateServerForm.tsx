'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { useRouter } from "next/navigation"

const AddServer = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const router = useRouter();
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    // handle create server
    await axios.post('/api/server', data)
    router.refresh();
  }
  
  
  const image = watch('image');
  
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {image && <Image src={image} alt="server image" width={100} height={100} />}
        <CldUploadButton 
          options={{ maxFiles: 1 }} 
          onUpload={handleUpload} 
          uploadPreset="jgueeeco"
        >
          Ajouter une image
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