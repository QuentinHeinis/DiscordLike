"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { User } from "@prisma/client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  user:User
};

export const MediaRoom = ({
  chatId,
  video,
  audio,
  user
}: MediaRoomProps) => {
  const [token, setToken] = useState("");

  const name = user.name
  
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })()
  }, [name, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ArrowPathIcon
          className="h-7 w-7 text-neutral-500 animate-spin my-4"
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}