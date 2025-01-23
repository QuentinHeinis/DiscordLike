"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/zustand";
import { useState } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { PencilIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const UpdateServer = () => {
  const router = useRouter();
  const { setModalOpen, currentUpdateId, data } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();
  const { server, other } = data;
  const image = watch("image");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // handle patch channel
    const dataSend = {
      ...data,
      imageUrl: image,
    };
    await axios.patch(`/api/server/${server?.id}`, dataSend);

    toast.success("Serveur modifié");
    setModalOpen("none");
    router.refresh();
  };

  const onDelete = async () => {
    // handle delete channel
    await axios.post(`/api/server/${server?.id}`);

    toast.success("Serveur supprimé");
    setModalOpen("none");
    router.push("/friends");
  };

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const [isUpdate, setIsUpdate] = useState(true);

  return (
    <div>
      {/* <div className="bg-neutral-600 w-3/4 mx-auto my-5 flex">
        <button className={`w-1/2 hover:bg-neutral-900 transition-all ${!isUpdate ? '' : 'bg-neutral-800'}`} onClick={()=>setIsUpdate(true)}>modifier</button>
        <button className={`w-1/2 hover:bg-neutral-900 transition-all ${isUpdate ? '' : 'bg-neutral-800'}`} onClick={()=>setIsUpdate(false)}>supprimer</button>
      </div> */}
      {isUpdate ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 items-center"
        >
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="jgueeeco"
            className="rounded-full overflow-hidden"
          >
            <div className="group relative">
              {image && (
                <Image
                  src={image}
                  alt="server image"
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] object-cover"
                />
              )}
              {!image && !server?.imageUrl && "Ajouter une image"}
              {!image && server?.imageUrl && (
                <Image
                  src={server.imageUrl}
                  alt="server image"
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] object-cover"
                />
              )}
              <div className="group-hover:visible invisible absolute top-0 right-0 left-0 bottom-0  bg-black bg-opacity-50 grid place-content-center">
                <PencilIcon className="h-10 w-10" />
              </div>
            </div>
          </CldUploadButton>
          <Input
            register={register}
            errors={errors}
            required
            id="name"
            label="Nom du serveur"
            value={other?.name}
          />
                    <div className="flex justify-between w-3/4">
            <Button danger type="button" onClick={() => setIsUpdate(false)}>
              Supprimer
            </Button>
            <Button type="submit">Modifier</Button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onDelete)}
          className="flex flex-col gap-4 w-3/4 items-center mx-auto"
        >
          <p className="mt-5 text-center">Voulez-vous vraiment supprimer le channel ?</p>
          <span className="text-sm text-center">Cette action est irréversible !</span>
          <div className="flex justify-between w-full" >
          <Button secondary type="button" onClick={() => setIsUpdate(true)}>
              Annuler
            </Button>
            <Button type="submit" danger>
              Supprimer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateServer;
