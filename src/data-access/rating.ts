'use server';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { Ingredients, TimeForCooking } from '@prisma/client';

export const GetUserRate = cache(async (userId: string, recipeId: string) => {
  try {
    const id = userId + '_' + recipeId;
    const res = await prisma.user_Recipe.findFirst({
      where: {
        customId: id,
      },
      select: {
        rating: true,
      },
    });
    return {
      status: 200,
      res,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'فشل تحميل التقييم الرجاء فحص الاتصال بالانترنت والمحازلة مجددا',
    };
  }
});
export const GetRecipeRate = cache(async (userId: string, recipeId: string) => {
  try {
    const id = userId + '_' + recipeId;
    console.log(id);
    const res1 = await prisma.user_Recipe.aggregate({
      where: {
        customId: id,
      },
      _sum: {
        rating: true,
      },
    });
    const res11 = await prisma.user_Recipe.aggregate({
      where: {
        customId: id,
      },
      _count: {
        rating: true,
      },
    });
    const res2 = await prisma.user.aggregate({
      _count: {
        id: true,
      },
    });

    if (res1._sum && res2._count) {
      const averageRating =
        (((res1._sum.rating! + res11._count.rating) / res2._count.id) * 100) /
        5;
      return { status: 200, averageRating };
    } else {
      return { status: 200, averageRating: 0 };
    }
  } catch (error) {
    return {
      status: 500,
      message: 'فشل تحميل التقييم الرجاء فحص الاتصال بالانترنت والمحازلة مجددا',
    };
  }
});

export const PostUserRate = async (
  userId: string,
  recipeId: string,
  rate: number
) => {
  try {
    const res = await prisma.user_Recipe.upsert({
      where: {
        customId: userId + '_' + recipeId,
      },
      update: {
        rating: rate,
      },
      create: {
        rating: rate,
        userId: userId,
        customId: userId + '_' + recipeId,
        recipeId: recipeId,
      },
    });
    return { status: 200, message: '' };
  } catch (error) {
    return {
      status: 500,
      message: 'فشل تحديث التقييم الرجاء فحص الاتصال بالانترنت والمحازلة مجددا',
    };
  }
};
