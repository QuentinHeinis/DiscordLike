import getCurrentUser from "@/lib/current-profil";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { image, NameServerCreated } = await req.json();
    const profile = await getCurrentUser();
    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        userId: profile.id,
        name: NameServerCreated,
        imageUrl: image,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", userId: profile.id }],
        },
        members: {
          create: [{ userId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json({ image, NameServerCreated });
  } catch (error) {
    console.log("[SERVER_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
