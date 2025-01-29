'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({});
export const postUser = async (id: string, name: string) => {
  return await prisma.user.create({
    data: {
      clerkId: id,
      userName: name,
    },
  });
};
export const updateUser = async (id: string, name: string) => {
  return await prisma.user.upsert({
    where: {
      clerkId: id,
    },
    update: {
      userName: name,
    },
    create: {
      userName: name,
      clerkId: id,
    },
  });
};
