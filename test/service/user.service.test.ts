import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { CreateUserInput, UpdateUserInput, UserModel } from '@/model/user.model';
import { User } from '@/service/user.service';
import { HTTP } from '@/util/http.util';
import { generateUUID } from '@/util/string.util';

jest.mock('@/util/string.util');
jest.mock('@/util/http.util');

describe('user.service', () => {
  afterEach(() => {
    jest.resetAllMocks(); // mockをクリア
    jest.restoreAllMocks(); // spyをクリア
  });

  describe('get', () => {
    it('成功', async () => {
      const userId = 'a9490427-ae24-46f8-b8e8-062d2ade456f';
      const userModel: UserModel = {
        userId: userId,
        name: 'abc',
        address: '東京都',
      };

      const mockedGet = jest.mocked(HTTP.get).mockResolvedValue({
        data: userModel,
        status: 200,
      });

      const result = await User.get(userId);
      expect(result).toEqual(userModel);
      expect(mockedGet).toHaveBeenCalledWith(`/user/${userId}`);
    });

    it('Axios Error: 書き方1', async () => {
      const userId = 'a9490427-ae24-46f8-b8e8-062d2ade456f';

      const error = new AxiosError('no found user', '404', {} as unknown as InternalAxiosRequestConfig, {}, {
        status: 404,
      } as AxiosResponse);

      const mockedGet = jest.mocked(HTTP.get).mockRejectedValue(error);
      const action = User.get(userId);
      await expect(action).rejects.toThrow('no found user');
      expect(mockedGet).toHaveBeenCalledWith(`/user/${userId}`);
    });

    it('Axios Error: 書き方2', async () => {
      const userId = 'a9490427-ae24-46f8-b8e8-062d2ade456f';

      const error = new AxiosError('no found user', '404', {} as unknown as InternalAxiosRequestConfig, {}, {
        status: 404,
      } as AxiosResponse);

      const mockedGet = jest.mocked(HTTP.get).mockRejectedValue(error);

      try {
        await User.get(userId);
      } catch (e) {
        expect((e as AxiosError).message).toEqual('no found user');
      }
      expect(mockedGet).toHaveBeenCalledWith(`/user/${userId}`);
    });
  });

  describe('add', () => {
    it('成功', async () => {
      const userId = '815ad516-e3a2-44ed-ab0f-81236fdafbe3';
      const mockedGenerateUUID = jest.mocked(generateUUID).mockReturnValue(userId);
      const input: CreateUserInput = {
        name: 'abc',
        address: '東京都',
      };
      await User.add(input);
      const mockedPost = jest.mocked(HTTP.post).mockResolvedValue({ status: 200 });

      expect(mockedGenerateUUID).toHaveBeenCalledTimes(1);
      expect(mockedPost).toHaveBeenCalledWith(`/user`, { ...input, userId });
    });
  });

  describe('update', () => {
    it('成功', async () => {
      const userId = '815ad516-e3a2-44ed-ab0f-81236fdafbe3';
      const mockedGetUser = jest.spyOn(User, 'get').mockResolvedValue({
        userId,
        name: 'abc',
        address: '東京都',
      });

      const input: UpdateUserInput = {
        address: '大阪',
      };

      await User.update(userId, input);

      expect(mockedGetUser).toHaveBeenCalledWith(userId);
      expect(HTTP.put).toHaveBeenCalledWith(`/user/${userId}`, { name: 'abc', address: '大阪' });
    });
  });

  describe('delete', () => {
    it('成功', async () => {
      const userId = '815ad516-e3a2-44ed-ab0f-81236fdafbe3';
      const callback = jest.fn().mockResolvedValue('OK');
      const mockedDelete = jest.mocked(HTTP.delete).mockResolvedValue({
        status: 200,
      });
      const result = await User.del(userId, callback);

      expect(mockedDelete).toHaveBeenCalledWith(`/user/${userId}`);
      expect(callback).toHaveBeenCalledWith(userId);
      expect(result).toEqual('OK');
    });
  });
});
