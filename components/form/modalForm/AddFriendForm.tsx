import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"

const AddFriendForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    // axios.post('/api/friends/add', data)
    console.log(data);
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          errors={errors}
          required
          id="name" 
          label="Name"
        />
        <Button type="submit">Ajouter</Button>
    </form>
  )
}

export default AddFriendForm