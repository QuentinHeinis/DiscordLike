"use client";
import {
  ArrowPathIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
  userId: string;
}

const MessageInput = ({
  apiUrl,
  query,
  name,
  type,
  userId,
}: ChatInputProps) => {
  const inputPlaceholder = `Envoyer un message dans #${name}`;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();

  const [input, setInput] = useState("");
  const [loading, setloading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setloading(true);
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      const dataSend = {
        ...data,
        userId,
      };

      await axios.post(url, dataSend);
      setloading(false);
      setInput("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <form
      className="h-16 items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 flex w-full gap-3 px-6 left-0 absolute bottom-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button>
        <PlusCircleIcon className="h-6 w-6" />
      </button>
      <textarea
        {...register("content", { required: true })}
        onChange={handleChange}
        onKeyDown={(e) => {

          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setInput(input + "\n");
            return;
          }

          if (e.key === "Enter") {
            e.preventDefault();
            if (!loading) {
              onSubmit({ content: input });
            }
          }
        }}
        value={input}
        name="content"
        id="content"
        className="w-full px-3 bg-transparent max-h-fit h-8 p-1 focus:outline-none resize-none"
        placeholder={inputPlaceholder}
      />
      {input.length > 0 && (
        <button type="submit" disabled={loading} className="text-neutral-100 dark:text-neutral-800">
          {loading ? (
            <ArrowPathIcon className="h-8 w-8 animate-spin rounded-full bg-indigo-700 flex-none p-1" />
          ) : (
            <PaperAirplaneIcon className="h-8 w-8 rounded-full bg-indigo-700 flex-none p-2" />
          )}
        </button>
      )}
    </form>
  );
};

export default MessageInput;
