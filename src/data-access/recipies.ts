'use server';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { TimeForCooking } from '@prisma/client';
import { UTApi } from 'uploadthing/server';
import { updateUser } from './users';

const utapi = new UTApi();

export const deleteUTFiles = async (files: string) => {
  try {
    await utapi.deleteFiles(files);
    return { status: 200 };
  } catch (error) {
    return {
      status: 500,
      message: 'تعذر حذف الصورة الرجاء تحديث الصفحة ثم المحاولة مجددا',
    };
  }
};

export const getRecipy = cache(async (classification: string) => {
  // await prisma.recipe.deleteMany();

  try {
    const recipies = await prisma.recipe.findMany({
      where: {
        classification: classification,
      },
      include: {
        author: true,
      },
    });
    return { status: 200, recipies };
  } catch {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل الوصفات الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  }
  /*
   if (Math.ceil(Math.random() * 2) === 1) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل الوصفات الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  } else {
   } */
});
export const getOneRecipy = cache(async (slug: string) => {
  try {
    const recipy = await prisma.recipe.findFirst({
      where: {
        slug: slug,
      },
      include: {
        author: true,
      },
    });
    return { status: 200, recipy };
  } catch (err) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل الوصفات الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  }
});
export const getOneRecipyById = cache(async (id: string) => {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
      select: { title: true, src: true },
    });

    if (recipe) return { status: 200, recipe: recipe };
    else return { status: 200, recipe: null };
  } catch (err) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تحميل الوصفة الاعلى تقييما الرجاء فحص اتصال الإنترنت والمحاولة مجدداً',
    };
  }
});
export const updateRecipe = async (formData: FormData) => {
  let photoUrl;
  const files = formData.get('files') as File;

  if (files?.name !== 'undefined' && files !== null) {
    try {
      const res = await utapi.uploadFiles(files);
      photoUrl = res.data?.url;
    } catch (err) {
      return {
        status: 500,
        message:
          'حدث خطأ أثناء تحميل الصورة الرجاء فحص اتصال الانترنت والمحاولة مجددا',
      };
    }
  } else {
    photoUrl = formData.get('filesText');
  }
  try {
    const user = await currentUser();
    const previus = await getOneRecipy(formData.get('slug') as string);
    if (previus?.recipy?.authorId !== user?.id) {
      return {
        status: 500,
        message: 'لحذف الصورة يجب ان تكون صاحب الوصفة',
      };
    }
    const t1 = parseInt(formData.get('timeForCookingNumber') as string);
    const ser1 = parseInt(formData.get('service') as string);
    const tfc: TimeForCooking = {
      time: t1,
      unit: formData.get('timeForCookingUnit') as string,
    };
    await prisma.recipe.update({
      where: {
        slug: formData.get('slug') as string,
      },
      data: {
        title: formData.get('title') as string,
        classification: formData.get('classification') as string,
        additional: formData.get('additional') as string,
        src: photoUrl as string,
        steps: formData.getAll('steps') as string[],
        service: ser1,
        decorePhoto: formData.get('decore') as string,
        type: formData.get('type') as string,
        color: formData.get('color') as string,
        rate: 0,
        timeForCooking: tfc,
      },
    });
  } catch (error: any) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء تعديل الوصفة الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
  } finally {
    revalidatePath(`/${formData.get('classification') as string}`);
    redirect(`/${formData.get('classification') as string}`);
  }
};
export const deleteRecipe = async (slug: string, classification: string) => {
  try {
    const res = await prisma.recipe.delete({
      where: {
        slug: slug,
      },
    });
    return { status: 200 };
  } catch (err: any) {
    return {
      status: 500,
      message: 'تعذر حذف الوصفة الرجاءالمحاولة مجددا',
    };
  }
};
export const postRecipy = async (formData: FormData) => {
  let photoUrl;
  const files = formData.get('files') as File;
  if (files?.name !== 'undefined') {
    try {
      const res = await utapi.uploadFiles(files);
      photoUrl = res.data?.url;
    } catch (err) {
      return {
        status: 500,
        message:
          'حدث خطأ أثناء تحميل الصورة الرجاء فحص اتصال الانترنت والمحاولة مجددا',
      };
    }
  } else {
    return {
      status: 500,
      message: 'لا تستطيع حفظ وصفة بدون تحميل صورة لها ',
    };
  }
  try {
    const user = await currentUser();
    if (!currentUser) {
      return {
        status: 500,
        message: 'لا تستطيع حفظ وصفة بدون تسجيل دخول للموقع ',
      };
    }

    const title = formData.get('title') as string;

    const globalVariable = await prisma.globalVariable.findFirst({
      where: {
        id: '6775c083f4bea5b175074c81',
      },
    });

    let updatedTitle = title.replaceAll(' ', '-');

    updatedTitle = `${updatedTitle}-${globalVariable?.value! + 1}`;

    const t1 = parseInt(formData.get('timeForCookingNumber') as string);
    const ser1 = parseInt(formData.get('service') as string);
    const tfc: TimeForCooking = {
      time: t1,
      unit: formData.get('timeForCookingUnit') as string,
    };
    await updateUser(user?.id as string, user?.username as string);
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: formData.get('title') as string,
        slug: updatedTitle,
        classification: formData.get('classification') as string,
        additional: formData.get('additional') as string,
        //src: formData.get('photoUrl') as string,
        src: photoUrl as string,
        steps: formData.getAll('steps') as string[],
        service: ser1,
        decorePhoto: formData.get('decore') as string,
        type: formData.get('type') as string,
        color: formData.get('color') as string,
        rate: 0,
        timeForCooking: tfc,
        author: {
          connect: {
            clerkId: user?.id! as string,
          },
        },
      },
    });

    await prisma.globalVariable.update({
      where: {
        id: '6775c083f4bea5b175074c81',
      },
      data: {
        value: globalVariable?.value! + 1,
      },
    });
    return {
      status: 200,
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        'حدث خطأ أثناء حفظ الوصفة الرجاء فحص اتصال الانترنت والمحاولة مجددا',
    };
    // Handle the error appropriately
  } finally {
    revalidatePath(`/${formData.get('classification') as string}`);
  }
};
