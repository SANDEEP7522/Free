import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const { name, imageUrl, emailAddresses } = user;
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl,
        email: emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

