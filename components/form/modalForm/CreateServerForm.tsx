'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { useEffect } from "react"
const AddServer = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    // handle create server
    axios.post('/api/server', data)
    
  }
  
  
  const image = watch('image');
  
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Image src={image || ''} alt="" height={56} width={56}/>
                      <CldUploadButton 
                    options={{ maxFiles: 1 }} 
                    onUpload={handleUpload} 
                    uploadPreset="jgueeeco"
                  ></CldUploadButton>
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