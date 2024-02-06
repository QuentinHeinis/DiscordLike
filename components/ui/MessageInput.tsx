'use client'
import * as z from 'zod'
import { PaperAirplaneIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { currentProfilePages } from '@/lib/current-profile-pages';
import { NextApiRequest } from 'next';


interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
  userId: string;
}

const MessageInput = ({apiUrl, query, name, type, userId} : ChatInputProps) => {
  const inputPlaceholder = `Envoyer un message dans #${name}`
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FieldValues>()

  const [input, setInput] = useState('')

  const handleChange =(e:any)=>{
    setInput(e.target.value)
  }

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    try {      
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      const dataSend = {
        ...data,
        userId
      }

      await axios.post(url, dataSend);

      setInput('')
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <form className="h-20 items-center bg-slate-800 flex w-full gap-3 px-6 left-0 absolute bottom-0" onSubmit={handleSubmit(onSubmit)}>
      <button><PlusCircleIcon className="h-6 w-6"/></button>
      <textarea
      {...register('content', {required: true})} onChange={handleChange} value={input}
       name="content" id='content' className="w-full px-3 bg-transparent max-h-fit h-8 p-1 focus:outline-none resize-none" placeholder={inputPlaceholder}/>
     {
        input.length > 0 &&  <button type='submit'><PaperAirplaneIcon className="h-8 w-8 rounded-full bg-blue-500 flex-none p-2"/></button>
     }
    </form>
  )
}

export default MessageInput