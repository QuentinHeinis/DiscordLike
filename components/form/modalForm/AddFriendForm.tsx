import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { useRouter } from "next/navigation"

const AddFriendForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>()
  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const {name} = data
    const getUser = await axios.get('/api/friends', {params: {name}})
    const response = await getUser.data
    if(response){
      const user = response.user
      if(user){
        router.push(`/messages/${user.id}`);
      }
    }
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