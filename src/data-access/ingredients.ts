'use server';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { Ingredients, TimeForCooking } from '@prisma/client';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const deleteUTFiles = async (
  files: string,
  ingredient: Ingredients[],
  slugSent: string
) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    return {
      status: 500,
      message: 'تعذر حذف الصورة الرجاء تحديث الصفحة ثم المحاولة مجددا',
    };
  }
  try {
    await prisma.recipe.update({
      where: {
        slug: slugSent,
      },
      data: {
        ingredients: ingredient,
      },
    });
    return { status: 200, message: '' };
  } catch (error) {
    return {
      status: 500,
      message: 'تعذر الرجاء تحديث الصفحة ثم المحاولة مجددا',
    };
  }
};

export const GetIngredient = cache(async (slug: string) => {
  try {
    const res = await prisma.recipe.findFirst({
      where: {
        slug: slug,
      },
      select: {
        ingredients: true,
      },
    });
    return { status: 200, res };
  } catch (error: any) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل المكونات الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  } finally {
  }
});
export const deleteAllIngredient = async (
  slugSent: string,
  classification: string
) => {
  let res;
  try {
    res = await GetIngredient(slugSent);
  } catch (error) {
    return {
      status: 500,
      message: 'فشل حذف المكونات افحص الاتصال بالانترنت ثم حاول مجددا',
    };
  }
  const res1 = res?.res?.ingredients as Ingredients[];
  for (let i = 0; i < res1.length; i++) {
    if (res1[i].src) {
      const files = res1[i].src as string;
      try {
        const r = await utapi.deleteFiles(files);
      } catch (err: any) {
        return {
          status: 500,
          message: 'فشل حذف المكونات افحص الاتصال بالانترنت ثم حاول مجددا',
        };
      }
    }
  }
  try {
    await prisma.recipe.update({
      where: {
        slug: slugSent,
      },
      data: {
        ingredients: [],
      },
    });
    return { status: 200, message: 'success' };
  } catch (error) {
    return {
      status: 500,
      message: 'فشل حذف المكونات افحص الاتصال بالانترنت ثم حاول مجددا',
    };
  } finally {
    revalidatePath(`/${classification}/detailes/${slugSent}`);
  }
};
export const postIngredient = async (
  dataIngred: Ingredients[],
  filesForm: File[] | undefined[],
  formData: FormData
) => {
  try {
    for (let i = 0; i < dataIngred.length; i++) {
      if (filesForm[i]) {
        const files = filesForm[i] as File;
        console.log(filesForm[i], 'filesForm');
        const res = await utapi.uploadFiles(files);
        console.log(res, 'res');
        dataIngred[i].src = res.data?.url as string;
        console.log(dataIngred[i], 'src');
      }
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'فشل حفظ المكونات افحص الاتصال بالانترنت ثم حاول مجددا',
    };
  }
  try {
    await prisma.recipe.update({
      where: {
        slug: formData.get('slug') as string,
      },
      data: {
        ingredients: dataIngred,
      },
    });
    return {
      status: 200,
      message: 'تم حفظ المكونات',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: 'فشل حفظ المكونات افحص الاتصال بالانترنت ثم حاول مجددا',
    };
  } finally {
    revalidatePath(
      `/${formData.get('classification') as string}/detailes/${
        formData.get('slug') as string
      }`
    );
  }
};
