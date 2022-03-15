import _axios, { get, post, put } from '@/lin/plugin/axios'
import store from '@/store'

import { saveTokens } from '../util/token'

declare interface ResTokens {
  access_token: string
  refresh_token: string
}

declare interface ReqUpdatePassword {
  old_password: string
  new_password: string
  confirm_password: string
}

export default class User {
  /**
   * 分配用户
   * @param {object} user 注册信息
   */
  static register(user: {
    email: string
    username: string
    nickname: string
    password: string
    groupIds: number[]
    confirmPassword: string
  }) {
    return _axios({
      method: 'post',
      url: 'cms/user/register',
      data: {
        email: user.email,
        username: user.username,
        nickname: user.nickname,
        password: user.password,
        group_ids: user.groupIds,
        confirm_password: user.confirmPassword,
      },
      handleError: true,
    }) as Promise<ResUnifyResponseVO>
  }

  /**
   * 登陆获取tokens
   * @param {string} username 用户名
   * @param {string} password 密码
   */
  static async getToken(username: string, password: string, captcha: string, codeToken: string) {
    const tokens: ResTokens = await post('cms/user/login', {
      username,
      password,
      captcha,
      code_token: codeToken,
    })
    saveTokens(tokens.access_token, tokens.refresh_token)
    return tokens
  }

  /**
   * 获取验证码
   * @returns 验证码图片链接
   */
  static async getCaptcha() {
    const url: string = await get('cms/user/get_captcha_img')
    return url
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  static async getInformation() {
    const info = await get('cms/user/information')
    const storeUser = store.getters.user === null ? {} : store.getters.user
    return { ...storeUser, ...info }
  }

  /**
   * 获取当前用户信息和所拥有的权限
   */
  static async getPermissions() {
    const info = await get('cms/user/permissions')
    const storeUser = store.getters.user === null ? {} : store.getters.user
    return { ...storeUser, ...info }
  }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  // eslint-disable-next-line camelcase
  static updatePassword({ old_password, new_password, confirm_password }: ReqUpdatePassword) {
    return put('cms/user/change_password', {
      new_password,
      confirm_password,
      old_password,
    }) as ResUnifyResponseVO
  }
}
