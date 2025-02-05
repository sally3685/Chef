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
export const getMostRatedRecipe = cache(async () => {
  try {
    let max = 0;
    let returnedIndex = 0;
    const recipe = await prisma.recipe.findMany();

    await Promise.all(
      recipe.map(async (recipeItem, index) => {
        const rate = await GetRecipeRate(recipeItem.id);
        if (
          rate.status === 200 &&
          rate.averageRating &&
          rate.averageRating > max
        ) {
          max = rate.averageRating;
          returnedIndex = index;
        }
      })
    );

    return { status: 200, recipe: recipe[returnedIndex], rate: max };
  } catch (err) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل الوصفة الأعلى تقييما. الرجاء التحقق من اتصال الإنترنت والمحاولة مجددًا',
    };
  }
});

export const getUserWithMostRecipes = async () => {
  try {
    const userWithMostRecipes = await prisma.user_Recipe.groupBy({
      by: ['userId'],
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: 'desc',
        },
      },
      take: 1,
    });

    if (userWithMostRecipes.length > 0) {
      const userIdWithMostRecipes = userWithMostRecipes[0].userId;
      return { status: 200, userId: userIdWithMostRecipes };
    } else {
      return { status: 404, message: 'لا يوجد وصفات بعد' };
    }
  } catch (err) {
    return {
      status: 500,
      message:
        'An error occurred while fetching the user with the most recipes. Please check your internet connection and try again.',
    };
  }
};

export const GetRecipeRate = cache(async (recipeId: string) => {
  try {
    const id = recipeId;
    const res1 = await prisma.user_Recipe.aggregate({
      where: {
        recipeId: id,
      },
      _sum: {
        rating: true,
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
        (((res1._sum.rating! + res1._count.rating) / res2._count.id) * 100) / 5;
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
