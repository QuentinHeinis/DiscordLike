import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

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
        toast.success('Utilisateur ajouté')
        router.push(`/messages/${user.id}`);
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-5 items-center">
        <div className="w-3/4">
          <Input
          register={register}
          errors={errors}
          required
          id="name" 
          label="Name"
        />
        </div>
        <Button type="submit">Ajouter</Button>
    </form>
  )
}

export default AddFriendForm