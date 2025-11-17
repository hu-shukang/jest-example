export type UserModel = {
  userId: string;
  name: string;
  address: string;
};

export type CreateUserInput = Omit<UserModel, 'userId'>;

export type UpdateUserInput = Partial<CreateUserInput>;
