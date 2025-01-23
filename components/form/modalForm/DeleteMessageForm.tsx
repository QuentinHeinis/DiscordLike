"use client";

import qs from "query-string";
import axios from "axios";
import { useStore } from "@/store/zustand";
import Button from "@/components/form/ui/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const DeleteMessageModal = () => {
  const { handleSubmit } = useForm<FieldValues>();
  const { setModalOpen, data } = useStore();

  const { apiUrl, query, userId } = data;
  const handleDelete: SubmitHandler<FieldValues> = async (data) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      const dataSend = {
        ...data,
        userId,
      };

      await axios.post(url, dataSend); // post as delete

      toast.success("Message supprimé");
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen("none");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleDelete)} className="flex flex-col my-5">
      <p className=" text-center">
        Voulez-vous vraiment supprimer le channel ?
      </p>
      <span className="text-sm text-center">
        Cette action est irréversible !
      </span>
      <div className="flex w-3/4 justify-between mt-5 mx-auto">
        <Button type="button" onClick={() => setModalOpen("none")}>
          Annuler
        </Button>
        <Button type="submit" danger={true}>
          Supprimer
        </Button>
      </div>
    </form>
  );
};
