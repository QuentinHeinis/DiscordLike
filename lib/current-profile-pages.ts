import { NextApiRequest } from "next";
// import { getAuth } from "@clerk/nextjs/server";
import getCurrentUser from "./current-profil";

import db from "@/lib/prismadb";

export const currentProfilePages = async (req: NextApiRequest) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      id : userId
    }
  });

  return profile;
}