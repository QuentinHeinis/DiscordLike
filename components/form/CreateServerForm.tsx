'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"
import Button from "./Button"
import axios from "axios"
const AddServer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    // handle create server
    console.log(data);
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          errors={errors}
          required
          id="imageServerCreated" 
          type="file"
          label="Image"
        />
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