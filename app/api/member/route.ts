import db from "@/lib/prismadb";
import currentProfile from "@/lib/current-profil";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request
) {
  try {
    const profile = await currentProfile();
    const { role, userId, serverId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    if (!role) {
      return new NextResponse("Role missing", { status: 400 });
    }

   const member = await db.member.update({
      where: {
        id: userId,
        serverId: serverId ,
      },
      data: {
        role,
      },
    });


    return NextResponse.json(member);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
