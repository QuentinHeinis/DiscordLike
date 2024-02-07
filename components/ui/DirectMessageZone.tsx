"use client";

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import { Member, Message, User } from "@prisma/client";

import { useChatQuery } from "@/hook/UseChatQuery";
import { useChatSocket } from "@/hook/UseChatSocket";
import { useChatScroll } from "@/hook/UseChatScroll";
import { ChatWelcome } from "../chat/ChatWelcome";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { DirectChatItem } from "../chat/DirectChatItem";


const DATE_FORMAT = "d MMM yyyy, HH:mm";

type DirectMessageWithMemberWithProfile = Message & {
  member: User
}

interface ChatMessagesProps {
  name: string;
  member: User;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update` 

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ArrowPathIcon className="h-7 w-7 text-neutral-500 animate-spin my-4" />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto pt-20 pb-20 absolute top-0 max-h-screen">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && (
        <ChatWelcome
          type={type}
          name={name}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <div>is Loading</div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 text-xs my-4 dark:hover:text-neutral-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
          <div className="flex flex-col-reverse mt-auto">
            {data?.pages?.map((group, i) => (
              <Fragment key={i}>
                {group.items.map((message: DirectMessageWithMemberWithProfile) => (
                  <DirectChatItem
                    key={message.id}
                    id={message.id}
                    currentMember={member}
                    user={message.member}
                    content={message.content}
                    fileUrl={message.fileUrl}
                    deleted={message.deleted}
                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                    isUpdated={message.updatedAt !== message.createdAt}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                  />
                ))}
              </Fragment>
            ))}
          </div>
                        
      <div ref={bottomRef} />
    </div>
  )
}