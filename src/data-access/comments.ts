'use server';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { Ingredients, TimeForCooking } from '@prisma/client';
import { UTApi } from 'uploadthing/server';
import { updateUser } from './users';

export const GetComments = cache(async (recipeId: string) => {
  try {
    const res = await prisma.user_Recipe.findMany({
      where: {
        recipeId: recipeId,
      },
      include: {
        user: true,
      },
    });
    return {
      status: 200,
      reviews: res,
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل التعليقات الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  }
});
type Comment = {
  text: string;
  date: Date;
};
export const deleteComment = async (
  userId: string,
  recipeId: string,
  id: number
) => {
  try {
    const r = await prisma.user_Recipe.findFirst({
      where: {
        customId: userId + '_' + recipeId,
      },
      select: {
        comments: true,
      },
    });

    const array = r?.comments as Comment[];
    const updatedComments = [...array];
    updatedComments.splice(id, 1);
    const res = await prisma.user_Recipe.update({
      where: {
        customId: userId + '_' + recipeId,
      },
      data: {
        comments: updatedComments,
      },
    });
    return { status: 200 };
  } catch (error: any) {
    return {
      status: 500,
      message: 'تعذر مسح التعليق الرجاء المحاولة لاحقا',
    };
  } finally {
  }
};
export const postComment = async (
  userId: string,
  username: string,
  recipeId: string,
  comment: string
) => {
  try {
    if (!userId) {
      return {
        status: 500,
        message: 'يرجى تسجيل دخول ثم المحاولة لاحقا',
      };
    } else {
      await updateUser(userId, username); //user_2rnQdFdzLFkpuhs1vxquHK2SGxl
    }
    const c = [];
    c.push({
      text: comment,
      date: new Date(),
    });
    const r = await prisma.user_Recipe.findFirst({
      where: {
        customId: userId + '_' + recipeId,
      },
      select: {
        comments: true,
      },
    });
    if (r && r.comments && r.comments.length > 0) {
      c.push(...r.comments);
    }

    const res = await prisma.user_Recipe.upsert({
      where: {
        customId: userId + '_' + recipeId,
      },
      update: {
        comments: c,
      },
      create: {
        comments: [
          {
            text: comment,
            date: new Date(),
          },
        ],
        rating: -1,
        userId: userId,
        customId: userId + '_' + recipeId,
        recipeId: recipeId,
      },
    });

    return {
      status: 200,
      message: '',
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء إرسال التعليق الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  }
};
