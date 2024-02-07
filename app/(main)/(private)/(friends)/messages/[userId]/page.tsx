import { redirect } from "next/navigation";

import db from "@/lib/prismadb";
import getCurrentProfil from "@/lib/current-profil";
import ChannelHeader from "@/components/navigation/ChannelHeader";
import { MediaRoom } from "@/components/chat/mediaRoom";
import { ChatMessages } from "@/components/ui/DirectMessageZone";
import MessageInput from "@/components/ui/MessageInput";
import CallsHeader from "./components/CallsHeader";

const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: true,
        memberTwo: true,
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: true,
        memberTwo: true,
      },
    });
  } catch {
    return null;
  }
};

interface MemberIdPageProps {
  params: {
    userId: string;
  },
  searchParams: {
    video?: boolean;
    call?: boolean;
  }
}

const MemberIdPage = async ({
  params,
  searchParams,
}: MemberIdPageProps) => {
  const profile = await getCurrentProfil();

  if (!profile) {
    return redirect("/");
  }


  const conversation = await getOrCreateConversation(profile.id, params.userId);

  if (!conversation) {
    return redirect("/friends");
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.id === profile.id ? memberTwo : memberOne;

  return ( 
    <div className="max-h-screen h-screen bg-neutral-700 w-full pb-0 relative">
    <ChannelHeader type='TEXT' title={otherMember.name}>
      <CallsHeader/>
    </ChannelHeader>
    
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
          user={profile}
        />
      )}
      {searchParams.call && (
        <MediaRoom
          chatId={conversation.id}
          video={false}
          audio={true}
          user={profile}
        />
      )}
      {(!searchParams.call && !searchParams.video) && (
        <>
        
          <ChatMessages
            member={profile}
            name={otherMember.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
              userId: profile.id,
            }}
            paramKey="conversationId"
            paramValue={conversation.id}
          />
          
          <MessageInput
            name={otherMember.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
            userId={profile.id}
          /> 
        </>
      )} 
    </div>
   );
}
 
export default MemberIdPage;