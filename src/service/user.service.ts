import { CreateUserInput, UpdateUserInput, UserModel } from '@/model/user.model';
import { HTTP } from '@/util/http.util';
import { generateUUID } from '@/util/string.util';

/**
 * ユーザー情報を取得する
 *
 * テスト重点：
 * - HTTP.get が正しく呼び出され、ユーザーデータが返されることを検証
 * - 正しい URL パラメータ（/user/{userId}）が渡されていることを検証
 * - Axios エラーをキャッチして正しく throw されることを検証
 *
 * モック：
 * - Http.get
 *
 * @param {string} userId - ユーザーID
 * @returns {Promise<UserModel>} ユーザーモデルオブジェクト
 * @throws {AxiosError} HTTP リクエスト失敗時にエラーをスロー
 */
async function get(userId: string): Promise<UserModel> {
  const { data } = await HTTP.get<UserModel>(`/user/${userId}`);
  return data;
}

/**
 * 新しいユーザーを追加する
 *
 * テスト重点：
 * - generateUUID() が呼び出されることを検証
 * - HTTP.post 呼び出し時、userId と入力パラメータがマージされたデータが渡されていることを検証
 *
 * モック：
 * - generateUUID
 * - Http.post
 *
 * @param {CreateUserInput} input - ユーザー作成用入力データ
 * @returns {Promise<void>}
 * @throws {AxiosError} HTTP リクエスト失敗時にエラーをスロー
 */
async function add(input: CreateUserInput): Promise<void> {
  const userId = generateUUID();
  const data = { ...input, userId };
  await HTTP.post(`/user`, data);
}

/**
 * ユーザー情報を更新する
 *
 * テスト重点：
 * - User.get を呼び出して既存ユーザーデータを取得することを検証
 * - User.get が正しい userId で呼び出されていることを検証
 * - 古いデータと新しい入力が正しくマージされることを検証（userId を除外）
 * - HTTP.put のデータがマージされた完全なユーザーオブジェクトであることを検証
 *
 * モック：
 * - User.get
 * - Http.put
 *
 * @param {string} userId - ユーザーID
 * @param {UpdateUserInput} input - ユーザー更新用入力データ
 * @returns {Promise<void>}
 * @throws {AxiosError} HTTP リクエスト失敗時にエラーをスロー
 */
async function update(userId: string, input: UpdateUserInput): Promise<void> {
  const user = await User.get(userId);
  const { userId: _, ...other } = user;
  const data = { ...other, ...input };
  await HTTP.put(`/user/${userId}`, data);
}

/**
 * ユーザーを削除する
 *
 * テスト重点：
 * - HTTP.delete を呼び出してからコールバック関数を実行することを検証
 * - コールバック関数が正しい userId で呼び出されていることを検証
 * - 最終的な戻り値がコールバック関数の戻り値であることを検証
 *
 * モック：
 * - callback
 * - Http.delete
 *
 * @template T - コールバック関数の戻り値の型
 * @param {string} userId - ユーザーID
 * @param {Function} callback - ユーザーID を受け取り、削除後に実行するコールバック関数
 * @returns {Promise<T>} コールバック関数の実行結果
 * @throws {AxiosError} HTTP リクエスト失敗時にエラーをスロー
 */
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
