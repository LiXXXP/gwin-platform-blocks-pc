import { Request } from '@gwin/networking'

export interface User {
  channel: string
  entityId: string
  locale: string
  orgId: string
  privileges: string
  roles: string
  serviceId: string
  userId: string
}

class LoginApi {
  // 登录的API
  async login(params: any) {
    const request = new Request<User>({
      url: '/api/sms/v1/UserSignIn',
      method: 'post',
      params: params,
      isLoading: true,
      isError: true,
      config: {
        type: 'admin'
      }
    })
    return await request.start()
  }

  // 验证码
  async captchaCodeInquiry(params: any) {
    const request = new Request<User>({
      url: '/api/sms/v1/CaptchaCodeInquiry',
      method: 'post',
      params: params,
      isLoading: false,
      isMessage: true,
      config: {
        type: 'admin'
      }
    })
    return await request.start()
  }
}

export default new LoginApi()
