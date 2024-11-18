// 'use server';
// import { useSignUp } from '@clerk/nextjs';
// export const submit = async (formdata: FormData) => {
//   const { isLoaded, signUp } = useSignUp();
//   if (!isLoaded) return;
//   try {
//     await signUp?.create({
//       emailAddress: `${formdata.get('emailAddress')}`,
//       password: `${formdata.get('password')}`,
//     });
//     await signUp?.prepareEmailAddressVerification({
//       strategy: 'email_code',
//     });
//   } catch (error) {
//     return {
//       error,
//     };
//   }
// };
// export const onPressVerify = async (formdata: FormData) => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   if (!isLoaded) return;
//   try {
//     const completeSignup = await signUp.attemptEmailAddressVerification({
//       code: `${formdata.get('code')}`,
//     });
//     if (completeSignup.status !== 'complete') {
//       throw new Error('not made');
//     }
//     if (completeSignup.status === 'complete') {
//       await setActive({ session: completeSignup.createdSessionId });
//     }
//   } catch (error) {
//     return error;
//   }
// };

'use server';
import { revalidatePath } from 'next/cache';
export default async function refetchForServer(path: string) {
  revalidatePath(path);
}
