import { CreateUserInput, UpdateUserInput, UserModel } from '@/model/user.model';
import { HTTP } from '@/util/http.util';
import { generateUUID } from '@/util/string.util';

export async function getUser(userId: string) {
  const { data } = await HTTP.get<UserModel>(`/user/${userId}`);
  return data;
}

export async function addUser(input: CreateUserInput) {
  const userId = generateUUID();
  const data = { ...input, userId };
  await HTTP.post(`/user`, data);
}

export async function updateUser(userId: string, input: UpdateUserInput) {
  const user = await getUser(userId);
  const data = { ...user, ...input };
  await HTTP.put(`/user/${userId}`, data);
}
