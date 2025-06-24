import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export const requiredUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/')
  }
  return user;
}