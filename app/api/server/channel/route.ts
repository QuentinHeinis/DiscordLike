import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import getCurrentUser from "@/lib/current-profil";
import db from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const profile = await getCurrentUser();
    const { name, type, serverId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            userId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
