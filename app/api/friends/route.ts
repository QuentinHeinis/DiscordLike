import getCurrentUser from "@/lib/current-profil";
import db from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const params = new URL(req.url).searchParams;
    const name = params.get("name");
    if (!name) {
      throw new NextResponse("Name is required", { status: 400 });
    }
    const profile = await getCurrentUser();
    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        name: name,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log("[SERVER_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
