'use server';
import { postUser } from '@/data-access/users';
export async function serverUser(id: string, name: string) {
  const a = await postUser(id, name);
  return a;
}
