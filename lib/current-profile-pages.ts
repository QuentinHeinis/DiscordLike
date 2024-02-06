import { NextApiRequest } from "next";

import db from "@/lib/prismadb";

export const currentProfilePages = async (userId : string) => {

  if (!userId) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return profile;
};
