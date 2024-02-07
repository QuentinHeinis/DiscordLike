import { NextResponse } from "next/server";

import currentProfile from "@/lib/current-profil";
import db from "@/lib/prismadb";

export async function PATCH(
  req: Request,
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.user.update({
      where: {
        id: profile.id
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
