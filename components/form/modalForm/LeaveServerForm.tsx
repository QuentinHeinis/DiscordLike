"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/store/zustand";
import Button from "@/components/form/ui/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const LeaveServer = () => {
  const {  handleSubmit } = useForm<FieldValues>()
  const router = useRouter();
  const { setModalOpen, data } = useStore();

  const { server } = data;
  const handleDelete:SubmitHandler<FieldValues>  = async (data) => {
    try {
      await axios.patch(`/api/server/${server?.id}/leave`); // post as delete

    } catch (error) {
      console.log(error);
    } finally{
      setModalOpen('none');
      router.push('/friends')
    }
  }
  

  return (
    <form onSubmit={handleSubmit(handleDelete)}>
        <Button type="button" onClick={()=>setModalOpen('none')}>Annuler</Button>
        <Button type="submit">Créer</Button>
    </form>
  )
}