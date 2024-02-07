"use client";

import qs from "query-string";
import axios from "axios";
import { useStore } from "@/store/zustand";
import Button from "@/components/form/ui/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const DeleteMessageModal = () => {
  const {  handleSubmit } = useForm<FieldValues>()
  const { setModalOpen, data } = useStore();

  const { apiUrl, query, userId } = data;
  const handleDelete:SubmitHandler<FieldValues>  = async (data) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      const dataSend = {
        ...data,
        userId,
      }

      await axios.post(url, dataSend); // post as delete

    } catch (error) {
      console.log(error);
    } finally{
      setModalOpen('none');
    }
  }
  

  return (
    <form onSubmit={handleSubmit(handleDelete)}>
        <Button type="button" onClick={()=>setModalOpen('none')}>Annuler</Button>
        <Button type="submit">Créer</Button>
    </form>
  )
}