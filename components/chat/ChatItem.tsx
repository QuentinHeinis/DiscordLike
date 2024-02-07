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

import {  ShieldCheckIcon, ShieldExclamationIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const roleIconMap = {
  "MEMBER": null,
  "MODERATOR": <ShieldCheckIcon className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldExclamationIcon className="h-4 w-4 ml-2 text-rose-500" />,
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  id,
  content,
  member,
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
    if (member.id === currentMember.id) {
      return;
    }
  
    router.push(`/messages/${member.user.id}`);
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

  

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);


  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div onClick={onMemberClick} className="cursor-pointer flex rounded-full overflow-hidden w-12 h-12 flex-none hover:drop-shadow-md transition">
          {
            member.user.imageUrl ? 
              <Image src={member.user.imageUrl} alt={`photo de profil de ${member.user.name}`} width={48} height={48}  className="w-full flex-none block object-cover"/>
              :
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-700 bg-primary flex-none">
                <p className="text-white text-xl font-semibold">
                  {member.user.name.charAt(0)}
                </p>
              </div>
          }
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                {member.user.name}
              </p>
              {
                roleIconMap[member.role]
              }
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {timestamp}
            </span>
          </div>
          {!fileUrl && !isEditing && (
            <p className="text-sm whitespace-pre-line text-neutral-600 dark:text-neutral-300">
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-neutral-500 dark:text-neutral-400">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-neutral-800 border rounded-sm">
            <TrashIcon
              onClick={() =>setModalOpen('deleteMessage',{ 
                apiUrl: `${socketUrl}/${id}`,
                query: socketQuery,
                userId: currentMember.userId
               })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
            />
        </div>
      )}
    </div>
  )
}