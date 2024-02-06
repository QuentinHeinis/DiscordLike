import { redirect } from "next/navigation";

import db from "@/lib/prismadb";
import getCurrentProfil from "@/lib/current-profil";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  const profile = await getCurrentProfil();

  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/friends");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId: profile.id,
          }
        ]
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;