"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Member, MemberRole, User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useStore } from "@/store/zustand";

import Input from "@/components/form/ui/Input";
import Button from "@/components/form/ui/Button";
import { PencilIcon, ShieldCheckIcon, ShieldExclamationIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ChatItemProps {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: User;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};


const formSchema = z.object({
  content: z.string().min(1),
});

export const DirectChatItem = ({
  id,
  content,
  user,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const router = useRouter();
  const {setModalOpen} = useStore();

  const onMemberClick = () => {
    if (user.id === currentMember.id) {
      return;
    }
  
    router.push(`/messages/${user.id}`);
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content, form]);

    const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>();


  const isOwner = currentMember.id === user.id;
  const canDeleteMessage = !deleted && isOwner;


  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
          {
            user.imageUrl ? 
              <Image src={user.imageUrl} alt={`photo de profil de ${user.name}`} />
              :
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                <p className="text-white text-xl font-semibold">
                  {user.name.charAt(0)}
                </p>
              </div>
          }
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                {user.name}
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {!fileUrl && !isEditing && (
            <p className="text-sm whitespace-pre-line text-zinc-600 dark:text-zinc-300">
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            <TrashIcon
              onClick={() =>setModalOpen('deleteMessage',{ 
                apiUrl: `${socketUrl}/${id}`,
                query: socketQuery,
                userId: currentMember.id
               })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
        </div>
      )}
    </div>
  )
}