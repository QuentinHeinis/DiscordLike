// import Messages from "./Messages"
// import { useRef, useEffect } from "react"

// type MessageTypes ={
//     message: string,
//     sender: {
//       name: string,
//       img: string
//     },
//     date: string,
//   }

// type MessagesTypes = MessageTypes[]


// const MessageZone = ({messages} : {messages: MessagesTypes}) => {
//   const msgRef = useRef<HTMLDivElement>(null)
//   useEffect(() => {
//     msgRef.current?.scrollTo(0, msgRef.current.scrollHeight)
//   }, [messages])
//   return (
//     <div ref={msgRef} className="flex gap-4 flex-col max-h-[calc(100%-5rem)] pt-20 pb-4 overflow-y-scroll overflow-anchor-none">
//         {
//           messages.map((message: MessageTypes, index:number) => (
//             <Messages key={index} msg={message}/>
//           ))
//         }
//     </div> 
//   )
// }

// export default MessageZone

"use client";

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import { Member, Message, User } from "@prisma/client";

import { useChatQuery } from "@/hook/UseChatQuery";
import { useChatSocket } from "@/hook/UseChatSocket";
import { useChatScroll } from "@/hook/UseChatScroll";
import { ChatItem } from "../chat/ChatItem";

// import { ChatWelcome } from "./chat-welcome";
// import { ChatItem } from "./chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    user: User
  }
}

interface ChatMessagesProps {
  name: string;
  member: Member;
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
        {/* <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" /> */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && (
        // <ChatWelcome
        //   type={type}
        //   name={name}
        // />
        <div>ChatWelcome</div>
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <div>is Loading</div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
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