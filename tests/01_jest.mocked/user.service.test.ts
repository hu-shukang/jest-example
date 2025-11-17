import { randomUUID } from 'crypto';

import { UserModel } from '@/model/user.model';
import * as userService from '@/service/user.service';
import { HTTP } from '@/util/http.util';

jest.mock('@/util/http.util');

describe('user.service', () => {
  describe('getUser', () => {
    /**
     * テスト観点：
     * - HTTP.get関数のパラメータが正しいか
     * - HTTP.get関数のレスポンスを正しく戻しているか
     */
    it('成功', async () => {
      const userId = randomUUID();
      const userModel: UserModel = {
        userId: userId,
        name: 'abc',
        address: '東京都',
      };

      const mockedGet = jest.mocked(HTTP.get).mockResolvedValue({
        data: userModel,
        status: 200,
      });

      const result = await userService.getUser(userId);
      expect(result).toEqual(userModel);
      expect(mockedGet).toHaveBeenCalledWith(`/user/${userId}`);
    });
  });
});
