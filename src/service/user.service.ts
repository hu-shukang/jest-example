import { CreateUserInput, UpdateUserInput, UserModel } from '@/model/user.model';
import { HTTP } from '@/util/http.util';
import { generateUUID } from '@/util/string.util';

async function get(userId: string): Promise<UserModel> {
  const { data } = await HTTP.get<UserModel>(`/user/${userId}`);
  return data;
}

async function add(input: CreateUserInput): Promise<void> {
  const userId = generateUUID();
  const data = { ...input, userId };
  await HTTP.post(`/user`, data);
}

async function update(userId: string, input: UpdateUserInput): Promise<void> {
  const user = await User.get(userId);
  const { userId: _, ...other } = user;
  const data = { ...other, ...input };
  await HTTP.put(`/user/${userId}`, data);
}

async function del<T>(userId: string, callback: (userId: string) => Promise<T>): Promise<T> {
  await HTTP.delete(`/user/${userId}`);
  return await callback(userId);
}

export const User = {
  get,
  add,
  update,
  del,
};
